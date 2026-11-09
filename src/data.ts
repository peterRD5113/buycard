export interface Product {
  id: number;
  category_id: number;
  name: string;
  face_value: number;
  description: string;
  price: number;
  original_price: number;
  badge: '現貨' | '熱銷' | '超值';
  delivery: 'manual' | 'auto';
  sort_order: number;
  status: 'active' | 'inactive' | 'sold_out';
  image_url: string;
  stock: number;
}

export interface SerialCode {
  code: string;
  pin?: string;
  product_name?: string;
}

export interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  face_value: number;
  price: number;
  quantity: number;
  codes: SerialCode[];
}

export interface PaymentInfo {
  channel: 'vatm';
  bank_name: string;
  vatm_bank_code: string;
  vatm_account: string;
  payer_bank_code: string;
  payer_account_last5: string;
  amount: number;
  expire_at: string;
}

export interface Order {
  id: number;
  order_no: string;
  user_id?: number;
  name: string;
  phone: string;
  email: string;
  tax_id?: string;
  payment_method: 'atm';
  subtotal: number;
  discount_credit: number;
  total: number;
  earned_credit: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded';
  created_at: string;
  items: OrderItem[];
  payment?: PaymentInfo;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'member' | 'admin';
  store_credit: number;
  created_at: string;
}

