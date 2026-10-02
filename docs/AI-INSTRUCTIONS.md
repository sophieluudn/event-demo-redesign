# AI 開發指令

將本文件、完整 Demo 及其他規格文件一起提供給 AI 開發工具。

## 任務

把純 HTML／CSS／JavaScript Demo 實作到既有 Vue 專案，使用該專案既有版本的 Ant Design Vue，並串接既有網站功能。

## 開工前必做

1. 讀取 `README.md`、`PAGE-SPEC.md`、`DESIGN-SYSTEM.md`、`BEHAVIOR-SPEC.md`、`ACCEPTANCE-CHECKLIST.md`。
2. 檢查 Vue、Router、狀態管理、Ant Design Vue、theme、i18n、測試及 lint 版本／設定。
3. 找出既有頁面、API client、型別、驗證、登入、付款、OTP 與錯誤處理位置。
4. 列出 Demo 與既有系統差異，再開始修改。
5. 不可猜測 API、狀態碼、路由或 theme token；以既有程式及已安裝版本為準。

## 不可違反的原則

1. Demo 是 UI、資訊架構、文案、互動結果與 RWD 基準。
2. 既有網站是 API、商業規則、登入、報名、審核、付款、OTP、遮罩及憑證安全基準。
3. 不得因使用 Ant Design Vue 改變 Demo 的視覺層級或資訊排列。
4. Ant Design Vue 預設文字過小，必須依 `DESIGN-SYSTEM.md` 調整。
5. 優先用 `ConfigProvider` theme token 及共用樣式，避免散落覆寫與 `!important`。
6. 重用既有元件，合理拆分，但不要過度抽象化。
7. Email 與電話只顯示純文字，不得產生 `mailto:` 或 `tel:`。
8. 保留語意化 HTML、鍵盤操作、焦點管理及螢幕閱讀器支援。
9. 前端不可自行判定付款成功、審核完成、OTP 有效或憑證有效。
10. 不得把 Demo 假資料、假 QR Code、固定 timeout 或靜態狀態帶入正式版。
11. 不得記錄個資、OTP 或付款敏感資料。
12. 規格與既有系統衝突時，列出差異供人員確認，不可自行決定。

## 建議元件邊界

- `AppHeader`：桌機／手機導覽。
- `LanguageSelector`：語系選擇。
- `EventBanner`、`PageHero`、`AppFooter`：頁框。
- `EventInfo`、`EventLocation`、`OrganizerList`：首頁內容。
- `RegistrationForm`：報名欄位與驗證顯示。
- `PaymentOptions`：付款項目。
- `RegistrationSummary`：成功頁報名資訊。
- `RegistrationResultCard`：單筆查詢結果。
- `RegistrationStatusTag`：狀態碼到文案／顏色的 mapping。
- `CredentialModal`：電子憑證、焦點與列印。

先重用既有專案元件；現有元件不能滿足規格時才新增。

## 狀態建模

- 非同步操作使用明確狀態，不用互相衝突的多個 boolean。
- 報名狀態使用既有狀態碼，集中 mapping 到標籤與操作。
- 畫面至少涵蓋 loading、empty、success、validation error、server error、timeout。
- OTP 涵蓋 idle、sending、sent/cooldown、verifying、expired、rate-limited、error。
- 付款涵蓋 idle、submitting、redirecting、success、failure、cancelled、pending confirmation。

## Ant Design Vue 要求

- 先建立／擴充全站 theme，再處理個別元件差異。
- Button、Input、Select 基本高度 40px，主要元件文字 18px。
- Form label 18px、錯誤 16px、正文 20px。
- 檢查 dropdown、Modal、Message、Notification、Tooltip 等 portal 元件的 theme。
- 不可只放大字級而忽略 line-height、padding、元件高度、截斷與觸控區。
- 保留 640、768、1024px 的響應式意圖；可用既有 breakpoint 達成相同結果。

## 建議執行順序

1. 盤點路由及既有功能，產出差異清單。
2. 建立 theme、typography、容器與基本控制項。
3. 建立 Header、Banner、Hero、Footer。
4. 實作首頁。
5. 實作報名入口與表單，保留既有驗證及提交。
6. 實作付款與成功頁，保留既有付款流程。
7. 實作 OTP、查詢結果及電子憑證。
8. 補齊 loading、empty、error、disabled 狀態。
9. 執行 lint、typecheck、unit／component／E2E 測試。
10. 依驗收清單回歸並回報未完成項目。

## 每次提交應回報

- 修改檔案及目的。
- 沿用的既有元件與邏輯。
- 新增的共用元件或 theme token。
- 已驗證的頁面、尺寸及瀏覽器。
- 測試指令與結果。
- 待確認的差異、風險及假設。

## 完成定義

- 7 個頁面情境與主要狀態完成。
- 指定寬度的視覺與 Demo 一致。
- Ant Design Vue 符合大型文字規格。
- 既有功能與資料流程回歸通過。
- 無 `mailto:`、`tel:`、個資 log、假 QR Code 或前端偽造付款成功。
- 無障礙、RWD、錯誤處理及列印通過驗收。

