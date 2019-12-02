# docker 指令
  
## 下載映像檔並執行 container
### docker run nginx
docker run 意思是，依照指定的映像檔 (image) 創造且執行一個 container。  
如果已有映像檔，在 docker host 上，執行 nginx 應用程式的實體 (instance)  
如果沒有，會自動先從 docker hub 拉下來，再執行。  
  
## 執行 container 相關操作
### docker run 容器名字 指令
執行 container 時，同時執行附加指令，如 ```docker run ubuntu sleep 5```
### docker exec 容器名字 指令
在已執行的 container，執行指令，如 ```docker run ubuntu cat /etc/hosts```，意思是印出 /etc/hosts 資料夾下的內容
  
## 映像檔其他相關操作
### docker pull nginx
下載映像檔，從 docker hub 拉下來，不執行 container 。下次若使用 docker run 指令，就不用再抓  
### docker images
檢查目前已下載映像檔
### docker rmi 名字
移除已下載映像檔，如 docker rmi nginx。須確保沒有 container 在使用該映像檔才可移除
  
## 列出 container 清單
### docker ps
列出執行中的 container 清單
### docker ps -a
列出執行中、暫停使用 (stopped)、已退出 (exited) 的所有 container 清單
  
## 暫停使用 container 
### docker stop 容器名字
暫停執行中的 container，如 docker stop silly_sammet
  
## 移除暫停使用或已退出的 container 
### docker rm 容器名字
永久移除 container，如 docker rm silly_sammet
  
# docker 行為
  
## 使用 run 指令
若無程式 (process / application) 在 container 裡面跑，直接執行映像檔的實體 (instance) 後，會立即退出 (exit)。  
若程式 (如網路服務) 在 container 裡面停止，或 crash ，也會立即退出。  
用 ```docker ps -a``` 查，會查到該 container 在 exit 的狀態。如輸入 ```docker run ubuntu```   
