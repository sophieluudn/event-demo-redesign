# 2026 科技論壇 AI Agent 新賽局 — HTML + CSS + JavaScript 版

由 Vue 3 專案改寫，不需 Node、不需建置，直接用瀏覽器開啟 `index.html` 即可。少量原生 JavaScript 用於鍵盤可操作的選單、彈窗與驗證碼流程。

## 專案結構

```text
tech-event-html-css/
├─ assets/              # 圖片與網站圖示
│  ├─ banner.jpg
│  └─ favicon.svg
├─ css/                 # 全站樣式
│  └─ style.css
├─ js/                  # 全站原生互動
│  └─ site.js
├─ index.html           # 首頁
├─ register.html        # 報名入口
├─ form.html            # 報名表單
├─ payment.html         # 付款
├─ success.html         # 報名成功
├─ query.html           # 報名查詢
└─ query-result.html    # 查詢結果
```

## 原本 Vue 互動 → 靜態版對應
| 原本 | 現在 |
|---|---|
| 畫面切換 (`useView`) | 一般 `<a href>` 換頁 |
| 手機選單 | 原生 `<button>` + JavaScript |
| 語系選單 | `<details>`（仍未串接多語系） |
| 彈窗（電子憑證、等待審核中） | 原生 `<dialog>`，支援 Esc、焦點管理與背景關閉 |
| 表單驗證 | 瀏覽器原生 `required` / `type=email`，錯誤框用 `:user-invalid` |
| 發送驗證碼 | JavaScript 驗證手機格式後顯示驗證碼欄；尚無 60 秒倒數 |

## 已知限制
- 「列印」按鈕由共用 JavaScript 呼叫 `window.print()`；已加列印樣式，只印開啟中的電子憑證。
- 尚未串接後台，因此無法真的發送簡訊、驗證資料或帶入表單內容；付款／成功／查詢頁為示意資料。
- 需要 `:has()`、`:user-invalid`、`color-mix()` 與 `<dialog>`，請用近兩年的 Chrome / Edge / Safari / Firefox。