export const COMPANY_INFO = {
  brandShort: 'XX科技',
  name: 'XX科技有限公司',
  enName: 'XX TECHNOLOGY CO., LTD.',
  taxId: '83362653',
  phone: '0909-554-141',
  email: 'service@xxtechpoint.com',
  address: '桃園市桃園區武陵里005鄰中正路60號地下一層之65',
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 9,
    category_id: 1,
    name: 'MyCard 90 點',
    face_value: 90,
    description: 'MyCard 90 點數位儲值序號，適用於台灣區所有支援 MyCard 儲值之手機遊戲、線上遊戲與數位內容平台。',
    price: 86,
    original_price: 90,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 90,
    status: 'active',
    image_url: '/images/products/mycard-90.webp',
    stock: 18,
  },
  {
    id: 10,
    category_id: 1,
    name: 'MyCard 150 點',
    face_value: 150,
    description: 'MyCard 150 點數位儲值序號，適用於支援 MyCard 儲值之手遊月卡、通行證與各式數位服務。',
    price: 143,
    original_price: 150,
    badge: '熱銷',
    delivery: 'manual',
    sort_order: 150,
    status: 'active',
    image_url: '/images/products/mycard-150.webp',
    stock: 42,
  },
  {
    id: 11,
    category_id: 1,
    name: 'MyCard 170 點',
    face_value: 170,
    description: 'MyCard 170 點數位儲值序號，精準對應特定手遊禮包與月卡面額，免湊單直接儲值。',
    price: 162,
    original_price: 170,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 170,
    status: 'active',
    image_url: '/images/products/mycard-170.webp',
    stock: 15,
  },
  {
    id: 12,
    category_id: 1,
    name: 'MyCard 300 點',
    face_value: 300,
    description: 'MyCard 300 點數位儲值序號，適用於各大線上遊戲與手遊雙倍首儲方案。',
    price: 285,
    original_price: 300,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 300,
    status: 'active',
    image_url: '/images/products/mycard-300.webp',
    stock: 26,
  },
  {
    id: 13,
    category_id: 1,
    name: 'MyCard 350 點',
    face_value: 350,
    description: 'MyCard 350 點數位儲值序號，熱門手遊季度通行證與限定禮包常用面額。',
    price: 333,
    original_price: 350,
    badge: '熱銷',
    delivery: 'manual',
    sort_order: 350,
    status: 'active',
    image_url: '/images/products/mycard-350.webp',
    stock: 31,
  },
  {
    id: 14,
    category_id: 1,
    name: 'MyCard 400 點',
    face_value: 400,
    description: 'MyCard 400 點數位儲值序號，官方正版授權點數，支援 MyCard 會員轉點與直儲。',
    price: 380,
    original_price: 400,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 400,
    status: 'active',
    image_url: '/images/products/mycard-400.webp',
    stock: 12,
  },
  {
    id: 15,
    category_id: 1,
    name: 'MyCard 450 點',
    face_value: 450,
    description: 'MyCard 450 點數位儲值序號，官方正版授權點數，支援 MyCard 會員轉點與直儲。',
    price: 428,
    original_price: 450,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 450,
    status: 'active',
    image_url: '/images/products/mycard-450.webp',
    stock: 19,
  },
  {
    id: 16,
    category_id: 1,
    name: 'MyCard 500 點',
    face_value: 500,
    description: 'MyCard 500 點數位儲值序號，中型儲值主力面額，付款完成專人即時核發。',
    price: 475,
    original_price: 500,
    badge: '熱銷',
    delivery: 'manual',
    sort_order: 500,
    status: 'active',
    image_url: '/images/products/mycard-500.webp',
    stock: 50,
  },
  {
    id: 17,
    category_id: 1,
    name: 'MyCard 750 點',
    face_value: 750,
    description: 'MyCard 750 點數位儲值序號，官方正版授權點數，適用於 MyCard 全通路合作遊戲。',
    price: 713,
    original_price: 750,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 750,
    status: 'active',
    image_url: '/images/products/mycard-750.webp',
    stock: 14,
  },
  {
    id: 18,
    category_id: 1,
    name: 'MyCard 1000 點',
    face_value: 1000,
    description: 'MyCard 1000 點數位儲值序號，最受歡迎標準大面額，立省 NT$50，滿千再享會員儲值金回饋。',
    price: 950,
    original_price: 1000,
    badge: '熱銷',
    delivery: 'manual',
    sort_order: 1000,
    status: 'active',
    image_url: '/images/products/mycard-1000.webp',
    stock: 64,
  },
  {
    id: 19,
    category_id: 1,
    name: 'MyCard 1150 點',
    face_value: 1150,
    description: 'MyCard 1150 點數位儲值序號，單筆即達滿千門檻，額外享 1% 會員儲值金回饋。',
    price: 1093,
    original_price: 1150,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 1150,
    status: 'active',
    image_url: '/images/products/mycard-1150.webp',
    stock: 20,
  },
  {
    id: 20,
    category_id: 1,
    name: 'MyCard 1490 點',
    face_value: 1490,
    description: 'MyCard 1490 點數位儲值序號，對應 iOS / Android 手遊中大額禮包階梯，單筆享 1% 儲值金回饋。',
    price: 1416,
    original_price: 1490,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 1490,
    status: 'active',
    image_url: '/images/products/mycard-1490.webp',
    stock: 16,
  },
  {
    id: 21,
    category_id: 1,
    name: 'MyCard 1690 點',
    face_value: 1690,
    description: 'MyCard 1690 點數位儲值序號，官方正版授權點數，單筆享 1% 儲值金回饋。',
    price: 1606,
    original_price: 1690,
    badge: '現貨',
    delivery: 'manual',
    sort_order: 1690,
    status: 'active',
    image_url: '/images/products/mycard-1690.webp',
    stock: 11,
  },
  {
    id: 22,
    category_id: 1,
    name: 'MyCard 2000 點',
    face_value: 2000,
    description: 'MyCard 2000 點數位儲值序號，重度玩家首選大面額，立省 NT$100 並回饋 NT$19 儲值金。',
    price: 1900,
    original_price: 2000,
    badge: '超值',
    delivery: 'manual',
    sort_order: 2000,
    status: 'active',
    image_url: '/images/products/mycard-2000.webp',
    stock: 28,
  },
  {
    id: 23,
    category_id: 1,
    name: 'MyCard 2500 點',
    face_value: 2500,
    description: 'MyCard 2500 點數位儲值序號，立省 NT$125 並回饋 NT$24 儲值金，序號永久留存會員中心。',
    price: 2375,
    original_price: 2500,
    badge: '超值',
    delivery: 'manual',
    sort_order: 2500,
    status: 'active',
    image_url: '/images/products/mycard-2500.webp',
    stock: 15,
  },
  {
    id: 24,
    category_id: 1,
    name: 'MyCard 3000 點',
    face_value: 3000,
    description: 'MyCard 3000 點數位儲值序號，立省 NT$150 並回饋 NT$29 儲值金，專人核發安全可靠。',
    price: 2850,
    original_price: 3000,
    badge: '超值',
    delivery: 'manual',
    sort_order: 3000,
    status: 'active',
    image_url: '/images/products/mycard-3000.webp',
    stock: 22,
  },
  {
    id: 25,
    category_id: 1,
    name: 'MyCard 3290 點',
    face_value: 3290,
    description: 'MyCard 3290 點旗艦滿單面額，精準對應手遊最高階一單禮包，立省 NT$164 再享滿千回饋。',
    price: 3126,
    original_price: 3290,
    badge: '超值',
    delivery: 'manual',
    sort_order: 3290,
    status: 'active',
    image_url: '/images/products/mycard-3290.webp',
    stock: 19,
  },
];

