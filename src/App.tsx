import React, { useState, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useParams,
  useNavigate,
  useSearchParams,
  Outlet,
} from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  ArrowLeft,
  Share2,
  Plus,
  Minus,
  Trash2,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Wallet,
  Building2,
  FileText,
  KeyRound,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Send,
  X,
} from 'lucide-react';
import { StoreLayout, ProductCard } from './Layout';
import { useCartStore, useAppStore, formatNT } from './store';
import {
  TAIWAN_BANKS,
  FAQ_ITEMS,
  COMPANY_INFO,
  Product,
  SerialCode,
} from './data';

/* ============================================================================
   1. HOME PAGE (/) — Mobile E-Commerce Flow + Desktop Editorial Store
   ============================================================================ */
const QUICK_DENOMINATIONS = [
  { id: 9, label: '90點', price: 86, img: '/images/products/mycard-90.webp' },
  { id: 10, label: '150點', price: 143, img: '/images/products/mycard-150.webp' },
  { id: 12, label: '300點', price: 285, img: '/images/products/mycard-300.webp' },
  { id: 16, label: '500點', price: 475, img: '/images/products/mycard-500.webp' },
  { id: 18, label: '1000點', price: 950, img: '/images/products/mycard-1000.webp' },
  { id: 22, label: '2000點', price: 1900, img: '/images/products/mycard-2000.webp' },
  { id: 25, label: '3290點', price: 3126, img: '/images/products/mycard-3290.webp' },
];

