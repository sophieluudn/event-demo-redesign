# 2026 科技論壇網站改版 Demo

本專案是既有活動網站的前端改版 Demo，供 IT 團隊以 Vue 與 Ant Design Vue 實作正式版本時參考。

## 交付定位

- Demo 是視覺、資訊架構、文案、響應式布局與互動結果的參考基準。
- 正式站沿用既有後端、API、登入、報名、審核、付款、OTP 與電子憑證邏輯。
- Demo 假資料、靜態跳頁與 QR Code 只是情境示意，不是正式商業邏輯。
- 若 Demo 與既有系統衝突，IT 應保留既有邏輯並提出差異，不可由 AI 自行決定。
- 正式元件使用 Ant Design Vue，但最終外觀以 `css/style.css` 及 `DESIGN-SYSTEM.md` 為準。

## 檔案結構

```text
assets/                  圖片與 favicon
css/style.css            設計 token、共用元件與頁面樣式
js/site.js               Demo 互動
index.html               活動首頁
register.html            報名入口
form.html                報名表單
payment.html             付款項目
success.html             報名成功／付款結果
query.html               報名查詢與 OTP
query-result.html        查詢結果與電子憑證
PAGE-SPEC.md             頁面、流程與狀態規格
DESIGN-SYSTEM.md         視覺與 Ant Design Vue 規格
BEHAVIOR-SPEC.md         互動與狀態規格
ACCEPTANCE-CHECKLIST.md  驗收清單
AI-INSTRUCTIONS.md       AI 開發指令
```

## 建議瀏覽流程

1. `index.html` → `register.html` → `form.html` → `payment.html` → `success.html`
2. `index.html` → `query.html` → `query-result.html`

直接開啟 `index.html` 即可，亦可用任一靜態伺服器啟動。

## 文件閱讀順序

1. `README.md`：確認範圍及規格優先順序。
2. `PAGE-SPEC.md`：了解頁面、流程及資料情境。
3. `DESIGN-SYSTEM.md`：建立 theme 與共用元件。
4. `BEHAVIOR-SPEC.md`：串接既有邏輯與 UI 狀態。
5. `ACCEPTANCE-CHECKLIST.md`：逐頁驗收。
6. `AI-INSTRUCTIONS.md`：連同 Demo 提供給 AI 開發工具。

## 規格優先順序

1. 既有正式系統的商業邏輯、資安規範及資料契約。
2. 經產品負責人確認的需求。
3. 本文件組的明文規格。
4. Demo 在瀏覽器中的實際呈現。
5. Ant Design Vue 預設行為。

## 開發注意事項

- Email 與電話只顯示純文字，不可建立 `mailto:` 或 `tel:` 連結。
- OTP、付款結果、報名資格與 QR Code 必須由既有後端驗證。
- 不可將個資、OTP、付款資料寫入 console、分析事件或錯誤追蹤內容。
- Demo 使用 `:has()`、`:user-invalid` 與 `color-mix()`；正式實作需依支援範圍評估 fallback。