export const TAIWAN_BANKS = [
  { code: '700', name: '中華郵政（郵局）' },
  { code: '004', name: '臺灣銀行' },
  { code: '005', name: '土地銀行' },
  { code: '006', name: '合作金庫' },
  { code: '007', name: '第一銀行' },
  { code: '008', name: '華南銀行' },
  { code: '009', name: '彰化銀行' },
  { code: '011', name: '上海商業儲蓄銀行' },
  { code: '012', name: '台北富邦銀行' },
  { code: '013', name: '國泰世華銀行' },
  { code: '017', name: '兆豐國際商業銀行' },
  { code: '050', name: '臺灣中小企業銀行' },
  { code: '053', name: '台中商業銀行' },
  { code: '103', name: '臺灣新光商業銀行' },
  { code: '108', name: '陽信商業銀行' },
  { code: '118', name: '板信商業銀行' },
  { code: '803', name: '聯邦銀行' },
  { code: '805', name: '遠東國際商業銀行' },
  { code: '806', name: '元大銀行' },
  { code: '807', name: '永豐銀行' },
  { code: '808', name: '玉山銀行' },
  { code: '809', name: '凱基銀行' },
  { code: '812', name: '台新銀行' },
  { code: '816', name: '安泰銀行' },
  { code: '822', name: '中國信託商業銀行' },
];

export const FAQ_ITEMS: [string, string][] = [
  [
    '付款後多久可以拿到序號？',
    '序號由專人核發把關，完成 ATM 或網銀轉帳後系統會自動比對入帳，核發後序號將直接顯示於「訂單狀態頁」與「會員中心」，並同步寄送至您填寫的 Email。',
  ],
  [
    '序號在哪裡可以查看？',
    '訂單完成頁會直接顯示數位序號與 PIN 碼，支援一鍵複製；您也可隨時登入「會員中心 → 我的訂單」永久調閱歷史序號。',
  ],
  [
    '支援哪些付款方式？',
    '全站採用 ATM 虛擬帳號轉帳（NT$0 手續費）。結帳時請先選擇您要轉出的銀行並填寫轉出帳號，系統會立即配發專屬繳款虛擬帳號供您透過網銀或 ATM 轉帳。',
  ],
  [
    '序號顯示後可以退費或換面額嗎？',
    '數位序號一經畫面顯示或寄送即視同已售出，依消費者保護法規定不適用七日鑑賞期，恕無法退換。下單前請務必確認所需點數面額。',
  ],
  [
    '如何使用 MyCard 序號進行儲值？',
    '請登入您欲儲值的遊戲官網、App 或 MyCard 會員中心，選擇「MyCard 點數卡儲值」，分別貼上本站核發之 16 碼序號（Serial）與密碼（PIN）即可入點。',
  ],
  [
    '註冊會員有什麼實際優惠？',
    '會員除了可永久保存並查詢所有購買過的點數序號外，單筆訂單結帳滿 NT$1,000 即自動回饋 1% 儲值金，於下次購買任何面額時可直接勾選折抵現金。',
  ],
];
