# docker 指令
  
## Ref:
- https://docs.docker.com/install/linux/docker-ce/ubuntu/
- https://www.udemy.com/course/docker-mastery/
- https://hackmd.io/@uoFaNlktTwuOMah6WLMbXA/SyrqM7_NH

## docker engine (CE version) download link for Mac
https://hub.docker.com/editions/community/docker-ce-desktop-mac

## 基本指令 container
- ```docker version```，確認版本
- ```docker info```，確認細項
- ```docker```，列出所有指令

## 下載映像檔並執行 container
### docker run nginx
- docker run 意思是，依照指定的映像檔 (image) 創造且執行一個 container。  
- 如果已有映像檔，在 docker host 上 (存在映像檔快取區)，執行 nginx 應用程式的實體 (instance)  
- 如果沒有，會自動先從 docker hub 拉下來最新版的映像檔，再執行。  
- 執行 nginx 應用程式的實體 (instance) ，會有四個過程: 創造新 container、在內部的 docker 引擎，給定虛擬 IP 及私有網路、打開主機 port 並導向到指定的 container 內部 port (如果指令中有含 ```--publish 80:80``` 的設定)、執行 container
  
## 執行 container 相關操作
- ```docker container run 指令```，執行 container 時，同時執行附加指令，如 ```docker container run --publish 80:80 nginx```
- ```--publish 80:80``` 表示接下主機的 80 port ，導向 container 的 80 port。
- ```--publish 8888:80``` 表示可在主機網址打 localhost:8888，進到 container 的 80 port
- 預設為前台跑，須按 ctrl + c 拿回終端機控制權，Mac 會同時 stop container， windows 要再下指令停止
- ```docker container run --publish 80:80 --detach nginx```，為在後台跑，```--detach``` 可寫成 ```-d```
- ```docker container run --publish 80:80 --name webhost --detach nginx```，加上自己取名 webhost
- ```docker container logs 容器名字```，取得後台的 log，如 ```docker container logs webhost```
- ```docker container run -e MYSQL_RANDOM_ROOT_PASSWORD=true mysql```，```-e```可設定環境變數

## 映像檔其他相關操作
- ```docker pull nginx```，下載映像檔，從 docker hub 拉下來，不執行 container 。下次若使用 ```docker run``` 指令，就不用再抓  
- ```docker images```，檢查目前已下載映像檔，或 ```docker image ls```
- ```docker rmi 映像檔名字```，移除已下載映像檔，如 docker rmi nginx。須確保沒有 container 在使用該映像檔才可移除
  
## 列出 container 清單
- ```docker container ls```，列出執行中的 container 清單
- ```docker container ls -a```，列出執行中、暫停使用 (stopped)、已退出 (exited) 的所有 container 清單
  
## 暫停使用 container 
- ```docker container stop ID前碼```，暫停執行中的 container，如 ```docker container stop 690```

## 恢復已停用 container 
- ```docker container start ID前碼```
  
## 移除暫停使用或已退出的 container 
- ```docker container rm ID前碼```，永久移除 container，如 ```docker container rm 630 690 0de```
- ```docker container rm -f ID前碼```，永久移除 container，執行中的 container 也強迫移除

## container 內 process 相關指令
- ```docker container top 容器名字```，列出 container 內部運作的程式 (process)
- ```docker container inspect 容器名字```，列出 container 內部運作的程式 (process) 的 JSON 細節
- ```docker container stats```，列出 container 內部運作所有程式 (process) 的效能狀況，看完後要按 ctrl + c 跳出

## 進入 container 內的終端機，互動介面
- ```docker container run -it nginx bash ```，建立新的 container ，並執行 container 內部的終端機 bash 程式，並可直接輸入指令操作該 container。後輸入 exit 可跳出 
- 此時會把 nginx 剛開始要跑的預設程式 ("nginx -g 'daemon...")，換成 bash 程式
- 輸入 exit 可跳出後，因為 container 無程式在跑， container 會變成退出狀態 (exited)
- ```docker container run -it ubuntu ```，因 ubuntu 要跑的預設程式就是 bash，所以不用附加 bash 指令，直接就可以進入 container 內終端機
- ```docker container run -it alpine sh ```，因 alpine 內部沒有 bash ，無法執行此程式，只有輕量化的程式 sh，故要下此指令。若有需要的話，可進入 sh 之後再灌 bash
- ```docker container exec -it 容器名字 附加指令 ```，在已有的 container 執行附加指令

