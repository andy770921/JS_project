
# RxJS 與 redux-observable

## Callbacks vs Promises vs RxJs Observables vs async/ await
https://youtu.be/jgWnccjXR4I  

## RxJS 教學
https://youtu.be/T9wOu11uU6U  

## Redux-observable 教學
https://youtu.be/AslncyG8whg  
https://youtu.be/sF5-V-Szo0c?t=1400

## Redux-observable 取 API 範例
```js
// 資料夾路徑為 streams/promotion/promotion.streams.ts

import { StreamInjection } from '@src/xxx';
import ApiResponse from '@typings/ooo';
import { fetchApi, getApiUrl, log } from '../oxox';

enum PromotionConditionDiscountTypeV2Enum {
    DiscountPrice = 1,
    DiscountRate = 2,
    FixedPrice = 4,
    FreeGift = 8,
    All = 15,
}

enum PromotionTargetTypeV2Enum {
    Shop = 1,
    Category = 2,
    SalePage = 4,
    PromotionSalePage = 8,
    All = 15,
}

enum PromotionConditionTypeV2Enum {
    TotalPrice = 1,
    TotalQty = 2,
    ReachQty = 4,
    TotalPriceV2 = 8,
    TotalQtyV2 = 16,
    CrmMemberTierTotalPrice = 32,
    All = 63,
}

// 定義 API 回傳的資料格式
export interface PromotionV2ForDisplay {
    DiscountTypeDef: PromotionConditionDiscountTypeV2Enum;
    EndDateTime: Date;
    Name: string;
    PromotionId: number;
    PromotionTargetMemberTierList: {
        CrmShopMemberCardName: string;
        PromotionTargetMemberTierId: number;
    }[];
    SalePageList: {
        PromotionHotSaleRankingUpdatedDateTime: Date;
        PromotionId: number;
        Rank: number;
        SalePageId: number;
        SalePageImageUrl: string;
    }[];
    StartDateTime: Date;
    TargetTypeDef: PromotionTargetTypeV2Enum;
    TypeDef: PromotionConditionTypeV2Enum;
    UpdatedDateTime: Date;
}

/**
 * @api {post} /Promotion/{shopId}?orderBy=Newest&startIndex=0&maxCount=0&typeDef=All
 * @apiGroup Promotion
 * @apiVersion 0.0.1
 * @apiDescription 取得折扣活動總數
 * @apiParam {Number} shopId 商店Id
 *
 * @apiSuccess {Number} 0
 */
const fetchPromotionCount = async (streamInjection: StreamInjection) => {
    const { shopId } = streamInjection;
    const apiURL = getApiUrl(
        `PromotionV2/${shopId}?orderBy=Newest&startIndex=0&maxCount=0&typeDef=All`,
        streamInjection,
        false
    );

    log.info('[INFO] fetchPromotionCount start');
    log.info(`[INFO] fetchPromotionCount apiUrl: ${apiURL}`);

    const {
        Data: { PromotionCount: promotionCount },
    } = await fetchApi<ApiResponse<{ PromotionCount: number; PromotionList: PromotionV2ForDisplay[] }>>(apiURL);

    log.info(`[INFO] fetchPromotionCountFn finish: ${promotionCount}`);

    return promotionCount;
};

export default fetchPromotionCount;

```

