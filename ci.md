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