# docker 行為
## 觀念
- 若有程式在 container 裡面跑，該程式只是本機的其中一個應用程式。若停止 container 裡面的程式，就會關閉程式，搜尋本機的應用程式會搜不到。
## 使用 run 指令
- 若無程式 (process / application) 在 container 裡面跑，直接執行映像檔的實體 (instance) 後，會立即退出 (exit)。  
- 若程式 (如網路服務) 在 container 裡面停止，或 crash ，也會立即退出。  
- 用 ```docker ps -a``` 查，會查到該 container 在 exit 的狀態。如輸入 ```docker run ubuntu```   
## run 指令的 attach/detach mode
- ```docker run kodekloud/simple-webapp```，會在前台執行 = attach mode，前台鎖輸入指令的功能，要按 ctrl + c 終止 container 執行。      
- ```docker run -d kodekloud/simple-webapp```，會在後台執行 = detach mode。    
- ```docker attach a043d``` ，將 detach mode 轉成 attach mode  
- detach mode: By running in detached mode, we are able to have access to our command line when the container spins up and runs. Without it, we would have logs constantly fed onto the screen.

# 舊版
- ```docker ps```，列出執行中的 container 清單
- ```docker ps -a```，列出執行中、暫停使用 (stopped)、已退出 (exited) 的所有 container 清單
- ```docker run 容器名字 指令```，執行 container 時，同時執行附加指令，如 ```docker run ubuntu sleep 5```
- ```docker exec 容器名字 指令```，已執行的 container，再執行指令，如 ```docker run ubuntu cat /etc/hosts```，意思是在執行中的 ubuntu container印出 /etc/hosts 資料夾下的內容
- ```docker stop 容器名字```，暫停執行中的 container，如 ```docker stop silly_sammet```
- ```docker rm 容器名字```，永久移除 container，如 ```docker rm silly_sammet```

# Kubernetes
- 用途: AWS, Google, and Azure all offer Kubernetes as a service. It is a tool for packaging and deploying self-contained systems across many servers.
- 觀念與教學：https://cwhu.medium.com/kubernetes-basic-concept-tutorial-e033e3504ec0

# Kubernetes 相關操作指令 with AWS login

