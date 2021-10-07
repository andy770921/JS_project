# mongoDB service Note

## 使用 Realm 服務產生 Webhook API 
1. 上方 Header 選擇 Realm，左邊列表選擇 3rd party service
2. 選 Add service，可產生 incoming webhook
3. read Ex:
```js
// https://docs.mongodb.com/realm/mongodb/actions/collection.find/

exports = async function(payload, response) {
    const itemsInDB = await context.services.get('mongodb-atlas').db('lang').collection('ulsee360-frontend').find({}).toArray();
    
    // JSON.parse and JSON.stringify is for removing "_id":{"$oid":"5f86ad1b818c000fb71f05d0"}
    const standardItems = JSON.parse(JSON.stringify(itemsInDB)).map(({_id, ...params}) => ({id: _id, ...params}))
    return standardItems;
};
```
```js
// https://docs.mongodb.com/realm/services/configure/service-webhooks/

const translationListSelectedByPages = (listWithPage, selectedPages) => {
  // select all page
  if (!selectedPages) {
    let allPageList = [];

    const translationListWithoutPage = listWithPage.map(({ id, pages, ...info }) => {
      allPageList = [...new Set([...allPageList, ...pages])]; // union of two array
      return info;
    });
    return translationListWithoutPage;
  }
  // TODOS: select certain page
};

/** convert To I18n Valid Json
   * @param {Object[]} translationList - Ex: [{ key: 'CONT', TW: '繼續', EN: 'continue' },
                                              { key: 'OK', TW: '好', EN: 'ok' }]
   * @param {String} Object[].key - Ex: 'CONTINUE'
   * @param {String} Object[].TW - Ex: '繼續'
   * @param {String} Object[].EN - Ex: 'continue'
   * @returns {Object} Vaild I18n JSON - Ex: { TW: { CONTINUE: '繼續', OK: '好' }, EN: { CONTINUE: 'continue', OK: 'ok' } }
   */

const convertToI18nValidJson = (languageList) => {
  const validJson = languageList.reduce((langCollection, currentItem) => {
    let nextLangCollection = { ...langCollection };
    // Ex: nextLangCollection 為 { TW: { CONTINUE: '繼續' }, EN: { CONTINUE: 'continue' } }
    const { key: i18nKey, ...localeTranslationPair } = currentItem;

    for (let locale in localeTranslationPair) {
      const selectedLocaleTranslation = {
        ...nextLangCollection[locale],
        [i18nKey]: localeTranslationPair[locale],
      };
      // Ex: selectedLocaleTranslation 為 { CONTINUE: '繼續', OK: '好' }

      nextLangCollection = { ...nextLangCollection, [locale]: selectedLocaleTranslation };
      // Ex: nextLangCollection 為 { TW: { CONTINUE: '繼續', OK: '好' }, EN: { CONTINUE: 'continue' } }
    }
    return nextLangCollection;
  }, {});

  return validJson;
};



// https://docs.mongodb.com/realm/mongodb/actions/collection.find/
async function getDataFromDb(collectionName, filterList) {
    const itemsInDB = await context.services.get('mongodb-atlas').db('lang').collection(collectionName).find(filterList ? { pages: {$in: filterList} } : {}).toArray();
    
    // JSON.parse and JSON.stringify is for removing "_id":{"$oid":"5f86ad1b818c000fb71f05d0"}
    const standardItems = JSON.parse(JSON.stringify(itemsInDB)).map(({_id, ...params}) => ({id: _id, ...params}));
    
    const allTranslationList = translationListSelectedByPages(standardItems, null);

    const validI18nJson = JSON.stringify(convertToI18nValidJson(allTranslationList));
    
    return validI18nJson;
}

// https://docs.mongodb.com/realm/services/http/index.html#request-payload

// query string 可帶如 ?collection=A_SERVICE&pages=users,plans 或 ?pages=users,plans 或 ?collection=B_SERVICE 或都不帶
exports = async function(payload, response) {
  
  if(Object.keys(payload.query).length === 0) {
    const validI18nJson = await getDataFromDb('A_SERVICE', null);
    
    response.setStatusCode(200);
    response.setHeader('Content-Type', 'application/json');
    response.setBody(validI18nJson);
  } else if (Object.keys(payload.query).some(queryItem => ['pages', 'collection'].includes(queryItem))){
    // payload.query.collection 如 'A_SERVICE', 'B_SERVICE', 或是 undefined
    // payload.query.pages 如 'signup', 'home,signup', 或是 undefined
    
    const { pages, collection = 'B_SERVICE' } = payload.query;
    
    const pageFilterList = pages ? pages.split(',') : null;
    const validI18nJson = await getDataFromDb(collection, pageFilterList);
    
    response.setStatusCode(200);
    response.setHeader('Content-Type', 'application/json');
    response.setBody(validI18nJson);
  } else {
    response.setStatusCode(400);
    response.setHeader('Content-Type', 'application/json');
    response.setBody(JSON.stringify({msg: 'Invalid params.'}));
  }
}
```
4. create Ex:
```js
// https://docs.mongodb.com/realm/services/http/index.html
// use EJSON.parse(payload.body.text()) to parse body

/**
 * @param {Object} payload.body.data
 * @param {String} payload.body.data.collection - collection 名稱，如 'B_SERVICE'
 * @param {Object} payload.body.data.data - 要更新的內容，需要符合 JSON 格式
 *   如 [{"key":"LOGIN_FAIL_SNACKBAR_HINT","TW":"登入失敗，請再試一次","CN":"登入失败，请再试一次","EN":"Login fail. Please try again","pages":["home"]}]
 */

exports = async function(payload, response) {
    const { collection: collectionName, data } = EJSON.parse(payload.body.text());
    if(collectionName && Array.isArray(data) && data.length > 0){
      const insertResult = await context.services.get('mongodb-atlas').db('lang').collection(collectionName).insertMany(data);
      
      response.setStatusCode(200);
      response.setHeader('Content-Type', 'application/json');
      response.setBody(JSON.stringify({msg: `Successfully inserted ${insertResult.insertedIds.length} items!`}));
    } else {
      response.setStatusCode(400);
      response.setHeader('Content-Type', 'application/json');
      response.setBody(JSON.stringify({msg: 'Invalid request body.'}));
  }
};

/* F2E USAGE EXAMPLE:

(async function() {
  try {
    const res = await axios({
      method: 'post',
      url:
        'https://webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-vpdkc/service/lang/incoming_webhook/create-translation',
      data: {
        collection: 'test',
        data: [
          {
            key: 'MY_KEY',
            TW: 'gg',
            CN: 'gg',
            EN: 'Incorrect password',
            pages: ['home']
          }
        ]
      }
    });
    console.log(`insert success! ${res.data.msg}`);
  } catch (err) {
    console.log(err.response.data);
  }
})();

*/
```
5. update Ex:
```js
// https://docs.mongodb.com/realm/mongodb/actions/collection.findOneAndUpdate/
// use EJSON.parse(payload.body.text()) to parse body

/**
 * @param {Object} payload.body.data
 * @param {String} payload.body.data.collection - collection 名稱，如 'B_SERVICE'
 * @param {String} payload.body.data.updatedKey - 需要更新的 Key 名稱
 * @param {Object} payload.body.data.data - 要更新的內容
 *   如 {"key":"LOGIN_FAIL_SNACKBAR_HINT","TW":"登入失敗，請再試一次","CN":"登入失败，请再试一次","EN":"Login fail. Please try again","pages":["home"]}
 */

exports = async function(payload, response) {
  const { collection: collectionName, updatedKey, data } = EJSON.parse(payload.body.text());
  
  try {
    if (!collectionName || !updatedKey || typeof data !== 'object' || !Object.keys(data).some((dataItem) => ['CN', 'TW', 'EN'].includes(dataItem))) {
      throw new Error('Invalid request body.');
    }

    const query = { key: updatedKey };
    const update = { $set: data };
    const options = { returnNewDocument: true };
    const updatedDocument = await context.services.get('mongodb-atlas').db('lang').collection(collectionName).findOneAndUpdate(query, update, options).catch(() => {
        throw new Error('Failed to find and update document.');
      });

    if (!updatedDocument) {
      throw new Error('No document matches the provided query.');
    }
    response.setStatusCode(200);
    response.setHeader('Content-Type', 'application/json');
    response.setBody(
      JSON.stringify({ msg: `Successfully updated document: ${JSON.stringify(updatedDocument)}.` })
    );
  } catch (err) {
    response.setStatusCode(400);
    response.setHeader('Content-Type', 'application/json');
    response.setBody(JSON.stringify({ msg: err.message }));
  }
};

/* F2E USAGE EXAMPLE:

(async function() {
  try {
    const res = await axios({
      method: 'post',
      url:
        'https://webhooks.mongodb-realm.com/api/client/v2.0/app/application-0-vpdkc/service/lang/incoming_webhook/update-translation',
      data: {
        collection: 'andytest',
        updatedKey: 'ABC',
        data: {
          TW: '密碼錯誤',
          CN: '密码错误',
          EN: 'Incorrect password',
          pages: ['home']
        }
      }
    });
    console.log(`update success! ${res.data.msg}`);
  } catch (err) {
    console.log(err.response.data);
  }
})();

*/
```