```js
// 資料夾路徑為 epics/promotion.epic.ts

import { combineEpics, Epic } from 'redux-observable';
import { of, iif, from } from 'rxjs';
import { filter, catchError, map, mergeMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
// 引入 ActionCreator, streams
import {
    fetchPromotionCount as fetchPromotionCountActionCreator,
    fetchPromotionCountFulfilled as fetchPromotionCountFulfilledActionCreator,
    fetchPromotionCountRejected as fetchPromotionCountRejectedActionCreator,
    fetchPromotionListInShopCategory as fetchPromotionListInShopCategoryActionCreator,
    fetchPromotionListInShopCategoryFulfilled as fetchPromotionListInShopCategoryFulfilledActionCreator,
    fetchPromotionListInShopCategoryRejected as fetchPromotionListInShopCategoryRejectedActionCreator,
}  from './actions/promotion.action';
import fetchPromotionCount from './streams/promotion/promotionCount.stream';
// 引入外部資料
import { dependencyHelper, errorJSON } from '/xxxxx';
// 引入字元檢查
import { getValueSafe } from './utilities/valueUtility';

// 引入型別
import { RootAction } from '@client/themeCore/actions';
import { RootState } from '@client/themeCore/reducers';
import Dependencies from '@typings/Dependencies';

const { getStreamInjection } = dependencyHelper;

/**
 * 取得折扣活動清單
 * @param action$
 * @param store
 * @param dependencies 外部注入
 */
export const fetchPromotionCountEpic: Epic<
    RootAction,
    | ReturnType<typeof fetchPromotionCountFulfilledActionCreator>
    | ReturnType<typeof fetchPromotionCountRejectedActionCreator>,
    RootState,
    Dependencies
> = (action$, _state$, dependencies) =>
    action$.pipe(
        filter(isActionOf(fetchPromotionCountActionCreator)),
        map(() => getStreamInjection(dependencies)),
        mergeMap(streamInjection =>
            from(fetchPromotionCount(streamInjection)).pipe(
                map(payload => fetchPromotionCountFulfilledActionCreator(payload)),
                catchError(error => of(fetchPromotionCountRejectedActionCreator(errorJSON(error))))
            )
        )
    );
    
export const fetchPromotionListInShopCategoryEpic: Epic<
    RootAction,
    | ReturnType<typeof fetchPromotionListInShopCategoryFulfilledActionCreator>
    | ReturnType<typeof fetchPromotionListInShopCategoryRejectedActionCreator>,
    RootState,
    Dependencies
> = (action$, _state$, dependencies) =>
    action$.pipe(
        filter(isActionOf(fetchPromotionListInShopCategoryActionCreator)),
        mergeMap(action => {
            const {
                payload: { categoryId },
            } = action;

            const streamInjection = getStreamInjection(dependencies);
            const shopDomain = getValueSafe(dependencies, 'shopProfile.ShopBasicInfo.ShopDomain');
            const params = {
                streamInjection,
                payload: {
                    categoryId,
                    shopDomain,
                },
            };

            return from(fetchPromotionListInShopCategory(params)).pipe(
                map(response => fetchPromotionListInShopCategoryFulfilledActionCreator(response)),
                catchError(error => of(fetchPromotionListInShopCategoryRejectedActionCreator(errorJSON(error))))
            );
        })
    );

export default combineEpics(
    fetchPromotionCountEpic,
    fetchPromotionListInShopCategoryEpic
);
```
```js
// 資料夾路徑為 actions/promotion.action.ts
import { createAction, createCustomAction } from 'typesafe-actions';

export const FETCH_PROMOTION_COUNT = 'FETCH_PROMOTION_COUNT';
export const FETCH_PROMOTION_COUNT_FULFILLED = 'FETCH_PROMOTION_COUNT_FULFILLED';
export const FETCH_PROMOTION_COUNT_REJECTED = 'FETCH_PROMOTION_COUNT_REJECTED';

export const fetchPromotionCount = createAction(FETCH_PROMOTION_COUNT)();
export const fetchPromotionCountFulfilled = createAction(FETCH_PROMOTION_COUNT_FULFILLED)<number>();
export const fetchPromotionCountRejected = createAction(FETCH_PROMOTION_COUNT_REJECTED)<string>();

// 有定義代入資料型別的寫法

interface PromotionListInShopCategoryEntity {
    id: number;
    name: string;
    startTimeString: string;
    endTimeString: string;
    rules: string[];
    promotionConditionDiscountType: string;
    promotionConditionType: string;
    link: string;
}

export const fetchPromotionListInShopCategory = createAction(FETCH_PROMOTION_LIST_IN_SHOP_CATEGORY)<{
    categoryId: number;
}>();

export const fetchPromotionListInShopCategoryFulfilled = createAction(FETCH_PROMOTION_LIST_IN_SHOP_CATEGORY_FULFILLED)<
    PromotionListInShopCategoryEntity[]
>();

export const fetchPromotionListInShopCategoryRejected = createAction(FETCH_PROMOTION_LIST_IN_SHOP_CATEGORY_REJECTED)<
    any
>();

```

