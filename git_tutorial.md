# Git Quick Setup

## 基本用法

```bash
git add <your files>
git commit -m <commit message>
git push origin <your branch name>
```

## 建立新 branch

- 希望保持 `main` 上是乾淨的，所以大家在開發的時候盡量拉自己的 branch 去寫，寫完再 merge 回來
- branch 取名方式：`your_name/what_this_branch_doing`,  e.g. `Ethan/schedule-form`, 這樣名稱比較有一致性。至於一個 branch 要包含多少 feature 大家可以自己決定。<span style='color: gray'>(如果想用別的命名方式也可以討論～主要就是希望大家一致就好)</span>
- Steps:

```bash
git checkout main  //切到 main
git pull origin main //拉最新的 main
git checkout -b <your_branch_name>  //建立新 branch 並切過去
git status   //確認有在新 branch 上
```

## 建立 Pull Request

- 當你的 feature 都寫好了，想把你的 branch merge 回 main 上，這時候會先發 PR ，確認沒問題後就可以 merge
- `git add/ git commit/ git push origin <your branch>` 之後到 GitHub 上，你會看見上面有一個框框，右邊有一個 create pull request
- 按下去之後他會要你簡單設定一下，設定完之後就可以 create 了 （note: 建立 PR 之後還是可以繼續 push 到這個 branch 上）
- 如果你有改到別人寫的部分或你想要有人 double check，旁邊有一個 request review 按鈕（或是方便一點直接在群組講）
- 確認沒問題後就可以 merge 了
  - 沒有 conflict -> merge 選項選 squash and merge -> merge
  - 有 conflict -> 解 conflict -> squash and merge

### 解 conflict

我自己是用 rebase 的方法，用 merge 也可以，只要能解 conflict 就 ok </br>
steps

1. `git checkout main`
2. `git pull origin main`
3. `git checkout <your branch>`
4. `git rebase main`
5. 會噴 conflict，進 code 手動把有 conflict 的地方修好
6. `git add <conflictFiles>`
7. `git rebase --continue` （可能會叫你寫 commit message，可以直接按 q 跳過）
8. `git push origin <your branch> -f`

## Other

TBD
