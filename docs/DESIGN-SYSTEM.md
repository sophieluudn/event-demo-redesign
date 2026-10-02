# 設計系統與 Ant Design Vue 調整規格

## 實作原則

- Ant Design Vue 提供元件結構與互動，不是最終視覺標準。
- 最終字級、行高、尺寸、間距、色彩、圓角與 RWD 以 Demo 及本文件為準。
- 優先使用 `ConfigProvider` theme token 與全站 CSS variables。
- token 無法表達的差異才使用共用 class，避免各頁散落 `!important`。
- 元件放大後要重查換行、欄寬、Modal 高度、卡片密度及手機布局。

## 字型與文字

```css
'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
'Helvetica Neue', Arial, 'PingFang TC', 'Microsoft JhengHei', sans-serif
```

| 用途 | 手機 | 768px 以上 | 行高／字重 |
|---|---:|---:|---|
| 正文 | 20px | 20px | 1.75 / 400 |
| 表單、按鈕、元件 | 18px | 18px | 1.5 / 400–500 |
| Label | 18px | 18px | 1.5 / 500 |
| 輔助、錯誤 | 16px | 16px | 1.5 |
| H1 | 36px | 48px | 1.25 / 700 |
| H2 | 26px | 30px | 1.35 / 700 |
| H3／Modal 標題 | 22px | 24px | 1.4 / 700 |
| Logo 文字 | 14px | 14px | 700 |

不得直接沿用 Ant Design Vue 較小的預設文字。

## 色彩

| Token | 色值 | 用途 |
|---|---|---|
| primary | `#2563eb` | 主按鈕、連結、焦點、裝飾 |
| white | `#ffffff` | 背景、卡片、輸入框 |
| text | `#1a2236` | 主要文字 |
| text-muted | `#5a6478` | 次要文字 |
| label / placeholder | `#6b7280` | Label、placeholder |
| border | `#dde3ec` | 一般邊框 |
| border-strong | `#d1d5db` | 次按鈕、控制框 |
| surface | `#f5f7fa` | hover、淺底 |
| surface-header | `#f8fafc` | 結果卡片標頭 |
| primary-soft | `#ecf5ff` | 選取／憑證淺底 |
| dark | `#1a2236` | Footer |
| success | `#137a38` | 完成 |
| warning | `#995400` | 審核中 |
| danger | `#b91c1c` | 錯誤、未通過、必填 |

顏色組合須符合 WCAG AA；狀態不可只靠顏色表達。

## 尺寸與布局

| 項目 | 規格 |
|---|---|
| 一般內容最大寬度 | 1080px |
| 窄版內容最大寬度 | 860px |
| 左右留白 | 手機 24px；640px 以上 48px |
| 導覽列高度 | 68px |
| 表單／按鈕基本高度 | 40px |
| 圓角 | 4px／8px／15px |
| Label 桌機寬度 | 136px |
| 主要斷點 | 640px、768px、1024px |

間距以 5px 為基礎，常用 5、10、15、20、25、30、40、50、60px。

## Ant Design Vue 元件對照

| 需求 | 建議元件 | 必要調整 |
|---|---|---|
| 按鈕 | `AButton` | 高 40px、字 18px、圓角 4px、水平 padding 20px |
| 單行輸入 | `AInput` | 高 40px、字 18px、padding 4px 11px、圓角 4px |
| 選單 | `ASelect` | 高 40px、選取文字與 option 18px、選項點擊高度至少 40px |
| 表單 | `AForm`／`AFormItem` | Label 18px、錯誤 16px、Label 間距 8px |
| Checkbox | `ACheckbox` | 方框至少 18px、文字 18px、長文頂端對齊 |
| Radio | `ARadioGroup` | 圓形至少 18px、文字 18px、整列可點擊 |
| 卡片 | `ACard` 或語意化容器 | 邊框 `#dde3ec`、圓角 8px，避免預設 padding 改變密度 |
| 標籤 | `ATag` | 字 18px、pill 外觀、狀態色依 mapping |
| 彈窗 | `AModal` | 約 400–520px、標題 22–24px、內容 20px、手機邊距 16px |
| 語系 | `ADropdown` | trigger／選項 18px、點擊區至少 40px、支援鍵盤 |
| 訊息 | `AAlert`／message | 不使用過小預設字；錯誤能被輔助科技感知 |
| 載入 | `ASpin`／button loading | 保留布局並提供可理解文字 |
| 空狀態 | `AEmpty` | 文案 18–20px，依既有站操作呈現 |
| 分頁 | `APagination` | 文字 16–18px，互動目標建議至少 40×40px |

## Theme 設定方向

實際 token 名稱依專案安裝版本確認，不可由 AI 猜測：

```ts
const theme = {
  token: {
    colorPrimary: '#2563eb',
    colorText: '#1a2236',
    colorTextSecondary: '#5a6478',
    colorBorder: '#dde3ec',
    colorError: '#b91c1c',
    colorSuccess: '#137a38',
    colorWarning: '#995400',
    fontFamily: "'Noto Sans TC', sans-serif",
    fontSize: 18,
    borderRadius: 4,
    controlHeight: 40
  }
}
```

這只是設定方向；IT 必須依實際 Ant Design Vue 版本及既有 theme 合併。也要檢查 Select dropdown、Modal、Message、Notification、Tooltip 等 portal 元件是否套用成功。

## 響應式規格

- 640px 以下：主要操作通常全寬；付款項目、查詢手機欄位與按鈕上下排列。
- 768px 以下：資訊列上下排列；標題使用手機尺寸。
- 768px 以上：資訊 label／內容左右排列；成功頁憑證橫向排列。
- 1024px 以下（不含 1024px）：章節導覽與語系收進選單，報名查詢與立即報名保留。
- 1024px 以上：導覽完整展開，錨點維持單行、間距 32px；籌辦單位 Logo 卡片最多四欄。
- 所有寬度不得有非預期水平捲動。

## 焦點與回饋

- `:focus-visible` 使用 2px primary outline、offset 2px，或等效清楚樣式。
- 輸入 focus 使用 primary 邊框與淡色 focus ring。
- 錯誤使用 danger 邊框及 16px 錯誤文字。
- disabled 必須有文字、色彩與游標差異，並保持可讀性。

