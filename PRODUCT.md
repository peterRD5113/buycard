# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React 19 + Vite + React Router v7 + Tailwind CSS v4 + Zustand

## Users

台灣遊戲玩家與數位娛樂消費者，在電腦或手機上購買 MyCard 遊戲點數卡（90 點至 3,290 點共 17 種面額）。他們最在意價格是否透明划算（全站約 95 折）、轉帳付款是否安全直覺、以及匯款後能否穩定拿到正版序號並隨時重查。同時包含後台管理人員，負責核對入帳訂單、人工或從庫存配發點數序號、管理商品價格與匯入序號。

## Product Purpose

提供專注於單一品類（MyCard 點數卡）的線上零售與發卡平台。讓買家能快速選購點數面額、透過 ATM 虛擬帳號（綁定買家轉出銀行與帳號比對）安全付款，並在專人核發後於訂單頁、會員中心與 Email 取得序號與密碼。

## Positioning

只賣正版授權 MyCard 點數卡，全面透明 95 折定價、NT$0 金流處理費、每筆訂單專人核發把關，且單筆滿 NT$1,000 回饋 1% 會員儲值金供下次購卡折抵，序號永久留存於會員中心可隨時一鍵複製。

## Operating Context

買家經常在手機上邊玩手遊邊切出瀏覽器購買點數，或在桌機前儲值端遊；結帳時需切換至網銀 App 複製 16 碼虛擬帳號轉帳，收到序號後再一鍵複製序號與 PIN 碼貼回遊戲儲值中心。管理員則在桌機後台檢視待發卡清單並貼入序號完成核發。

## Capabilities and Constraints

- 完整保留 `baohepoint.com` 的所有前台與後台功能架構：
  - 前台 12 個路由：首頁 (`/`)、商品面額一覽 (`/products`)、商品詳情 (`/products/:id`)、購物車 (`/cart`)、結帳與虛擬帳號配號 (`/checkout`)、訂單狀態與序號檢視 (`/order/:orderNo`)、會員登入 (`/login`)、免費註冊 (`/register`)、會員中心與歷史序號 (`/member`)、常見問題 (`/faq`)、關於我們與條款 (`/about`)、404 頁 (`/*`)。
  - 後台 5 個子路由 (`/admin`)：儀表板統計與庫存 (`/admin`)、待發卡審核與手動/自動配號 (`/admin/fulfill`)、商品改價與批次匯入序號 (`/admin/products`)、訂單狀態管理 (`/admin/orders`)、會員列表 (`/admin/users`)。
- 17 款真實 MyCard 面額商品資料（90、150、170、300、350、400、450、500、750、1000、1150、1490、1690、2000、2500、3000、3290 點）與台灣 25 家常見銀行代碼清單。
- 品牌名稱暫定使用「XX科技」（XX TECHNOLOGY CO., LTD.）。

## Brand Commitments

- **參考視覺標竿**：融合 UI8 `Styla Fashion E-commerce Mobile App UI Kit` 的高對比極簡黑白灰現代零售視覺（純白 `#FFFFFF` 背景、極淺冷灰 `#F5F5F7` / `#F6F6F6` 容器、深炭黑 `#141414` 主操作按鈕與選中膠囊、Archivo 幾何字體家族、無外框線 Borderless 商品網格、手機端頂部儲值金餘額膠囊與底部固定導覽列/抽屜式結帳面板）。
- **嚴格禁止任何「AI 感」（No AI Slop）**：禁止套版式的「英文大寫 Kicker / Eyebrow 小標 + 漸層字」、禁止濫用發光毛玻璃與無意義漂浮卡片、禁止「Icon + 標題 + 短文」的廉價均分三欄/四欄功能吹捧卡、禁止大段空洞的 AI 行銷口號、禁止無偏移量的彩色光暈陰影與 Emoji 充當圖示。介面必須像真實精品零售 App（如 SSENSE、KITH、Apple Store、Styla）一樣克制、精準、以商品與真實交易資訊為絕對主角。

## Evidence on Hand

- 17 張正版 MyCard 各面額點數卡高解析度卡面圖（`/images/products/mycard-90.webp` 至 `mycard-3290.webp`）。
- 完整拆解自 `baohepoint.com` 的商品定價表、ATM 虛擬帳號結帳規則、消保法數位序號條款與 FAQ 實務問答。
- UI8 Styla Fashion E-commerce UI Kit 的 6 張高解析度設計規範圖。

## Product Principles

1. **商品與交易資訊即介面**：不靠空洞標語說服，一進站就能直接看到面額、95 折實價、省下金額與庫存狀態，一鍵完成選購。
2. **雙端原生級體驗（Desktop Editorial + Mobile App Shell）**：桌機版呈現乾淨俐落的現代買手店網格與分欄結帳；手機版則徹底落實 Styla 的行動 App 體驗（頂部漢堡選單＋儲值金餘額膠囊、圓角搜尋與分類膠囊、底部固定 4 格 Tab Bar 導覽、商品詳情與購物車底部固定結帳列）。
3. **極致克制的無 AI 感工藝**：以黑白灰單色階層、字重對比、精準留白與等寬對齊數字（Tabular Numerals）建立秩序，色彩僅用於真實的商品卡面與關鍵狀態（折扣紅/現貨綠）。