## AWS 及 kubectl
### AWS Cli
1. 安裝 aws cli:
```
$ curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg" 
$ sudo installer -pkg AWSCLIV2.pkg -target /
```
2. 檢查有安裝成功 （ 輸入以下指令按 enter，會出現 aws-cli/2.10.0 Python/3.11.2 Darwin/18.7.0 botocore/2.4.5 ）
```
$ aws --version
```
3. 設定自己的首個登入資料
```
$ aws configure sso
```
4. 設定自己第二個登入資料，( 如果要第二組 production
```
$ aws configure sso --profile <自己要取的名字>
```
5. 設定完成後，未來可用 `open ~/.aws/config` 調整文件內容，比如
```
[profile xxx-profile]
sso_session = ooo
sso_account_id = 0123456789
sso_role_name = xxDev

[sso-session XXX]
sso_start_url = SOME_URL 
sso_region = ap-southeast-1
sso_registration_scopes = sso:account:access

[default]
sso_session = ooo
sso_account_id = 0123456788
sso_role_name = xxProd
```

### Login and Check
- login: `aws sso login --profile YOUR_CREATED_PROFILE`
- 看在某個 region 下，所有 cluster 的名稱: `aws eks list-clusters --region YOUR_REGION_NAME_SETTING_IN_AWS --profile YOUR_CREATED_PROFILE`
- Link local terminal to remote EKS: ( 2 examples, `--name dev-eks` means cluster name )
```
aws eks --region ap-southeast-1 update-kubeconfig --name dev-eks --profile YOUR_CREATED_PROFILE  --alias dev
```
```
aws eks --region ap-southeast-1 update-kubeconfig --name staging-eks --profile YOUR_CREATED_PROFILE --alias staging
```
- 成功後，可用以下指令看，使否有 context 資訊列出 `kubectl config get-contexts`
- 或是用以下指令，僅列出目前所設定的 aws context 名稱: `kubectl config get-contexts -o=name`
- 看全部 namespace: `kubectl get namespace`
- 拿 namespace 看其中一個 pod: `kubectl -n development get pod | grep POD_NAME`


## kubectx, flux 及 k9s ( 背後操作 kubectl ) 好用指令
- 切換 cluster: `kubectx TARGET_CLUSTER`
- 看全部 namespace: kubectl get namespace
- 看版本: `flux get hr --context prod-tw -n production-tw | grep POD_NAME`
- 用打指令的方式，進入 pod 的終端機，使用 shell: `kubectl exec -it POD_NAME -n NAME_SPACE bash`
- 進入總操作模式：`k9s --namespace development --context dev`
- 進入總操作模式後，常用指令
  1. enter
  2. esc: 回上一步
  3. l: 列出 server log( 即時 )
  4. d: describe ( 顯示 pod 的資訊 )
  5. s: shell 進入 pod ( 再輸入 exit 再按 enter 退出 )
  6. c: 複製 log 完整文字
  7. /: 搜尋關鍵字
- 進入 shell 後，可能的指令
  1. 查看一個環境變數: `echo $COUNTRIES`
  2. 查看所有環境變數: `printenv`
  3. 修改一個環境變數: `SB_COUNTRIES=TW,SG`
  4. 可以看看有沒有 node 在環境中: `node -v`
  5. 如果有的話，可以執行一串 JS 程式碼，先進入 node 互動模式: `node`
  6. 再貼上需要執行的程式碼，按 enter 後執行，很像瀏覽器開發人員工具，比如輸入: `console.log('hi')`
  7. ~~`control + C` 兩次~~，輸入 `exit`，退出 node 互動模式
  
## 檢查 k8s pod 內 redis ( cluster mode ) 的指令：
- redis 因為使用 cluster mode，會有複數 pods，可能情況如下
```
   NAME                            PF READY RESTARTS STATUS 
│ my-cluster-redis-cluster-0       ●  1/1          0 Running 
│ my-cluster-redis-cluster-1       ●  1/1          2 Running
│ my-cluster-redis-cluster-2       ●  1/1          2 Running
│ my-cluster-redis-cluster-3       ●  1/1          0 Running
│ my-cluster-redis-cluster-4       ●  1/1          2 Running
│ my-cluster-redis-cluster-5       ●  1/1          0 Running
```
- 此時，若要在 local 連到 pod，需要先讓 pod 能夠有對外的 port，才能從外部對接到內部，需要在終端機，輸入以下 port-forward 指令
```sh
k port-forward pods/my-cluster-redis-cluster-0 6380:6379 &
k port-forward pods/my-cluster-redis-cluster-1 6381:6379 &
k port-forward pods/my-cluster-redis-cluster-2 6382:6379 &
k port-forward pods/my-cluster-redis-cluster-3 6383:6379 &
k port-forward pods/my-cluster-redis-cluster-4 6384:6379 &
k port-forward pods/my-cluster-redis-cluster-5 6385:6379 &
```
NOTE: 指令意義是，開放 6380 給外部，外部可以打進去 0 號 pod 內的 6379 port，開放 6381 可打進去 1 號 pod 內的 6379 port
- local 執行 redis-cli 指令，查看 pod 內的資訊，比如列出 key，查找單一 key 等: `redis-cli -p <port> -a <password>` 再打 `KEYS *` 或是 `GET <key name>`
- 查找複數 pod 的單一 key ( 如 key 名稱為 abs )：
```sh
redis-cli -p 6380 -a <password> GET abs &&
redis-cli -p 6381 -a <password> GET abs &&
redis-cli -p 6382 -a <password> GET abs &&
redis-cli -p 6383 -a <password> GET abs &&
redis-cli -p 6384 -a <password> GET abs &&
redis-cli -p 6385 -a <password> GET abs
```
