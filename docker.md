# docker 指令
  
## Ref:
- https://docs.docker.com/install/linux/docker-ce/ubuntu/
- https://www.udemy.com/course/learn-docker/
## 基本指令 container
- ```docker version```，確認版本
- ```docker info```，確認細項
- ```docker```，列出所有指令

## 下載映像檔並執行 container
### docker run nginx
- docker run 意思是，依照指定的映像檔 (image) 創造且執行一個 container。  
- 如果已有映像檔，在 docker host 上，執行 nginx 應用程式的實體 (instance)  
- 如果沒有，會自動先從 docker hub 拉下來最新版的映像檔，再執行。  
  
## 執行 container 相關操作
- ```docker container run 指令```，執行 container 時，同時執行附加指令，如 ```docker container run --publish 80:80 nginx```
- 預設為前台跑，須按 ctrl + c 拿回終端機控制權，Mac 會同時 stop container， windows 要再下指令停止
- ```docker container run --publish 80:80 --detach nginx```，為在後台跑
- ```docker container run --publish 80:80 --name webhost --detach nginx```，加上自己取名 webhost
- ```docker container logs 容器名字```，取得後台的 log，如 ```docker container logs webhost```

## 映像檔其他相關操作
- ```docker pull nginx```，下載映像檔，從 docker hub 拉下來，不執行 container 。下次若使用 ```docker run``` 指令，就不用再抓  
- ```docker images```，檢查目前已下載映像檔
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
  
## 列出 container 內部運作的程式 (process)
- ```docker container top 容器名字```
# docker 行為
  
## 使用 run 指令
- 若無程式 (process / application) 在 container 裡面跑，直接執行映像檔的實體 (instance) 後，會立即退出 (exit)。  
- 若程式 (如網路服務) 在 container 裡面停止，或 crash ，也會立即退出。  
- 用 ```docker ps -a``` 查，會查到該 container 在 exit 的狀態。如輸入 ```docker run ubuntu```   
## run 指令的 attach/detach mode
- ```docker run kodekloud/simple-webapp```，會在前台執行 = attach mode，前台鎖輸入指令的功能，要按 ctrl + c 終止 container 執行。      
- ```docker run -d kodekloud/simple-webapp```，會在後台執行 = detach mode。    
- ```docker attach a043d``` ，將 detach mode 轉成 attach mode  


# 舊版
- ```docker ps```，列出執行中的 container 清單
- ```docker ps -a```，列出執行中、暫停使用 (stopped)、已退出 (exited) 的所有 container 清單
- ```docker run 容器名字 指令```，執行 container 時，同時執行附加指令，如 ```docker run ubuntu sleep 5```
- ```docker exec 容器名字 指令```，已執行的 container，再執行指令，如 ```docker run ubuntu cat /etc/hosts```，意思是在執行中的 ubuntu container印出 /etc/hosts 資料夾下的內容
- ```docker stop 容器名字```，暫停執行中的 container，如 ```docker stop silly_sammet```
- ```docker rm 容器名字```，永久移除 container，如 ```docker rm silly_sammet```