```js
// 資料夾路徑為 reducers/promotion.reducer.ts

import { createReducer } from 'typesafe-actions';
// 引入時間型別
import { Moment } from 'moment';

import {
    fetchPromotionCountFulfilled,
    fetchPromotionListInShopCategoryFulfilled,
    fetchPromotionTargetListFulfilled
    RootAction,
} from '../actions';

interface Promotion {
    promotionId: number;
    title: string;
    endDateTime: Moment;
    startDateTime: Moment;
    startDateString: string;
    endDateString: string;
    isPromotionEngine: boolean;
    isOver: boolean;
    isComingSoon: boolean;
    mediaUrlList: string[];
    tagInfo: {
        mobileTagList: string[];
        desktopTagList: string[];
    };
}

interface State {
    promotionCount: number;
    promotionTargetList?: {
        /* 
            check client/themeCore/streams/promotion/promotionTargetList.stream.ts
            interface PromotionTargetListEntity
        */
        freeGift: number[];
    };
    promotionSourceTypeList: {
        [moduleKey: string]: {
            promotionList: Promotion[];
        };
    };
    promotionSourceTypeId: {
        [moduleKey: string]: {
            promotionList: Promotion[];
        };
    };
    promotionListInShopCategory: {
        id: number;
        name: string;
        startTimeString: string;
        endTimeString: string;
        rules: string[];
        promotionConditionDiscountType: string;
        promotionConditionType: string;
        link: string;
    }[];
}

export const promotion = createReducer<State, RootAction>({
    promotionCount: 0,
    promotionSourceTypeList: {},
    promotionSourceTypeId: {},
    promotionTargetList: {
        freeGift: [],
    },
    promotionListInShopCategory: [],
})
    .handleAction(fetchPromotionCountFulfilled, (state, action) => ({ ...state, promotionCount: action.payload }))
    .handleAction(fetchPromotionTargetListFulfilled, (state, action) => ({
        ...state,
        [action.dataSource]: action.payload,
    }))
    .handleAction(fetchPromotionListInShopCategoryFulfilled, (state, action) => ({
        ...state,
        promotionListInShopCategory: action.payload,
    }));

// 資料夾路徑為 reducers/shopCategory.reducer.ts


import { createReducer } from 'typesafe-actions';
import {
    switchCategory,
    switchCategoryFulfilled,
    switchCategoryRejected,
    switchCategoryOrderBy,
    switchCategoryOrderByFulfilled,
    switchCategoryOrderByRejected,
    fetchCategoryMoreProducts,
    fetchCategoryMoreProductsFulfilled,
    fetchCategoryMoreProductsEmpty,
    fetchCategoryMoreProductsRejected,
    RootAction,
} from '@client/themeCore/actions';

const initialState = {
    isExist: true,
    categoryId: -1,
    isShowCurator: false,
    orderBy: '',
    productList: [],
    cursor: 0,
    totalSize: 0,
    isFetching: false,
};

export const shopCategory = createReducer<typeof initialState, RootAction>(initialState)
    .handleAction([switchCategory, switchCategoryOrderBy, fetchCategoryMoreProducts], state => ({
        ...state,
        isFetching: true,
    }))
    .handleAction([switchCategoryFulfilled, switchCategoryOrderByFulfilled], (state, action) => ({
        ...state,
        ...action.payload,
        isFetching: false,
    }))
    .handleAction(fetchCategoryMoreProductsFulfilled, (state, { payload: { productList, cursor, totalSize } }) => ({
        ...state,
        productList: [...state.productList, ...productList],
        cursor,
        totalSize,
        isFetching: false,
    }))
    .handleAction(fetchCategoryMoreProductsEmpty, state => ({
        ...state,
        isFetching: false,
    }))
    .handleAction(
        [switchCategoryRejected, switchCategoryOrderByRejected, fetchCategoryMoreProductsRejected],
        state => ({
            ...state,
            isFetching: false,
        })
    );

```

```js
// 資料夾路徑為 reducers/index.ts

import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { promotion } from './promotion.reducer';

export const reducers = {
    promotion,
    // aaa, bbb, ccc
};

export const rootReducer = combineReducers(reducers);

export type RootState = StateType<typeof rootReducer>;
```

```js
// 資料夾路徑為 actions/index.ts

import { ActionType } from 'typesafe-actions';
import * as promotion from './promotion.action';

export * from './promotion.action';

export type RootAction = ActionType<
    | typeof promotion
    //| typeof aaa
    //| typeof bbb
>;
```