function HomePage() {
  const navigate = useNavigate();
  const products = useAppStore((s) => s.products).filter((p) => p.status === 'active');
  const [activeTab, setActiveTab] = useState<'all' | 'hot' | 'small' | 'large'>('all');
  const [mobileQuery, setMobileQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeTab === 'hot') {
      list = list.filter((p) => p.badge === '熱銷' || p.badge === '超值');
    } else if (activeTab === 'small') {
      list = list.filter((p) => p.face_value <= 500);
    } else if (activeTab === 'large') {
      list = list.filter((p) => p.face_value >= 1000);
    }
    if (mobileQuery.trim()) {
      const q = mobileQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || String(p.face_value).includes(q)
      );
    }
    return list.slice(0, 8);
  }, [products, activeTab, mobileQuery]);

  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(mobileQuery.trim())}`);
    }
  };

  return (
    <div>
      {/* Mobile-First Search Bar (matches screen 1) */}
      <div className="md:hidden max-w-[1240px] mx-auto px-4 pt-3">
        <form
          onSubmit={handleMobileSearchSubmit}
          className="flex items-center gap-2 bg-well rounded-full h-11 px-4"
        >
          <Search size={17} className="text-muted shrink-0" />
          <input
            type="search"
            value={mobileQuery}
            onChange={(e) => setMobileQuery(e.target.value)}
            placeholder="搜尋 MyCard 面額 (如 150, 500, 1000)..."
            className="bg-transparent text-sm w-full outline-none"
          />
          <Link
            to="/products"
            aria-label="進階篩選"
            className="w-8 h-8 rounded-full bg-white grid place-items-center text-ink shrink-0"
          >
            <SlidersHorizontal size={15} />
          </Link>
        </form>
      </div>

      {/* Horizontal Filter Pills (Screen 1 Tabs) */}
      <div className="max-w-[1240px] mx-auto px-4 md:px-6 pt-3 md:pt-7">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: '全部面額' },
              { id: 'hot', label: '熱銷推薦' },
              { id: 'small', label: '手遊小額 (≤500)' },
              { id: 'large', label: '滿千回饋 (≥1000)' },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`h-9 px-4 rounded-full text-[13px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-ink text-white'
                      : 'bg-well text-ink hover:bg-well-strong'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <Link
            to="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm font-bold text-ink hover:underline shrink-0"
          >
            <span>查看全系列 17 種面額</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      {/* Rounded Midnight Navy Editorial Promo Banner */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-6 pt-4 md:pt-5">
        <div className="rounded-[24px] bg-ink text-white grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] items-center overflow-hidden">
          <div className="p-6 sm:p-8 md:p-11">
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-black tracking-tight leading-[1.12]">
              MyCard 全系列 95 折，
              <br />
              滿千再贈 1% 儲值金。
            </h1>
            <p className="text-white/75 text-sm md:text-[15px] mt-4 max-w-[520px] leading-relaxed">
              {COMPANY_INFO.brandShort}提供 90 點至 3,290 點共 17 種官方正版面額。支援台灣各大銀行
              ATM 虛擬帳號匯款，完成轉帳後由專人即時核發卡號與密碼至您的會員帳戶。
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="h-12 px-7 rounded-full bg-white text-ink font-extrabold text-sm inline-flex items-center gap-2 hover:bg-well transition-colors"
              >
                <span>立即選購點數</span>
                <ChevronRight size={16} />
              </Link>
              <Link
                to="/member"
                className="h-12 px-6 rounded-full border border-white/25 text-white font-bold text-sm inline-flex items-center hover:bg-white/10 transition-colors"
              >
                查詢訂單序號
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-[460px]">
              <div>
                <div className="en text-xl md:text-2xl font-extrabold text-white">95%</div>
                <div className="text-xs text-white/65 mt-0.5">全站牌價直降</div>
              </div>
              <div>
                <div className="en text-xl md:text-2xl font-extrabold text-white">17 種</div>
                <div className="text-xs text-white/65 mt-0.5">90–3290 點齊全</div>
              </div>
              <div>
                <div className="en text-xl md:text-2xl font-extrabold text-white">+1%</div>
                <div className="text-xs text-white/65 mt-0.5">單筆滿千回饋</div>
              </div>
            </div>
          </div>

          {/* Right: Seamless Studio Gift Card Photography */}
          <div className="relative h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[410px] flex items-center justify-center overflow-hidden">
            <img
              src="/images/hero-studio-cards.jpg"
              alt="XX科技 MyCard 精品數位點數卡"
              className="w-full h-full object-cover object-center select-none"
            />
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink to-transparent pointer-events-none"
            />
            <Link
              to="/products/18"
              className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 h-10 px-4 rounded-full bg-white/95 backdrop-blur-md text-ink text-xs font-extrabold inline-flex items-center gap-2 shadow-lg hover:bg-white transition-colors"
            >
              <span>人氣熱銷：1000 點</span>
              <span className="en text-sale font-black">NT$950</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Circular Quick-Denomination Avatars Row */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-6 pt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-extrabold tracking-tight">
            快速選擇常用點數
          </h2>
          <Link to="/products" className="text-xs font-bold text-muted hover:text-ink">
            全部面額 (17)
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2">
          {QUICK_DENOMINATIONS.map((d) => (
            <Link
              key={d.id}
              to={`/products/${d.id}`}
              className="group flex flex-col items-center shrink-0 w-[76px] md:w-[92px]"
            >
              <div className="w-[72px] h-[72px] md:w-[84px] md:h-[84px] rounded-full bg-well group-hover:bg-well-strong p-3 flex items-center justify-center transition-colors">
                <img
                  src={d.img}
                  alt={`MyCard ${d.label}`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[13px] font-bold text-ink mt-2">{d.label}</span>
              <span className="en text-[11px] font-bold text-muted">
                ${d.price}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Borderless Product Grid */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-6 pt-10">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">
              熱門點數面額
            </h2>
            <p className="text-xs md:text-sm text-muted mt-1">
              點擊商品可切換全系列 17 種點數規格，支援直接加入購物車合併結帳
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs md:text-sm font-bold text-ink hover:underline shrink-0"
          >
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/products"
            className="h-12 px-8 rounded-full border border-ink text-ink font-bold text-sm inline-flex items-center gap-2 hover:bg-ink hover:text-white transition-colors"
          >
            <span>瀏覽全部 17 種 MyCard 面額</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </section>

      {/* Bento Specification Matrix (Inspired by preview_5.jpg) */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-6 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-[22px] bg-ink text-white p-7 flex flex-col justify-between min-h-[210px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15">
                常駐折扣
              </span>
              <span className="en text-xs text-zinc-400">PRICE RULE 01</span>
            </div>
            <div className="mt-6">
              <div className="en text-4xl font-black tracking-tight">95 折直降</div>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                全系列 90 點至 3,290 點皆享牌價 95 折優惠，結帳免收任何金流手續費。
              </p>
            </div>
          </div>

          <div className="rounded-[22px] bg-well text-ink p-7 flex flex-col justify-between min-h-[210px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white">
                會員禮遇
              </span>
              <span className="en text-xs text-muted">REBATE RULE 02</span>
            </div>
            <div className="mt-6">
              <div className="en text-4xl font-black tracking-tight">1% 儲值金</div>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                單筆實付滿 NT$1,000 自動回饋 1% 儲值金（1 點折抵 NT$1），下次結帳可直接全額折抵。
              </p>
            </div>
          </div>

          <div className="rounded-[22px] bg-ink text-white p-7 flex flex-col justify-between min-h-[210px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/15">
                安全核銷
              </span>
              <span className="en text-xs text-zinc-400">V-ATM RULE 03</span>
            </div>
            <div className="mt-6">
              <div className="en text-4xl font-black tracking-tight">專屬虛擬帳</div>
              <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                每筆訂單獨立配發 16 碼 ATM 虛擬帳號，綁定匯款銀行代碼核對，杜絕盜刷與第三方詐騙。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compact 3-Step Fulfillment Ledger (#steps) — Tabular Border Grid */}
      <section id="steps" className="max-w-[1240px] mx-auto px-4 md:px-6 pt-14">
        <div className="rounded-[22px] border border-line bg-white overflow-hidden">
          <div className="px-6 py-5 border-b border-line flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg md:text-xl font-black tracking-tight">
              三步驟購買與領取卡號流程
            </h2>
            <span className="text-xs text-muted">
              轉帳完成後由專人核發卡號與密碼，永久保存於會員中心
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="en text-xs font-extrabold px-2.5 py-1 rounded-full bg-well text-ink">
                  STEP 01
                </span>
                <span className="text-xs font-bold text-muted">選購點數</span>
              </div>
              <h3 className="font-extrabold text-base mt-4">挑選定額加入購物車</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                任選 90 點至 3,290 點 MyCard 面額，可多張合併結帳。登入會員可一併勾選折抵帳上儲值金。
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="en text-xs font-extrabold px-2.5 py-1 rounded-full bg-well text-ink">
                  STEP 02
                </span>
                <span className="text-xs font-bold text-muted">ATM 虛擬帳號匯款</span>
              </div>
              <h3 className="font-extrabold text-base mt-4">選擇匯款銀行並轉帳</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                填寫您預計轉帳的台灣銀行代碼與帳號，系統立即產生專屬 16 碼虛擬帳號，於 24 小時內完成轉帳即可。
              </p>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between">
                <span className="en text-xs font-extrabold px-2.5 py-1 rounded-full bg-ink text-white">
                  STEP 03
                </span>
                <span className="text-xs font-bold text-ok">線上領取序號</span>
              </div>
              <h3 className="font-extrabold text-base mt-4">會員中心一鍵複製儲值</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">
                入帳確認後，專人即刻配發 MyCard 卡號與密碼。前往「我的序號」即可一鍵複製並前往遊戲儲值。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Home FAQ Preview */}
      <section className="max-w-[1240px] mx-auto px-4 md:px-6 pt-14 pb-6">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="text-xl md:text-2xl font-black tracking-tight">常見問題</h2>
          <Link to="/faq" className="text-xs md:text-sm font-bold text-ink hover:underline">
            查看完整問答 ({FAQ_ITEMS.length}) →
          </Link>
        </div>

        <div className="rounded-[20px] border border-line divide-y divide-line bg-white overflow-hidden">
          {FAQ_ITEMS.slice(0, 4).map(([q, a], idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-well/60 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm md:text-[15px] text-ink">
                    {q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-ink' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs md:text-sm text-muted leading-relaxed">
                    {a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   2. PRODUCTS CATALOG PAGE (/products)
   ============================================================================ */
function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useAppStore((s) => s.products).filter((p) => p.status === 'active');
  const initialFilter = searchParams.get('filter') || 'all';
  const initialQuery = searchParams.get('q') || '';

  const [filter, setFilter] = useState<string>(initialFilter);
  const [query, setQuery] = useState<string>(initialQuery);
  const [sort, setSort] = useState<'asc' | 'desc' | 'hot'>('asc');

  const filtered = useMemo(() => {
    let list = [...products];
    if (filter === 'hot') {
      list = list.filter((p) => p.badge === '熱銷' || p.badge === '超值');
    } else if (filter === 'small') {
      list = list.filter((p) => p.face_value < 500);
    } else if (filter === 'medium') {
      list = list.filter((p) => p.face_value >= 500 && p.face_value < 1000);
    } else if (filter === 'large') {
      list = list.filter((p) => p.face_value >= 1000);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          String(p.face_value).includes(q) ||
          String(p.price).includes(q)
      );
    }

    if (sort === 'asc') {
      list.sort((a, b) => a.face_value - b.face_value);
    } else if (sort === 'desc') {
      list.sort((a, b) => b.face_value - a.face_value);
    } else if (sort === 'hot') {
      list.sort((a, b) => (a.badge === '熱銷' ? -1 : 1));
    }
    return list;
  }, [products, filter, query, sort]);

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 pt-5 md:pt-8">
      {/* Header & Rebate Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-line">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight">
            全部 MyCard 點數面額
          </h1>
          <p className="text-xs md:text-sm text-muted mt-1">
            共 {products.length} 種官方正版面額・全系列 95 折・單筆滿 NT$1,000 再贈 1% 儲值金
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-well rounded-full h-10 px-3.5 flex-1 md:w-[230px]">
            <Search size={15} className="text-muted shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (e.target.value) {
                  setSearchParams({ q: e.target.value });
                } else {
                  setSearchParams({});
                }
              }}
              placeholder="搜尋點數 (如 300, 1490)"
              className="bg-transparent text-xs md:text-sm px-2 w-full outline-none"
            />
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            aria-label="排序方式"
            className="h-10 px-3.5 rounded-full bg-well text-xs md:text-sm font-bold text-ink outline-none cursor-pointer"
          >
            <option value="asc">面額：由小至大</option>
            <option value="desc">面額：由大至小</option>
            <option value="hot">熱銷優先</option>
          </select>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
        {[
          { id: 'all', label: `全部 (${products.length})` },
          { id: 'hot', label: '熱銷主打' },
          { id: 'small', label: '小額點數 (<500點)' },
          { id: 'medium', label: '中額點數 (500–750點)' },
          { id: 'large', label: '大額滿千 (≥1000點・享1%回饋)' },
        ].map((tab) => {
          const active = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`h-9 px-4 rounded-full text-xs md:text-[13px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                active ? 'bg-ink text-white' : 'bg-well text-ink hover:bg-well-strong'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <div className="my-12 p-12 rounded-[22px] bg-well text-center">
          <div className="font-extrabold text-base">找不到符合「{query}」的點數面額</div>
          <p className="text-xs text-muted mt-1">請嘗試搜尋 90、150、300、500、1000 或切換篩選條件</p>
          <button
            type="button"
            onClick={() => {
              setFilter('all');
              setQuery('');
              setSearchParams({});
            }}
            className="mt-4 h-10 px-5 rounded-full bg-ink text-white text-xs font-bold cursor-pointer"
          >
            重設所有篩選
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-2">
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   3. PRODUCT DETAIL PAGE (/products/:id) — Screen 2 Sheet + Size Selector
   ============================================================================ */
function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useAppStore((s) => s.products).filter((p) => p.status === 'active');
  const add = useCartStore((s) => s.add);

  const product = products.find((p) => p.id === Number(id)) || products[0];
  const [qty, setQty] = useState<number>(1);
  const [specTab, setSpecTab] = useState<'guide' | 'spec' | 'notice'>('guide');
  const [addedToast, setAddedToast] = useState(false);

  if (!product) return null;

  const savingPerUnit = product.original_price - product.price;
  const totalPrice = product.price * qty;
  const totalSaving = savingPerUnit * qty;
  const rebatePreview = totalPrice >= 1000 ? Math.floor(totalPrice * 0.01) : 0;

  const handleAddToCart = () => {
    add(product, qty);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 1600);
  };

  const handleBuyNow = () => {
    add(product, qty);
    navigate('/cart');
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 md:px-6 pt-4 md:pt-8">
      {/* Top Bar: Back + Share (Matches Screen 2 Header) */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="h-10 px-3.5 rounded-full bg-well hover:bg-well-strong inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>返回商品列表</span>
        </button>

        <div className="text-xs font-bold text-muted hidden sm:block">
          首頁 / 全部 MyCard 面額 / <span className="text-ink">{product.name}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(window.location.href);
            }
          }}
          aria-label="複製商品連結"
          className="w-10 h-10 rounded-full bg-well hover:bg-well-strong grid place-items-center cursor-pointer"
        >
          <Share2 size={16} />
        </button>
      </div>

      {/* Main 2-Column Layout (Mobile Top Well + Bottom Sheet Card) */}
      <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-6 md:gap-10 items-start">
        {/* Left: Soft Gray Artwork Stage */}
        <div className="rounded-[26px] bg-well p-8 md:p-12 flex flex-col items-center justify-center relative">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-ink text-white text-xs font-bold">
              {product.badge}・95 折
            </span>
            <span className="en text-xs font-bold px-2.5 py-1 rounded-full bg-ok-bg text-ok">
              庫存充足 ({product.stock}+)
            </span>
          </div>

          <img
            src={product.image_url}
            alt={product.name}
            className="w-[220px] h-[220px] md:w-[290px] md:h-[290px] object-contain my-2"
          />

          <div className="w-full mt-6 pt-4 border-t border-black/8 flex items-center justify-between text-xs text-muted">
            <span>發卡方式：專人線上核發序號</span>
            <span className="en font-semibold text-ink">MYCARD {product.face_value} PTS</span>
          </div>
        </div>

        {/* Right: Product Info & Denomination Selector Matrix */}
        <div className="bg-white rounded-[26px] md:border md:border-line md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs md:text-sm text-muted mt-1">
                {product.description}
              </p>
            </div>
            <span className="en px-3 py-1 rounded-full bg-sale-bg text-sale text-xs font-extrabold shrink-0">
              每張省 NT${savingPerUnit}
            </span>
          </div>

          {/* Price Row */}
          <div className="mt-5 p-4 rounded-2xl bg-well flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="en text-[28px] sm:text-3xl md:text-4xl font-black text-ink tracking-tight">
                {formatNT(product.price)}
              </span>
              <span className="en text-xs text-muted line-through whitespace-nowrap">
                原價 {formatNT(product.original_price)}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-ok whitespace-nowrap">
              免手續費・永久保存序號
            </span>
          </div>

          {/* Square Size/Denomination Selector ("切換點數面額") */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-extrabold text-ink">
                選擇點數面額 (共 {products.length} 種規格)
              </span>
              <span className="en text-xs text-muted">
                目前選擇：{product.face_value} 點
              </span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {products.map((item) => {
                const selected = item.id === product.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(`/products/${item.id}`)}
                    className={`h-11 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all cursor-pointer ${
                      selected
                        ? 'bg-ink text-white shadow-sm'
                        : 'bg-well text-ink hover:bg-well-strong'
                    }`}
                  >
                    <span className="en font-extrabold">{item.face_value}</span>
                    <span
                      className={`en text-[10px] ${
                        selected ? 'text-zinc-300' : 'text-muted'
                      }`}
                    >
                      ${item.price}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper + Rebate Calculation */}
          <div className="mt-6 pt-5 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-extrabold text-ink">購買張數</div>
              <div className="text-xs text-muted mt-0.5">
                小計 <strong className="en text-ink">{formatNT(totalPrice)}</strong>（共省下{' '}
                <strong className="en text-sale">{formatNT(totalSaving)}</strong>）
              </div>
            </div>

            <div className="inline-flex items-center bg-well rounded-full p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="減少數量"
                className="w-9 h-9 rounded-full bg-white text-ink grid place-items-center hover:bg-well-strong cursor-pointer"
              >
                <Minus size={15} />
              </button>
              <span className="en w-11 text-center font-extrabold text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                aria-label="增加數量"
                className="w-9 h-9 rounded-full bg-white text-ink grid place-items-center hover:bg-well-strong cursor-pointer"
              >
                <Plus size={15} />
              </button>
            </div>
          </div>

          {rebatePreview > 0 ? (
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-ok-bg text-ok text-xs font-bold flex items-center justify-between">
              <span>本筆已滿 NT$1,000，完成訂單可額外獲得 1% 儲值金</span>
              <span className="en font-extrabold">+NT${rebatePreview}</span>
            </div>
          ) : (
            <div className="mt-4 px-4 py-2.5 rounded-xl bg-well text-muted text-xs flex items-center justify-between">
              <span>單筆實付滿 NT$1,000 即享 1% 儲值金回饋</span>
              <span className="en font-bold text-ink">
                差 {formatNT(Math.max(0, 1000 - totalPrice))}
              </span>
            </div>
          )}

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 h-12 rounded-full border border-ink text-ink font-extrabold text-sm inline-flex items-center justify-center gap-2 hover:bg-well transition-colors cursor-pointer"
            >
              {addedToast ? (
                <>
                  <Check size={16} />
                  <span>已加入購物車</span>
                </>
              ) : (
                <>
                  <Plus size={16} />
                  <span>加入購物車 ({qty})</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex-1 h-12 rounded-full bg-ink text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 hover:bg-ink-soft transition-colors cursor-pointer"
            >
              <span>立即前往結帳</span>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Specification & Guide Tabs */}
          <div className="mt-8 pt-6 border-t border-line">
            <div className="flex gap-2 mb-4">
              {[
                { id: 'guide', label: '儲值教學' },
                { id: 'spec', label: '商品規格' },
                { id: 'notice', label: '發卡與退換須知' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSpecTab(t.id as typeof specTab)}
                  className={`h-8 px-3.5 rounded-full text-xs font-bold cursor-pointer ${
                    specTab === t.id
                      ? 'bg-ink text-white'
                      : 'bg-well text-muted hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {specTab === 'guide' && (
              <ol className="text-xs text-muted space-y-2 leading-relaxed list-decimal pl-4">
                <li>
                  完成 ATM 虛擬帳號轉帳並由專人核發後，請至「會員中心 → 歷史訂單」複製{' '}
                  <strong className="text-ink">MyCard 卡號 (16碼)</strong> 與{' '}
                  <strong className="text-ink">密碼 (8碼)</strong>。
                </li>
                <li>
                  前往您欲儲值的線上遊戲官網或 MyCard 官方會員中心，選擇「點數卡儲值」。
                </li>
                <li>貼上卡號與密碼送出，點數將立即入帳至您的遊戲或會員帳號中。</li>
              </ol>
            )}

            {specTab === 'spec' && (
              <div className="text-xs divide-y divide-line border border-line rounded-xl overflow-hidden">
                <div className="grid grid-cols-3 p-3 bg-well/50">
                  <span className="text-muted">商品名稱</span>
                  <span className="col-span-2 font-bold text-ink">{product.name}</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="text-muted">官方牌價 / 售價</span>
                  <span className="col-span-2 en font-bold text-ink">
                    {formatNT(product.original_price)} / 95 折優惠價 {formatNT(product.price)}
                  </span>
                </div>
                <div className="grid grid-cols-3 p-3 bg-well/50">
                  <span className="text-muted">適用地區</span>
                  <span className="col-span-2 text-ink">台灣區 MyCard 合作之全系列遊戲與數位內容</span>
                </div>
                <div className="grid grid-cols-3 p-3">
                  <span className="text-muted">交付形式</span>
                  <span className="col-span-2 text-ink">專人線上核發數位卡號與密碼（無實體卡寄送）</span>
                </div>
              </div>
            )}

            {specTab === 'notice' && (
              <p className="text-xs text-muted leading-relaxed">
                依《消費者保護法》第 19 條合理例外情事規定，非以有形媒介提供之數位內容或線上服務（如點數卡序號、密碼），一經核發至會員帳戶即視為已提供服務，恕不適用 7 日無條件退貨規定。轉帳前請務必確認購買面額。
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Exact Screen 2 Pattern) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-line px-4 py-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-muted">應付總計 ({qty} 張)</div>
          <div className="flex items-baseline gap-1.5">
            <span className="en text-xl font-black text-ink">{formatNT(totalPrice)}</span>
            <span className="en text-xs text-sale font-bold">省${totalSaving}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={handleAddToCart}
            className="h-11 px-4 rounded-full border border-ink text-ink font-extrabold text-xs cursor-pointer"
          >
            {addedToast ? '已加入' : '加入購物車'}
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            className="h-11 px-5 rounded-full bg-ink text-white font-extrabold text-xs inline-flex items-center gap-1 cursor-pointer"
          >
            <span>立即結帳</span>
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   4. CART PAGE (/cart) — Screen 3 Borderless Cart + Summary Sheet
   ============================================================================ */
function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const subtotal = useCartStore((s) => s.subtotal());
  const totalSavings = useCartStore((s) => s.totalSavings());
  const earnedRebate = subtotal >= 1000 ? Math.floor(subtotal * 0.01) : 0;

  if (items.length === 0) {
    return (
      <div className="max-w-[760px] mx-auto px-4 md:px-6 pt-12 text-center">
        <div className="rounded-[24px] bg-well p-12">
          <h1 className="text-xl md:text-2xl font-black">您的購物車目前是空的</h1>
          <p className="text-xs md:text-sm text-muted mt-2">
            全系列 MyCard 90 點至 3,290 點皆享 95 折優惠，單筆滿千再贈 1% 儲值金。
          </p>
          <Link
            to="/products"
            className="mt-6 h-12 px-7 rounded-full bg-ink text-white font-bold text-sm inline-flex items-center gap-2"
          >
            <span>前往選購點數</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1140px] mx-auto px-4 md:px-6 pt-5 md:pt-8">
      <div className="flex items-center justify-between pb-5 border-b border-line">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="w-9 h-9 rounded-full bg-well grid place-items-center cursor-pointer"
            aria-label="繼續購物"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">購物車</h1>
            <p className="text-xs text-muted">
              共 {items.reduce((s, i) => s + i.qty, 0)} 張點數卡・全站免收手續費
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={clear}
          className="text-xs font-bold text-muted hover:text-sale inline-flex items-center gap-1 cursor-pointer"
        >
          <Trash2 size={14} />
          <span>清空購物車</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-8 pt-6 items-start">
        {/* Left: Cart Item List */}
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-[20px] bg-well flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <Link
                  to={`/products/${item.id}`}
                  className="w-18 h-18 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0"
                >
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </Link>
                <div>
                  <Link
                    to={`/products/${item.id}`}
                    className="font-extrabold text-[15px] text-ink hover:underline"
                  >
                    {item.name}
                  </Link>
                  <div className="text-xs text-muted mt-0.5">
                    數位序號・單張省 NT${item.original_price - item.price}
                  </div>
                  <div className="flex items-baseline gap-2 mt-1.5">
                    <span className="en font-extrabold text-base text-ink">
                      {formatNT(item.price)}
                    </span>
                    <span className="en text-xs text-muted line-through">
                      {formatNT(item.original_price)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Gray Pill Stepper */}
              <div className="flex flex-col items-end gap-2">
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  aria-label={`移除 ${item.name}`}
                  className="text-muted hover:text-sale p-1 cursor-pointer"
                >
                  <Trash2 size={15} />
                </button>

                <div className="inline-flex items-center bg-white rounded-full p-1 border border-line">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    aria-label="減少"
                    className="w-7 h-7 rounded-full hover:bg-well grid place-items-center cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="en w-8 text-center font-extrabold text-xs">
                    {item.qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    aria-label="增加"
                    className="w-7 h-7 rounded-full hover:bg-well grid place-items-center cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary Card */}
        <div className="rounded-[24px] border border-line bg-white p-6 space-y-4">
          <h2 className="font-extrabold text-base">訂單金額明細</h2>

          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between text-muted">
              <span>官方牌價總計</span>
              <span className="en">{formatNT(subtotal + totalSavings)}</span>
            </div>
            <div className="flex justify-between text-sale font-bold">
              <span>95 折優惠折抵</span>
              <span className="en">-{formatNT(totalSavings)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>ATM 虛擬帳號手續費</span>
              <span className="en text-ink font-semibold">NT$0</span>
            </div>
            {earnedRebate > 0 && (
              <div className="flex justify-between text-ok font-bold">
                <span>滿千享 1% 儲值金回饋</span>
                <span className="en">+NT${earnedRebate}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-line flex items-baseline justify-between">
            <span className="font-bold text-sm">應付總額</span>
            <span className="en text-2xl font-black text-ink">{formatNT(subtotal)}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('/checkout')}
            className="w-full h-12 rounded-full bg-ink text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 hover:bg-ink-soft transition-colors cursor-pointer"
          >
            <span>前往填寫結帳資料</span>
            <ChevronRight size={16} />
          </button>

          <Link
            to="/products"
            className="block text-center text-xs font-bold text-muted hover:text-ink pt-1"
          >
            ← 繼續加購其他點數面額
          </Link>
        </div>
      </div>

      {/* Mobile Sticky Bottom Checkout Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-line px-4 py-3 flex items-center justify-between gap-4">
        <div>
          <div className="text-[11px] text-muted">
            小計 (已省 <span className="en text-sale font-bold">{formatNT(totalSavings)}</span>)
          </div>
          <div className="en text-xl font-black text-ink">{formatNT(subtotal)}</div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/checkout')}
          className="h-11 px-6 rounded-full bg-ink text-white font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>前往結帳</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
   5. CHECKOUT PAGE (/checkout) — ATM Virtual Account + Bank Selector + Credit
   ============================================================================ */
function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clear);

  const user = useAppStore((s) => s.user);
  const createOrder = useAppStore((s) => s.createOrder);

  const [name, setName] = useState(user?.username || '林冠宇');
  const [phone, setPhone] = useState('0918-624-901');
  const [email, setEmail] = useState(user?.email || 'member@xxtechpoint.com');
  const [invoiceType, setInvoiceType] = useState<'personal' | 'company'>('personal');
  const [taxId, setTaxId] = useState('');

  const [bankSelect, setBankSelect] = useState('822');
  const [customBankCode, setCustomBankCode] = useState('');
  const [bankAccount, setBankAccount] = useState('68412095812');
  const [useCredit, setUseCredit] = useState(true);
  const [agreed, setAgreed] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0) {
    return (
      <div className="max-w-[680px] mx-auto px-4 pt-12 text-center">
        <div className="rounded-[24px] bg-well p-10">
          <h1 className="text-xl font-black">購物車無待結帳商品</h1>
          <Link
            to="/products"
            className="mt-4 h-11 px-6 rounded-full bg-ink text-white text-xs font-bold inline-flex items-center"
          >
            返回商品目錄
          </Link>
        </div>
      </div>
    );
  }

  const availableCredit = user && useCredit ? user.store_credit : 0;
  const creditDiscount = Math.min(availableCredit, subtotal);
  const finalTotal = Math.max(0, subtotal - creditDiscount);
  const earnedRebate = finalTotal >= 1000 ? Math.floor(finalTotal * 0.01) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const resolvedBankCode = bankSelect === 'other' ? customBankCode.trim() : bankSelect;
    if (!/^\d{3}$/.test(resolvedBankCode)) {
      setErrorMsg('請選擇或輸入正確的 3 碼台灣銀行代碼');
      return;
    }
    const cleanAcct = bankAccount.replace(/\D/g, '');
    if (cleanAcct.length < 6 || cleanAcct.length > 16) {
      setErrorMsg('請輸入 6 至 16 碼純數字之轉出銀行帳號，供系統核對匯款');
      return;
    }
    if (!agreed) {
      setErrorMsg('請先勾選同意數位點數卡購買與發卡條款');
      return;
    }

    const created = createOrder({
      name,
      phone,
      email,
      taxId: invoiceType === 'company' ? taxId : '',
      payerBankCode: resolvedBankCode,
      bankAccount: cleanAcct,
      useCredit,
      cartItems: items,
    });

    clearCart();
    navigate(`/order/${created.order_no}`);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 md:px-6 pt-5 md:pt-8">
      {/* 3-Step Checkout Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-line">
        <div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            結帳與 ATM 虛擬帳號配號
          </h1>
          <p className="text-xs text-muted mt-1">
            送出訂單後將立即產生該筆訂單專屬之 16 碼 ATM 虛擬帳號
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold">
          <span className="px-3 py-1 rounded-full bg-well text-muted">1. 購物車</span>
          <span className="text-muted">→</span>
          <span className="px-3 py-1 rounded-full bg-ink text-white">2. 填寫匯款資料</span>
          <span className="text-muted">→</span>
          <span className="px-3 py-1 rounded-full bg-well text-muted">3. 取得虛擬帳號</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.85fr] gap-8 pt-6 items-start"
      >
        <div className="space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-sale-bg text-sale text-xs font-bold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Buyer Info */}
          <div className="rounded-[22px] border border-line bg-white p-6 space-y-4">
            <h2 className="font-extrabold text-base">1. 購買人基本資料</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  購買人姓名 *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none focus:ring-2 focus:ring-ink"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  聯絡手機 *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none focus:ring-2 focus:ring-ink"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                電子信箱 (接收訂單與發卡通知) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none focus:ring-2 focus:ring-ink"
              />
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-ink mb-2">電子發票類型</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInvoiceType('personal')}
                  className={`h-9 px-4 rounded-full text-xs font-bold cursor-pointer ${
                    invoiceType === 'personal' ? 'bg-ink text-white' : 'bg-well text-ink'
                  }`}
                >
                  個人雲端發票
                </button>
                <button
                  type="button"
                  onClick={() => setInvoiceType('company')}
                  className={`h-9 px-4 rounded-full text-xs font-bold cursor-pointer ${
                    invoiceType === 'company' ? 'bg-ink text-white' : 'bg-well text-ink'
                  }`}
                >
                  公司統一編號
                </button>
              </div>
              {invoiceType === 'company' && (
                <input
                  type="text"
                  maxLength={8}
                  value={taxId}
                  onChange={(e) => setTaxId(e.target.value)}
                  placeholder="請輸入 8 碼公司統一編號"
                  className="mt-3 w-full sm:w-64 h-11 px-4 rounded-xl bg-well text-sm mono outline-none"
                />
              )}
            </div>
          </div>

          {/* Section 2: ATM Virtual Account Bank Verification */}
          <div className="rounded-[22px] border border-line bg-white p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base">
                2. ATM 虛擬帳號匯款設定
              </h2>
              <span className="px-2.5 py-1 rounded-full bg-ink text-white text-[11px] font-bold">
                唯一指定安全金流
              </span>
            </div>

            <p className="text-xs text-muted leading-relaxed">
              為防範第三方詐騙，請選擇您本人預計轉出之台灣銀行代碼並輸入轉出帳號。系統將自動比對入帳帳號並生成專屬虛擬帳號。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  預計轉出之銀行代碼 *
                </label>
                <select
                  value={bankSelect}
                  onChange={(e) => setBankSelect(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-well text-sm font-semibold outline-none cursor-pointer"
                >
                  {TAIWAN_BANKS.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.code} {b.name}
                    </option>
                  ))}
                  <option value="other">其他銀行／信用合作社 (手動輸入3碼)</option>
                </select>
              </div>

              {bankSelect === 'other' && (
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    手動輸入 3 碼銀行代碼 *
                  </label>
                  <input
                    type="text"
                    maxLength={3}
                    value={customBankCode}
                    onChange={(e) => setCustomBankCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="例如：103"
                    className="w-full h-11 px-4 rounded-xl bg-well text-sm mono outline-none"
                  />
                </div>
              )}

              <div className={bankSelect === 'other' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  轉出銀行帳號 (6–16 碼純數字) *
                </label>
                <input
                  type="text"
                  required
                  maxLength={16}
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                  placeholder="請輸入轉出帳號 (僅供對帳核銷使用)"
                  className="w-full h-11 px-4 rounded-xl bg-well text-sm mono outline-none focus:ring-2 focus:ring-ink"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Store Credit Redemption */}
          <div className="rounded-[22px] border border-line bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ink text-white grid place-items-center">
                  <Wallet size={18} />
                </div>
                <div>
                  <div className="font-extrabold text-sm">使用會員儲值金折抵</div>
                  <div className="text-xs text-muted">
                    目前可用餘額：
                    <strong className="en text-ink">
                      {user ? formatNT(user.store_credit) : 'NT$0 (請先登入)'}
                    </strong>
                  </div>
                </div>
              </div>

              {user && user.store_credit > 0 && (
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold">
                  <input
                    type="checkbox"
                    checked={useCredit}
                    onChange={(e) => setUseCredit(e.target.checked)}
                    className="w-4 h-4 accent-ink"
                  />
                  <span>折抵 -{formatNT(creditDiscount)}</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Right: Checkout Order Summary */}
        <div className="rounded-[24px] border border-line bg-white p-6 space-y-4">
          <h2 className="font-extrabold text-base">結帳商品清單</h2>

          <div className="divide-y divide-line max-h-[260px] overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-10 h-10 object-contain rounded-lg bg-well p-1"
                  />
                  <div>
                    <div className="font-bold text-ink">{item.name}</div>
                    <div className="text-muted">數量 x {item.qty}</div>
                  </div>
                </div>
                <span className="en font-extrabold text-sm text-ink">
                  {formatNT(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-line space-y-2 text-xs">
            <div className="flex justify-between text-muted">
              <span>商品小計</span>
              <span className="en">{formatNT(subtotal)}</span>
            </div>
            {creditDiscount > 0 && (
              <div className="flex justify-between text-sale font-bold">
                <span>儲值金折抵</span>
                <span className="en">-{formatNT(creditDiscount)}</span>
              </div>
            )}
            {earnedRebate > 0 && (
              <div className="flex justify-between text-ok font-bold">
                <span>完成訂單回饋儲值金 (1%)</span>
                <span className="en">+NT${earnedRebate}</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-line flex items-baseline justify-between">
            <span className="font-bold text-sm">應匯款總額</span>
            <span className="en text-2xl font-black text-ink">{formatNT(finalTotal)}</span>
          </div>

          <label className="flex items-start gap-2 text-xs text-muted cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 accent-ink"
            />
            <span>
              我已確認購買之 MyCard 面額無誤，並同意數位點數卡一經核發序號即無法退換貨之條款。
            </span>
          </label>

          <button
            type="submit"
            className="w-full h-12 rounded-full bg-ink text-white font-extrabold text-sm inline-flex items-center justify-center gap-2 hover:bg-ink-soft transition-colors cursor-pointer"
          >
            <span>確認送出並取得 ATM 虛擬帳號</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </form>
    </div>
  );
}

/* ============================================================================
   6. ORDER RESULT & SERIAL PASS PAGE (/order/:orderNo)
   ============================================================================ */
function OrderPage() {
  const { orderNo } = useParams();
  const orders = useAppStore((s) => s.orders);
  const simulateOrderPaid = useAppStore((s) => s.simulateOrderPaid);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const order = orders.find((o) => o.order_no === orderNo) || orders[0];
  if (!order) return null;

  const copyText = (key: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const isCompleted = order.status === 'completed';

  return (
    <div className="max-w-[880px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
              isCompleted ? 'bg-ok-bg text-ok' : 'bg-ink text-white'
            }`}
          >
            {isCompleted ? '已完成發卡・序號可立即領取' : '待 ATM 轉帳匯款'}
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight mt-2">
            訂單編號 <span className="mono">{order.order_no}</span>
          </h1>
          <p className="text-xs text-muted mt-1">建立時間：{order.created_at}</p>
        </div>

        <Link
          to="/member"
          className="h-10 px-4 rounded-full bg-well hover:bg-well-strong text-xs font-bold inline-flex items-center gap-1"
        >
          <span>前往我的訂單列表</span>
          <ChevronRight size={15} />
        </Link>
      </div>

      {/* V-ATM Virtual Account Card (When Pending) or Completed Serial Code Pass */}
      {!isCompleted && order.payment && (
        <div className="rounded-[24px] bg-ink text-white p-6 md:p-8 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/15">
            <div>
              <div className="text-xs text-zinc-400">專屬 ATM 虛擬匯款帳號</div>
              <div className="font-bold text-sm mt-0.5">
                {order.payment.vatm_bank_code} {order.payment.bank_name}
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-white/15">
              繳費期限：{order.payment.expire_at}
            </span>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/8 p-4 rounded-2xl border border-white/12">
            <div>
              <div className="text-[11px] text-zinc-400">16 碼專屬虛擬帳號</div>
              <div className="mono text-xl md:text-2xl font-extrabold tracking-wider mt-1">
                {order.payment.vatm_account}
              </div>
            </div>
            <button
              type="button"
              onClick={() => copyText('vatm', order.payment!.vatm_account)}
              className="h-10 px-4 rounded-full bg-white text-ink text-xs font-extrabold inline-flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
            >
              {copiedKey === 'vatm' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedKey === 'vatm' ? '已複製帳號' : '複製虛擬帳號'}</span>
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-zinc-400 block">應匯款金額</span>
              <strong className="en text-base text-white">
                {formatNT(order.payment.amount)}
              </strong>
            </div>
            <div>
              <span className="text-zinc-400 block">綁定轉出銀行代碼</span>
              <strong className="mono text-white">{order.payment.payer_bank_code}</strong>
            </div>
            <div>
              <span className="text-zinc-400 block">轉出帳號末五碼</span>
              <strong className="mono text-white">
                *{order.payment.payer_account_last5}
              </strong>
            </div>
          </div>

          {/* Interactive Demo Trigger so user can immediately test Serial Fulfillment */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-zinc-300">
              展示模式：點擊右側按鈕可立即模擬「ATM 入帳並核發 MyCard 序號」
            </span>
            <button
              type="button"
              onClick={() => simulateOrderPaid(order.order_no)}
              className="h-10 px-5 rounded-full bg-emerald-400 text-ink font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer hover:bg-emerald-300 transition-colors"
            >
              <KeyRound size={14} />
              <span>模擬已完成 ATM 轉帳（立即領取序號）</span>
            </button>
          </div>
        </div>
      )}

      {/* Issued Serial Code Cards (Tactile Pass) */}
      {isCompleted && (
        <div className="space-y-4 mb-8 pass-reveal">
          <h2 className="font-extrabold text-base">已核發之 MyCard 卡號與密碼</h2>
          {order.items.map((item) =>
            (item.codes || []).map((c, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="rounded-[22px] bg-ink text-white p-6 border border-white/10"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/15">
                  <span className="font-extrabold text-sm">{item.product_name}</span>
                  <span className="en text-xs px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-bold">
                    第 {idx + 1} 張・已核發
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="p-3.5 rounded-xl bg-white/8 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-400">卡號 (Serial Number)</div>
                      <div className="mono font-bold text-sm md:text-base mt-0.5">
                        {c.code}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(`code-${idx}`, c.code)}
                      className="h-8 px-3 rounded-full bg-white text-ink text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `code-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedKey === `code-${idx}` ? '已複製' : '複製'}</span>
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/8 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-zinc-400">密碼 (PIN Code)</div>
                      <div className="mono font-bold text-sm md:text-base mt-0.5">
                        {c.pin}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(`pin-${idx}`, c.pin)}
                      className="h-8 px-3 rounded-full bg-white text-ink text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                    >
                      {copiedKey === `pin-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedKey === `pin-${idx}` ? '已複製' : '複製'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Order Items Breakdown */}
      <div className="rounded-[22px] border border-line bg-white p-6">
        <h2 className="font-extrabold text-base mb-4">購買商品明細</h2>
        <div className="divide-y divide-line">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-sm">
              <div>
                <span className="font-bold text-ink">{item.product_name}</span>
                <span className="text-xs text-muted ml-2">x {item.quantity}</span>
              </div>
              <span className="en font-extrabold">
                {formatNT(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
        <div className="pt-4 mt-2 border-t border-line flex justify-between items-baseline">
          <span className="text-xs text-muted">實付總計</span>
          <span className="en text-xl font-black text-ink">{formatNT(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   7. LOGIN & REGISTER PAGES (/login, /register)
   ============================================================================ */
function LoginPage() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const loginQuickRole = useAppStore((s) => s.loginQuickRole);
  const [email, setEmail] = useState('member@xxtechpoint.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const u = login(email, password);
    navigate(u.role === 'admin' ? '/admin' : '/member');
  };

  return (
    <div className="max-w-[440px] mx-auto px-4 pt-10">
      <div className="rounded-[24px] border border-line bg-white p-7">
        <h1 className="text-2xl font-black tracking-tight">會員登入</h1>
        <p className="text-xs text-muted mt-1">
          登入後可查詢歷史 MyCard 序號與管理您的 1% 儲值金回饋
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs font-bold mb-1.5">電子信箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5">密碼</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-ink text-white font-extrabold text-sm cursor-pointer"
          >
            登入帳戶
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-line space-y-2">
          <div className="text-[11px] font-bold text-muted">快速體驗切換身分：</div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginQuickRole('member');
                navigate('/member');
              }}
              className="h-10 rounded-full bg-well hover:bg-well-strong text-xs font-bold cursor-pointer"
            >
              一鍵登入一般會員
            </button>
            <button
              type="button"
              onClick={() => {
                loginQuickRole('admin');
                navigate('/admin');
              }}
              className="h-10 rounded-full bg-well hover:bg-well-strong text-xs font-bold cursor-pointer"
            >
              一鍵進入管理員後台
            </button>
          </div>
        </div>

        <div className="mt-5 text-center text-xs text-muted">
          還沒有帳號嗎？{' '}
          <Link to="/register" className="text-ink font-bold underline">
            免費註冊會員
          </Link>
        </div>
      </div>
    </div>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  const register = useAppStore((s) => s.register);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(username, email, password);
    navigate('/member');
  };

  return (
    <div className="max-w-[440px] mx-auto px-4 pt-10">
      <div className="rounded-[24px] border border-line bg-white p-7">
        <h1 className="text-2xl font-black tracking-tight">註冊 {COMPANY_INFO.brandShort} 會員</h1>
        <p className="text-xs text-muted mt-1">
          免費加入會員，單筆滿千享 1% 儲值金回饋，歷史購買卡號永久保存
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div>
            <label className="block text-xs font-bold mb-1.5">會員姓名 / 暱稱 *</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="請輸入您的稱呼"
              className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5">電子信箱 *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold mb-1.5">設定密碼 (至少 6 碼) *</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-well text-sm outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-full bg-ink text-white font-extrabold text-sm cursor-pointer"
          >
            建立帳號並領取 NT$30 新戶儲值金
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-muted">
          已經有帳號？{' '}
          <Link to="/login" className="text-ink font-bold underline">
            前往登入
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. MEMBER CENTER & SERIAL WALLET (/member)
   ============================================================================ */
function MemberPage() {
  const navigate = useNavigate();
  const user = useAppStore((s) => s.user);
  const orders = useAppStore((s) => s.orders);
  const simulateOrderPaid = useAppStore((s) => s.simulateOrderPaid);
  const [copied, setCopied] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-[520px] mx-auto px-4 pt-12 text-center">
        <div className="rounded-[24px] bg-well p-10">
          <h1 className="text-xl font-black">請先登入以檢視您的點數序號</h1>
          <Link
            to="/login"
            className="mt-4 h-11 px-6 rounded-full bg-ink text-white text-xs font-bold inline-flex items-center"
          >
            前往會員登入
          </Link>
        </div>
      </div>
    );
  }

  const copyCode = (id: string, val: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 1400);
  };

  return (
    <div className="max-w-[1140px] mx-auto px-4 md:px-6 pt-6 md:pt-8">
      {/* Top Wallet Card */}
      <div className="rounded-[24px] bg-ink text-white p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-bold">
            {user.role === 'admin' ? '系統管理員帳戶' : '正式認證會員'}
          </span>
          <h1 className="text-2xl md:text-3xl font-black mt-2">{user.username}</h1>
          <p className="text-xs text-zinc-400 mt-1">{user.email}</p>
        </div>

        <div className="rounded-2xl bg-white/10 p-5 border border-white/15 flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-300">可用儲值金餘額 (1點 = NT$1)</div>
            <div className="en text-3xl font-black mt-1">
              {formatNT(user.store_credit)}
            </div>
          </div>
          <Link
            to="/products"
            className="h-10 px-4 rounded-full bg-white text-ink text-xs font-extrabold inline-flex items-center"
          >
            去折抵
          </Link>
        </div>
      </div>

      {/* Order & Serial Code History */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-black">我的訂單與點數卡序號匣</h2>
          <span className="text-xs text-muted">共 {orders.length} 筆紀錄</span>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-[22px] border border-line bg-white p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-line">
                <div className="flex items-center gap-3">
                  <span className="mono font-extrabold text-sm">{order.order_no}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      order.status === 'completed'
                        ? 'bg-ok-bg text-ok'
                        : 'bg-well text-ink'
                    }`}
                  >
                    {order.status === 'completed'
                      ? '已核發序號'
                      : order.status === 'paid'
                      ? '已匯款待發卡'
                      : '待 ATM 轉帳'}
                  </span>
                  <span className="text-xs text-muted">{order.created_at}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="en font-black text-base">{formatNT(order.total)}</span>
                  <button
                    type="button"
                    onClick={() => navigate(`/order/${order.order_no}`)}
                    className="h-8 px-3.5 rounded-full bg-well hover:bg-well-strong text-xs font-bold cursor-pointer"
                  >
                    訂單詳情
                  </button>
                </div>
              </div>

              {/* Items & Serial Codes */}
              <div className="pt-4 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>
                        {item.product_name} x {item.quantity}
                      </span>
                      <span className="en">{formatNT(item.price * item.quantity)}</span>
                    </div>

                    {item.codes && item.codes.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {item.codes.map((c, idx) => (
                          <div
                            key={`${item.id}-${idx}`}
                            className="p-3.5 rounded-xl bg-well flex items-center justify-between gap-3"
                          >
                            <div className="text-xs">
                              <div className="mono font-bold text-ink">卡號：{c.code}</div>
                              <div className="mono text-muted mt-0.5">密碼：{c.pin}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                copyCode(`${order.id}-${idx}`, `${c.code} / ${c.pin}`)
                              }
                              className="h-8 px-3 rounded-full bg-ink text-white text-[11px] font-bold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                              {copied === `${order.id}-${idx}` ? (
                                <Check size={12} />
                              ) : (
                                <Copy size={12} />
                              )}
                              <span>
                                {copied === `${order.id}-${idx}` ? '已複製' : '複製卡密'}
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-well text-xs text-muted flex flex-wrap items-center justify-between gap-2">
                        <span>
                          虛擬帳號：<strong className="mono text-ink">{order.payment?.vatm_account}</strong>（待入帳核發）
                        </span>
                        <button
                          type="button"
                          onClick={() => simulateOrderPaid(order.order_no)}
                          className="h-7 px-3 rounded-full bg-ink text-white text-[11px] font-bold cursor-pointer"
                        >
                          模擬入帳並領取序號
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   9. FAQ & ABOUT PAGES (/faq, /about)
   ============================================================================ */
function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="max-w-[860px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
      <h1 className="text-2xl md:text-3xl font-black tracking-tight">常見問題 FAQ</h1>
      <p className="text-xs md:text-sm text-muted mt-1">
        關於 MyCard 95 折選購、ATM 虛擬帳號匯款、專人發卡時間與儲值金回饋完整說明
      </p>

      <div className="mt-6 rounded-[22px] border border-line divide-y divide-line bg-white overflow-hidden">
        {FAQ_ITEMS.map(([q, a], idx) => {
          const open = openIdx === idx;
          return (
            <div key={q}>
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-well/50 cursor-pointer"
              >
                <span className="font-bold text-sm md:text-[15px]">{q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted transition-transform ${open ? 'rotate-180 text-ink' : ''}`}
                />
              </button>
              {open && (
                <div className="px-6 pb-5 text-xs md:text-sm text-muted leading-relaxed">
                  {a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="max-w-[920px] mx-auto px-4 md:px-6 pt-6 md:pt-10 space-y-6">
      <div className="rounded-[24px] bg-ink text-white p-8 md:p-10">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight">
          關於{COMPANY_INFO.name}
        </h1>
        <p className="text-zinc-300 text-sm mt-3 leading-relaxed max-w-[680px]">
          {COMPANY_INFO.name}（{COMPANY_INFO.enName}）為台灣合法登記之數位點數卡授權經銷商。我們致力於提供玩家最透明的
          95 折優惠牌價、嚴謹的 ATM 虛擬帳號實名核銷機制，以及永久可查的數位序號錢包體驗。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-[22px] border border-line bg-white p-6 space-y-3 text-xs leading-relaxed">
          <div className="flex items-center gap-2 font-extrabold text-base text-ink">
            <Building2 size={18} />
            <span>公司營業登記資訊</span>
          </div>
          <div className="divide-y divide-line pt-1">
            <div className="py-2 flex justify-between">
              <span className="text-muted">公司名稱</span>
              <span className="font-bold">{COMPANY_INFO.name}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-muted">統一編號</span>
              <span className="mono font-bold">{COMPANY_INFO.taxId}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-muted">客服專線</span>
              <span className="mono font-bold">{COMPANY_INFO.phone}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-muted">客服信箱</span>
              <span className="mono font-bold">{COMPANY_INFO.email}</span>
            </div>
            <div className="py-2 flex justify-between">
              <span className="text-muted">營業地址</span>
              <span className="font-bold text-right">{COMPANY_INFO.address}</span>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] border border-line bg-white p-6 space-y-3 text-xs text-muted leading-relaxed">
          <div className="flex items-center gap-2 font-extrabold text-base text-ink">
            <FileText size={18} />
            <span>服務條款與防詐騙聲明</span>
          </div>
          <p>
            1. <strong className="text-ink">數位商品退換貨規範</strong>：本站販售之 MyCard 點數卡屬「非以有形媒介提供之數位內容」，一經核發卡號與密碼至會員帳戶後即完成履約，不適用七日鑑賞期退貨。
          </p>
          <p>
            2. <strong className="text-ink">防範第三方詐騙</strong>：請勿聽從不明網友、交友軟體或檢警指示購買遊戲點數或代他人匯款至本站虛擬帳號。如有疑問請立即撥打 165 反詐騙專線。
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   10. ADMIN CONSOLE (/admin, /admin/fulfill, /admin/products, /admin/orders, /admin/users)
   ============================================================================ */
function AdminLayout() {
  const orders = useAppStore((s) => s.orders);
  const pendingCount = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;

  return (
    <div className="min-h-screen bg-well text-ink flex flex-col md:flex-row">
      <aside className="w-full md:w-[268px] bg-ink text-white p-5 flex flex-col justify-between shrink-0">
        <div>
          <div className="flex items-center justify-between gap-2 pb-5 border-b border-white/15">
            <Link to="/admin" className="flex items-center gap-2 font-black text-[15px] whitespace-nowrap">
              <span className="en w-7 h-7 rounded-lg bg-white text-ink grid place-items-center text-xs font-extrabold shrink-0">
                XX
              </span>
              <span>{COMPANY_INFO.brandShort}發卡後台</span>
            </Link>
            <Link to="/" className="text-xs text-zinc-400 hover:text-white whitespace-nowrap shrink-0">
              返回前台 →
            </Link>
          </div>

          <nav className="mt-5 flex md:flex-col gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { to: '/admin', label: '營運總覽', icon: LayoutDashboard, end: true },
              {
                to: '/admin/fulfill',
                label: `手動發卡 (${pendingCount})`,
                icon: Send,
              },
              { to: '/admin/products', label: '商品與補貨', icon: Package },
              { to: '/admin/orders', label: '全部訂單', icon: ShoppingCart },
              { to: '/admin/users', label: '會員與儲值金', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 whitespace-nowrap ${
                      isActive ? 'bg-white text-ink' : 'text-zinc-300 hover:bg-white/10'
                    }`
                  }
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="hidden md:block pt-4 border-t border-white/15 text-[11px] text-zinc-400">
          {COMPANY_INFO.name} 內部管理系統
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 max-w-[1200px]">
        <Outlet />
      </main>
    </div>
  );
}

function AdminDashboardPage() {
  const products = useAppStore((s) => s.products);
  const orders = useAppStore((s) => s.orders);
  const users = useAppStore((s) => s.users);

  const revenue = orders
    .filter((o) => o.status === 'completed' || o.status === 'paid')
    .reduce((s, o) => s + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'paid');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black">後台營運儀表板</h1>
          <p className="text-xs text-muted mt-0.5">即時監控 17 種 MyCard 面額庫存與待發卡訂單</p>
        </div>
        <Link
          to="/admin/fulfill"
          className="h-10 px-4 rounded-full bg-ink text-white text-xs font-bold inline-flex items-center gap-1.5"
        >
          <Send size={14} />
          <span>前往處理待發卡 ({pendingOrders.length})</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-line">
          <div className="text-xs text-muted">累計實收營收</div>
          <div className="en text-2xl font-black mt-1">{formatNT(revenue)}</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-line">
          <div className="text-xs text-muted">待核發序號訂單</div>
          <div className="en text-2xl font-black mt-1 text-sale">{pendingOrders.length} 筆</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-line">
          <div className="text-xs text-muted">上架中 MyCard 面額</div>
          <div className="en text-2xl font-black mt-1">{products.length} 種</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-line">
          <div className="text-xs text-muted">註冊會員數</div>
          <div className="en text-2xl font-black mt-1">{users.length} 人</div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-line overflow-hidden">
        <div className="px-5 py-4 border-b border-line font-extrabold text-sm">
          17 種 MyCard 點數面額庫存一覽
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-well text-muted">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">商品名稱</th>
                <th className="p-3">牌價</th>
                <th className="p-3">95折售價</th>
                <th className="p-3">標籤</th>
                <th className="p-3">可用序號庫存</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 mono">#{p.id}</td>
                  <td className="p-3 font-bold">{p.name}</td>
                  <td className="p-3 en">{formatNT(p.original_price)}</td>
                  <td className="p-3 en font-bold">{formatNT(p.price)}</td>
                  <td className="p-3">{p.badge}</td>
                  <td className="p-3 en font-bold text-ok">{p.stock} 張</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminFulfillPage() {
  const orders = useAppStore((s) => s.orders);
  const issueOrderCodes = useAppStore((s) => s.issueOrderCodes);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [manualText, setManualText] = useState<Record<number, string>>({});

  const pendingList = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled');
  const activeOrder = orders.find((o) => o.id === selectedOrderId);

  const handleManualSubmit = () => {
    if (!activeOrder) return;
    const parsed: Record<number, SerialCode[]> = {};
    activeOrder.items.forEach((item) => {
      const raw = (manualText[item.id] || '').trim();
      if (raw) {
        parsed[item.id] = raw.split('\n').map((line) => {
          const [code, pin] = line.split(/[,\t ]+/);
          return { code: code || 'MC00-1111-2222-3333', pin: pin || '88889999' };
        });
      }
    });
    issueOrderCodes(activeOrder.id, Object.keys(parsed).length ? 'manual' : 'auto', parsed);
    setSelectedOrderId(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">專人手動發卡工作台</h1>
        <p className="text-xs text-muted mt-0.5">
          核對買家 ATM 虛擬帳號入帳後，可選擇「一鍵自動抽卡配發」或「手動貼上卡號,密碼」
        </p>
      </div>

      {pendingList.length === 0 ? (
        <div className="p-10 rounded-2xl bg-white border border-line text-center text-sm font-bold text-ok">
          目前所有訂單皆已完成發卡！
        </div>
      ) : (
        <div className="space-y-3">
          {pendingList.map((o) => (
            <div
              key={o.id}
              className="p-5 rounded-2xl bg-white border border-line flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="mono font-extrabold text-sm">{o.order_no}</span>
                  <span className="px-2 py-0.5 rounded-full bg-well text-[11px] font-bold">
                    {o.name} ({o.email})
                  </span>
                </div>
                <div className="text-xs text-muted mt-1">
                  虛擬帳號：<span className="mono text-ink">{o.payment?.vatm_account}</span> ・ 轉出銀行：{o.payment?.payer_bank_code} (*{o.payment?.payer_account_last5})
                </div>
                <div className="text-xs font-bold mt-1">
                  購買項目：{o.items.map((i) => `${i.product_name} x${i.quantity}`).join('、')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => issueOrderCodes(o.id, 'auto')}
                  className="h-9 px-4 rounded-full bg-ink text-white text-xs font-bold cursor-pointer"
                >
                  一鍵自動配發序號
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderId(o.id)}
                  className="h-9 px-4 rounded-full border border-ink text-xs font-bold cursor-pointer"
                >
                  手動輸入卡密
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual Code Input Modal */}
      {activeOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-2xl max-w-[520px] w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-base">
                手動輸入卡號與密碼 ({activeOrder.order_no})
              </h2>
              <button
                type="button"
                onClick={() => setSelectedOrderId(null)}
                className="w-8 h-8 rounded-full bg-well grid place-items-center"
              >
                <X size={15} />
              </button>
            </div>

            {activeOrder.items.map((item) => (
              <div key={item.id}>
                <label className="block text-xs font-bold mb-1">
                  {item.product_name} (需輸入 {item.quantity} 組，每行格式：卡號,密碼)
                </label>
                <textarea
                  rows={3}
                  value={manualText[item.id] || ''}
                  onChange={(e) =>
                    setManualText({ ...manualText, [item.id]: e.target.value })
                  }
                  placeholder="MC10-8821-3901-4412,92817263"
                  className="w-full p-3 rounded-xl bg-well text-xs mono outline-none"
                />
              </div>
            ))}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedOrderId(null)}
                className="h-10 px-4 rounded-full bg-well text-xs font-bold"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleManualSubmit}
                className="h-10 px-5 rounded-full bg-ink text-white text-xs font-bold cursor-pointer"
              >
                確認發卡並完成訂單
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminProductsPage() {
  const products = useAppStore((s) => s.products);
  const updateProduct = useAppStore((s) => s.updateProduct);
  const importProductCodes = useAppStore((s) => s.importProductCodes);
  const [importTarget, setImportTarget] = useState<Product | null>(null);
  const [rawCodes, setRawCodes] = useState('');

  const handleImport = () => {
    if (!importTarget) return;
    const lines = rawCodes
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
    const parsed = lines.map((line) => {
      const [code, pin] = line.split(/[,\t ]+/);
      return { code: code || 'MC99-0000', pin: pin || '12345678' };
    });
    importProductCodes(importTarget.id, parsed.length ? parsed : [{ code: 'MC-NEW', pin: '11112222' }]);
    setRawCodes('');
    setImportTarget(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">商品售價與序號庫存管理</h1>
        <p className="text-xs text-muted mt-0.5">可直接修改 17 種 MyCard 面額售價、促銷標籤與批次匯入序號卡密</p>
      </div>

      <div className="rounded-2xl bg-white border border-line overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-well text-muted">
              <tr>
                <th className="p-3">面額名稱</th>
                <th className="p-3">售價 (NT$)</th>
                <th className="p-3">促銷標籤</th>
                <th className="p-3">庫存</th>
                <th className="p-3">狀態</th>
                <th className="p-3">補貨</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.id}>
                  <td className="p-3 font-bold">{p.name}</td>
                  <td className="p-3">
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) =>
                        updateProduct(p.id, { price: Number(e.target.value) || p.price })
                      }
                      className="w-20 h-8 px-2 rounded-lg bg-well mono font-bold"
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      value={p.badge}
                      onChange={(e) => updateProduct(p.id, { badge: e.target.value })}
                      className="w-20 h-8 px-2 rounded-lg bg-well font-bold"
                    />
                  </td>
                  <td className="p-3 en font-bold">{p.stock} 張</td>
                  <td className="p-3">
                    <select
                      value={p.status}
                      onChange={(e) =>
                        updateProduct(p.id, {
                          status: e.target.value as 'active' | 'inactive',
                        })
                      }
                      className="h-8 px-2 rounded-lg bg-well font-bold"
                    >
                      <option value="active">上架中</option>
                      <option value="inactive">下架</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => setImportTarget(p)}
                      className="h-8 px-3 rounded-full bg-ink text-white font-bold cursor-pointer"
                    >
                      + 匯入序號
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {importTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-white rounded-2xl max-w-[460px] w-full p-6 space-y-4">
            <h2 className="font-extrabold text-base">
              批次匯入序號：{importTarget.name}
            </h2>
            <textarea
              rows={4}
              value={rawCodes}
              onChange={(e) => setRawCodes(e.target.value)}
              placeholder="每行一組：卡號,密碼&#10;MC10-1234-5678-9012,87654321"
              className="w-full p-3 rounded-xl bg-well text-xs mono outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setImportTarget(null)}
                className="h-9 px-4 rounded-full bg-well text-xs font-bold"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="h-9 px-5 rounded-full bg-ink text-white text-xs font-bold cursor-pointer"
              >
                確認匯入補貨
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AdminOrdersPage() {
  const orders = useAppStore((s) => s.orders);
  const updateOrderStatus = useAppStore((s) => s.updateOrderStatus);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">全部訂單管理</h1>
      <div className="rounded-2xl bg-white border border-line overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-well text-muted">
              <tr>
                <th className="p-3">訂單編號</th>
                <th className="p-3">買家</th>
                <th className="p-3">虛擬帳號</th>
                <th className="p-3">總額</th>
                <th className="p-3">狀態切換</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="p-3 mono font-bold">{o.order_no}</td>
                  <td className="p-3">{o.name}</td>
                  <td className="p-3 mono">{o.payment?.vatm_account}</td>
                  <td className="p-3 en font-bold">{formatNT(o.total)}</td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) =>
                        updateOrderStatus(o.id, e.target.value as typeof o.status)
                      }
                      className="h-8 px-2.5 rounded-lg bg-well font-bold"
                    >
                      <option value="pending">待付款 (pending)</option>
                      <option value="paid">已付款待發卡 (paid)</option>
                      <option value="completed">已完成發卡 (completed)</option>
                      <option value="cancelled">已取消 (cancelled)</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminUsersPage() {
  const users = useAppStore((s) => s.users);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black">註冊會員與儲值金列表</h1>
      <div className="rounded-2xl bg-white border border-line overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-well text-muted">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">會員名稱</th>
              <th className="p-3">信箱</th>
              <th className="p-3">權限</th>
              <th className="p-3">儲值金餘額</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-3 mono">#{u.id}</td>
                <td className="p-3 font-bold">{u.username}</td>
                <td className="p-3 mono">{u.email}</td>
                <td className="p-3">{u.role}</td>
                <td className="p-3 en font-extrabold">{formatNT(u.store_credit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="max-w-[520px] mx-auto px-4 pt-16 text-center">
      <div className="rounded-[24px] bg-well p-10">
        <div className="en text-4xl font-black">404</div>
        <h1 className="text-lg font-extrabold mt-2">找不到此頁面</h1>
        <Link
          to="/"
          className="mt-5 h-11 px-6 rounded-full bg-ink text-white text-xs font-bold inline-flex items-center"
        >
          返回首頁
        </Link>
      </div>
    </div>
  );
}

/* ============================================================================
   ROOT ROUTER
   ============================================================================ */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:orderNo" element={<OrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/member" element={<MemberPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="fulfill" element={<AdminFulfillPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
