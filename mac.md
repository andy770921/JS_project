# 安裝與設定


## iTerm2
- https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f
- font-sourcecodepro-nerd-font 2020 年後安裝法：https://medium.com/@prinswu/zsh-oh-my-zsh-powerlevel9k-in-2020-macbook-pro-13-c85f6a409bee
- VSCode Setting.json 設定如下
```json
{    
    "terminal.integrated.fontFamily": "SauceCodePro Nerd Font",
    "terminal.integrated.fontSize": 14
}
```
- 若 VSCode 預設的終端機仍是 bash 需要調整兩個地方，開啟 VSCode 終端機介面，點擊介面右上角加號，右邊下拉箭頭，選「設定終端設定」，可改如下
```
// 舊版改法 Ref: https://stackoverflow.com/questions/29957456/change-default-terminal-app-in-visual-studio-code-on-mac
Terminal: Explorer Kind （自訂啟動的終端機類型。）
選 External

Terminal › External: Osx Exec（自訂要在 macOS 執行哪個終端機應用程式。）
輸入 iTerm.app
```
- 點擊終端機介面右上角加號，右邊下拉箭頭，選「選取預設設定檔」，可在 VSCode 最上方搜尋欄選 「zsh」

## docker engine download  
https://hub.docker.com/editions/community/docker-ce-desktop-mac  
Ref:  
https://www.udemy.com/course/docker-mastery/learn/lecture/7742912#overview  
## 同步 bash 和 zsh 的 node
https://bonze.tw/mac-%E8%A7%A3%E6%B1%BA-zsh-command-not-found/
最後一行，可能如下面範例加入這行
```
export PATH=$PATH:/Users/andychou/.nvm/versions/node/v12.13.0/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
```
## 常用的 command line 指令
1. ```ls -a```：列出目前目錄下所有資料夾與檔案
2. ```open .zshrc```：打開 .zshrc 檔案並編輯
