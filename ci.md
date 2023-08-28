# ci 設定檔範例

## GitLab CI

```yml
stages:
  - lint
  - build
  - deploy

before_script:
  - npm -v
  - node -v

lint_frontend:
  stage: lint
  tags:
    - myRunner
  script:
    - cd frontend
    - npm ci
    - npm run lint
  only:
    refs:
      - merge_requests
    changes:
      - frontend/src/**/*
    variables:
      - ($CI_COMMIT_BRANCH != "release/master" && $CI_COMMIT_BRANCH != "release/stage")

build_frontend:
  stage: build
  tags:
    - myRunner
  script:
    - cd frontend
    - npm ci
    - npm run build
    - echo "Finish build!"
  artifacts:
      name: "bundled_frontend"
      expire_in: 1 week
      paths:
        - frontend/dist/
  only:
    refs:
      - master
      - develop
    changes:
      - frontend/src/**/*
 
deploy_frontend:
  stage: deploy
  tags:
    - myRunner
  variables:
    GITLAB_USER_NAME: my name
    GITLAB_USER_EMAIL: abc@def.com
    GITLAB_PERSONAL_TOKEN: "ABCD"
    DEV_BRANCH_NAME: "release/stage"
    PROD_BRANCH_NAME: "release/master"
    COMMIT_MSG: "build: build frontend from $CI_COMMIT_BRANCH at $CI_COMMIT_TIMESTAMP"
  dependencies:
    - build_frontend
  script:
    - if [ "$CI_COMMIT_BRANCH" == "develop" ]; then DEPLOYED_BRANCH_NAME="$DEV_BRANCH_NAME"; else DEPLOYED_BRANCH_NAME="$PROD_BRANCH_NAME"; fi
    - git config --global user.name "${GITLAB_USER_NAME}"
    - git config --global user.email "${GITLAB_USER_EMAIL}"
    - git pull http://${GITLAB_USER_NAME}:${GITLAB_PERSONAL_TOKEN}@tools.ulsee.com/ulsee360/web-frontend.git/ $CI_COMMIT_BRANCH
    - git add .
    - 'git commit -m "${COMMIT_MSG}"'
    - git log --stat -2
    - git push -f http://${GITLAB_USER_NAME}:${GITLAB_PERSONAL_TOKEN}@tools.ulsee.com/ulsee360/web-frontend.git/ ${DEPLOYED_BRANCH_NAME}
    - echo "Finish deploy frontend from $CI_COMMIT_BRANCH at $CI_COMMIT_TIMESTAMP!"
  only:
    refs:
      - master
      - develop
    changes:
      - frontend/src/**/*

```

## 指令結合 shell 檔，執行多個指令
### package.json
```
 "scripts": {
    "release:dev": "COMMAND A",
    "release:prod": "COMMAND B",
    "release": "./scripts/release.sh",
}
```
### bash ( release.sh )
- 使用迴圈，執行多次 `release:prod`
```bash
#!/bin/bash

TARGET=$(echo "$TARGET" | tr '[:upper:]' '[:lower:]')
COUNTRY=$(echo "$COUNTRY" | tr '[:upper:]' '[:lower:]')

export NEXT_VERSION="$(node -p "require('./package.json').version")"

if [ "$TARGET" == "staging" ] && [ "$COUNTRY" == "all" ]; then
  declare -a RELEASE_ENVS=("staging-sg" "staging-id" "staging-tw" "staging-ph" "staging-th" "staging-my" "staging-vn")
elif [ "$TARGET" == "production" ] && [ "$COUNTRY" == "all" ]; then
  declare -a RELEASE_ENVS=("production-sg" "production-id" "production-tw" "production-ph" "production-th" "production-my" "production-vn")
elif [ "$TARGET" == "dev" ]; then
  declare -a RELEASE_ENVS=("development")
else
  declare -a RELEASE_ENVS=("$TARGET-$COUNTRY")
fi

for E in ${RELEASE_ENVS[@]}; do
  echo "###### Preparing for: ${E}"

  case $E in
    production-sg)
      export RELEASE_TARGET=production-sg
      export TARGET=production
      export COUNTRY=sg
      ;;
    production-my)
      export RELEASE_TARGET=production-my
      export TARGET=production
      export COUNTRY=my
      ;;
    production-th)
      export RELEASE_TARGET=production-th
      export TARGET=production
      export COUNTRY=th
      ;;
    production-tw)
      export RELEASE_TARGET=production-tw
      export TARGET=production
      export COUNTRY=tw
      ;;
    production-ph)
      export RELEASE_TARGET=production-ph
      export TARGET=production
      export COUNTRY=ph
      ;;
    production-id)
      export RELEASE_TARGET=production-id
      export TARGET=production
      export COUNTRY=id
      ;;
    production-vn)
      export RELEASE_TARGET=production-vn
      export TARGET=production
      export COUNTRY=vn
      ;;
    staging-ph)
      export RELEASE_TARGET=staging-ph
      export TARGET=staging
      export COUNTRY=ph
      ;;
    staging-sg)
      export RELEASE_TARGET=staging-sg
      export TARGET=staging
      export COUNTRY=sg
      ;;
    staging-id)
      export RELEASE_TARGET=staging-id
      export TARGET=staging
      export COUNTRY=id
      ;;
    staging-tw)
      export RELEASE_TARGET=staging-tw
      export TARGET=staging
      export COUNTRY=tw
      ;;
    staging-th)
      export RELEASE_TARGET=staging-th
      export TARGET=staging
      export COUNTRY=th
      ;;
    staging-my)
      export RELEASE_TARGET=staging-my
      export TARGET=staging
      export COUNTRY=my
      ;;
    staging-vn)
      export RELEASE_TARGET=staging-vn
      export TARGET=staging
      export COUNTRY=vn
      ;;
    development)
      export RELEASE_TARGET=development
      ;;
  esac

  echo "Needle environment: $RELEASE_TARGET, $NEXT_VERSION"

  echo "Deploying env: $TARGET"

  if [[ "$TARGET" != "dev" ]] ; then
    echo "Deploying now..."
    npm run release:prod
  else
    echo "Deploying to dev now..."
    npm run release:dev
  fi

  echo "###### Done for: ${E}"
  echo "##############################"
done
```