```js
// 資料夾路徑為 epics/index.ts

import { combineEpics } from 'redux-observable';
import promotionEpics from './promotion.epic';

export default combineEpics(
    pageEpics,
    // aaa, bbb, ccc
);
```
```js
// 資料夾路徑為 ui.render.client.tsx

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { loadTranslations, setLocale, syncTranslationWithStore } from 'react-redux-i18n';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { merge } from 'lodash';
import { initLangInfo } from 'xx/actions';
import * as sparkCoreEnUS from 'xxx/en-US.json';
import * as sparkCoreZhTW from 'ooo/zh-TW.json';
import Dependencies from './xx';
import { trackPageView } from 'xx/tracking.action';
import rootEpic from './epics';
import { log } from './xx/log';
import { reducers, RootState } from './reducers';
import { Container } from './ui.module';
import { nineyi } from './providers/globalVariableProvider';
import { CommonActions, commonActions } from './ui.common.actions';

// TODO: 實際型別待補
interface RenderClientHtmlParams {
    preloadedState: any;
    dependencies: any;
    pageComponent?: any;
    injectRootReducer?: any;
    injectRootEpic?: any;
    initPageComponentLocale?: any;
    i18n?: typeof nineyi.i18n;
}

declare global {
    interface Window {
        // eslint-disable-next-line no-undef
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        ThemeCore: {
            renderClientHtml: (params: RenderClientHtmlParams) => void;
            commonActions: CommonActions;
        };
    }
}
/**
 * 初始化翻譯
 * @param store
 * @param dependencies
 */
const initTranslation = (store: Store<RootState>, locale: string, translationsData: any) => {
    log.info('[themeCore/ui.client] client render init locale start');
    if (!translationsData) {
        log.debug('[themeCore/ui.client] client render no translationsData');
        return;
    }
    const mergedTranslationsData = merge(translationsData, sparkCoreEnUS, sparkCoreZhTW);
    syncTranslationWithStore(store);
    store.dispatch(loadTranslations(mergedTranslationsData));
    store.dispatch(setLocale(locale));
    log.info('[themeCore/ui.client] initLocaleTranslation complete');
};

/**
 * 初始化語言
 * @param store
 * @param locale
 * @param i18n
 */
const initLangs = (store: Store<RootState>, locale: string, i18n: typeof nineyi.i18n) => {
    const { defaultLanguage, isEnableLanguage, allLanguages } = i18n;
    if (!allLanguages) {
        log.warn('[themeCore/ui.client] initLangs failed, reason: no allLanguages data');
        return;
    }
    const availableLanguages = isEnableLanguage ? i18n.availableLanguages : [];
    const preferredLanguage = locale || defaultLanguage; // 後續調整為server端決定
    store.dispatch(initLangInfo({ preferredLanguage, allLanguages, availableLanguages }));
    log.info('[themeCore/ui.client] initLangs complete');
};


/**
 * 取得redux store
 * @param preloadedState
 * @param dependencies
 * @param injectedReducers
 * @param injectRootEpic
 */
const getStore = (preloadedState, dependencies: Dependencies, injectedReducers = {}, injectRootEpic = []) => {
    log.info('[themeCore/ui.client] getStore start');
    const combinedReducer = combineReducers({ ...reducers, ...injectedReducers });
    const combinedEpic = combineEpics(rootEpic, ...injectRootEpic);
    const epicMiddleware = createEpicMiddleware({ dependencies });
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combinedReducer,
        { ...preloadedState, dependencies },
        composeEnhancers(applyMiddleware(epicMiddleware, thunk))
    );
    epicMiddleware.run(combinedEpic);
    log.info('[themeCore/ui.client] getStore success');
    return store;
};

/**
 * 進行react app渲染client html
 * @param param0
 */
const renderClientHtml = ({
    preloadedState = {},
    dependencies = {},
    pageComponent,
    injectRootReducer,
    injectRootEpic,
    initPageComponentLocale,
    i18n,
}: RenderClientHtmlParams) => {
    log.info('[themeCore/ui.client] client render init start');
    const store = getStore(preloadedState, dependencies, injectRootReducer, injectRootEpic);
    const { translationsData, locale } = dependencies;
    initTranslation(store, locale, translationsData);
    if (i18n) {
        initLangs(store, locale, i18n);
        initCurrency(store, i18n);
    }
    if (initPageComponentLocale) {
        initPageComponentLocale(store);
    }
    // render
    log.info('[themeCore/ui.client] client render start');
    ReactDOM.hydrate(
        <Provider store={store}>
            <Container pageComponent={pageComponent} dependencies={dependencies} />
        </Provider>,
        document.getElementById('root')
    );
    document.addEventListener('DOMContentLoaded', () => {
        store.dispatch(trackPageView());
    });
};
window.ThemeCore = {
    renderClientHtml,
    commonActions,
};

const { __PRELOADED_STATE__ } = nineyi;
if (__PRELOADED_STATE__) {
    const { dependencies, i18n } = nineyi;
    renderClientHtml({ preloadedState: __PRELOADED_STATE__, dependencies, i18n });
}
```


## 運算子觀念網站
https://reactive.how

## 保哥課程投影片
<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg1.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg2.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg3.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg3-5.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg4.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg5.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg6.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg7.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg8.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg9.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg10.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg11.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg12.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg13.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg14.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg15.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg16.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg17.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg18.png"/>
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/pg19.png"/>
</div>

## Retry

<div align="center">
  <img src="https://github.com/andy770921/JS_project/blob/master/imgs_rx/retry.png"/>
</div>
