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
- 最終 `open ~/.zshrc` .zshrc 如下
```
# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# Set name of the theme to load --- if set to "random", it will
# load a random theme each time oh-my-zsh is loaded, in which case,
# to know which specific one was loaded, run: echo $RANDOM_THEME
# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="powerlevel10k/powerlevel10k"

# command line 左邊想顯示的內容
POWERLEVEL10K_LEFT_PROMPT_ELEMENTS=(dir) # <= left prompt 設了 "dir"
# command line 右邊想顯示的內容
POWERLEVEL10K_RIGHT_PROMPT_ELEMENTS=(time) # <= right prompt 設了 "time"

# ...
plugins=(git)

source $ZSH/oh-my-zsh.sh

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# place this after nvm initialization!
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"
  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")
    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
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

## curl 打 API
1. ```curl -I http://localhost:8081/api/xxx```
