# Travelaurence

Develop with ethan890914 and ClipperSank.

## Project Introduction

- 簡介

  - **TraveLaurence** 是一個兼具行程安排跟景點評論的地方的旅遊平台，提供用戶方便簡潔的操作介面，查找各地的特色景點以及規劃自己的旅程。

- 功能

1. 註冊帳號、登入、登出：
    1. 使用者可以用 username/email/password 註冊帳號。
    2. 登入前僅能搜尋景點，登入後即可使用平台的行程規劃、願望清單等進階功能。
2. 搜尋景點：
    1. 可在 homepage 搜尋景點關鍵字，查找名字、地址相關的景點。
    2. 若收藏景點至個人願望清單，日後可以加入自己的行程規劃。
    3. 可以瀏覽其他用戶對景點的評論，也可以留下自己的評論。
    4. 若有自己的私房景點沒有被收錄在網路上，可以在 homepage 新增景點。
3. 行程規劃：
    1. 在個人介面可以新增一個新的行程。
    2. 在行程規劃介面中，可以從願望清單中安排自己想要的行程在任意時段。

- Note：所有操作都必須先登入

## Steps To Run the Project

1. paste your mongoDB URL at `backend/.env.default`
2. At root folder, `yarn start`
3. At root folder, `yarn server`
4. If You want to use default data, set `MODE=SET` at `backend/.env.default`
5. You can register a new account, or use default accounts, please refer to `backend/data/user.json` to see detailed information.
