# 企業教育訓練招生網站 UI 改造 Prompt

你是一位熟悉 **Bootstrap 5、CSS3、JavaScript 與 jQuery** 的資深前端工程師。請將我提供的「課程線上報名表」改造成**巨匠電腦風格的企業招生網站（教學模擬版）**，讓頁面具有正式商業網站的質感，但保持程式容易閱讀與教學。

## 一、視覺與排版

- **品牌風格**：以紅、白、深灰為主色；專業、簡潔、俐落，不要大量動畫或華麗特效。可使用 `:root` 統一管理色彩。
- **頁面結構**：品牌導覽列 → AI 課程介紹 Banner → 線上報名表 → 報名資料確認 → Footer。
- **桌面排版**：Bootstrap Grid 左側 `col-lg-8` 放表單，右側 `col-lg-4` 放課程特色及報名提醒。
- **手機排版**：自動變成單欄，欄位與按鈕容易閱讀、點擊；適當使用 `card`、`shadow`、`rounded`、間距與留白。
- **內容文案**：主題為「AI 輔助全端程式設計」，介紹 HTML、CSS、JavaScript、jQuery、AJAX 與 AI 協作等學習內容。勿編造學費、開課日期或官方優惠。
- **品牌註記**：屬於教學模擬網站，不冒用官方授權，不強制使用官方 Logo。

## 二、表單與互動功能（全部保留）

1. **姓名**：2～8 字，使用 `input` 即時驗證、Bootstrap `is-valid` / `is-invalid`。
2. **Email**：保留原本的 `change`、正規表達式及教學用長度規定。
3. **密碼**：保留 8～16 字驗證；不顯示明文，**不寫入 LocalStorage**。
4. **手機**：使用 `/^09\d{8}$/` 驗證臺灣手機格式。
5. **縣市下拉選單**：以 jQuery AJAX 讀取 `js/json/CityCountyData.json`，產生縣市選項並驗證必填。
6. **Checkbox**：感興趣課程可複選，至少選一項；保留 `:checked`、`.each()`、陣列處理。
7. **Radio**：偏好的上課方式必須選一項；保留 `name` 分組和 `.val()`。
8. **Switch**：是否接收課程資訊，使用 `.prop("checked")` 顯示開關狀態。
9. **Range**：能力自評 1～10 分，使用 `input` 即時更新畫面。
10. **SweetAlert2**：表單驗證通過、失敗，以及 AJAX 讀取失敗時，顯示合適訊息；錯誤時保留使用者輸入。
11. **報名確認**：驗證通過後，在下方顯示姓名、Email、手機、縣市、課程、上課方式、通知及能力分數；密碼遮罩顯示。避免將使用者輸入直接當作 HTML 執行。

## 三、LocalStorage 草稿暫存

- 自動暫存與還原：姓名、Email、手機、縣市、Checkbox、Radio、Switch、Range。
- Checkbox 陣列使用 `JSON.stringify()`、`JSON.parse()`；Switch 的 `"true"` / `"false"` 要正確轉換。
- **縣市必須等 AJAX 選項產生完成後再還原**，並同步恢復表單驗證與畫面狀態。
- 「重新填寫」要清除本表單的暫存並重設畫面；模擬報名成功後清除草稿，驗證失敗則保留。
- 不使用 `localStorage.clear()`，避免刪掉網站其他資料；敏感個資在正式系統應審慎評估暫存風險。

## 四、開發限制與交付要求

- 沿用原本的 `css/bootstrap.min.css`、`css/myall.css`、`js/bootstrap.bundle.min.js`、`js/jquery-4.0.0.js` 與縣市 JSON 路徑。
- **保留既有 `id`、`name`、主要事件監聽、驗證旗標與資料處理邏輯**，不要因改版造成功能失效。
- 只使用 HTML5、CSS3、Bootstrap 5、原生 JavaScript、jQuery、AJAX、LocalStorage、SweetAlert2；不要引入 Vue、React、Tailwind 等新框架。
- 使用清楚的繁體中文註解；CSS 以集中管理為主，不要過度拆分檔案。
- 提供**可直接運行的完整 HTML 程式碼**，不可省略 JavaScript 或僅提供片段；確認桌面／手機 RWD、事件、驗證、暫存還原、送出與重設均正常。
- 此階段「送出成功」仍是**前端模擬**，未串接真正後端 API，不可假稱已寫入資料庫。

**請先理解我提供的原始程式，再完成整體 UI 改造；視覺可以提升，但現有功能必須完整保留。**
