import React, { useState, useEffect } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import {
  Menu,
  X,
  ShoppingBag,
  User as UserIcon,
  Home,
  Tag,
  HelpCircle,
  Building2,
  ShieldCheck,
  Search,
  ChevronRight,
  LogOut,
  Plus,
  Check,
  Wallet,
  LayoutDashboard,
} from 'lucide-react';
import { useCartStore, useAppStore, formatNT } from './store';
import { COMPANY_INFO, Product } from './data';

export function StylaProductCard({ p }: { p: Product }) {
  const add = useCartStore((s) => s.add);
  const lastAddedId = useCartStore((s) => s.lastAddedId);
  const isJustAdded = lastAddedId === p.id;
  const saving = p.original_price - p.price;

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-square rounded-[20px] bg-well p-5 flex items-center justify-center overflow-hidden transition-colors duration-200 group-hover:bg-well-strong">
        <span
          className={`absolute top-3 left-3 z-10 text-[11px] font-bold px-2.5 py-1 rounded-full tracking-tight ${
            p.badge === '熱銷' || p.badge === '超值'
              ? 'bg-ink text-white'
              : 'bg-white text-ink border border-line'
          }`}
        >
          {p.badge}
        </span>

        {saving > 0 && (
          <span className="en absolute top-3 right-3 z-10 text-[11px] font-bold px-2 py-0.5 rounded-full bg-sale-bg text-sale">
            -{formatNT(saving)}
          </span>
        )}

        <Link
          to={`/products/${p.id}`}
          className="w-full h-full flex items-center justify-center"
          aria-label={`查看 ${p.name} 詳情`}
        >
          <img
            src={p.image_url}
            alt={p.name}
            loading="lazy"
            className="w-[82%] h-[82%] object-contain transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </Link>

        <button
          type="button"
          onClick={() => add(p, 1)}
          aria-label={`將 ${p.name} 加入購物車`}
          className={`absolute bottom-3 right-3 z-10 h-9 px-3.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_6px_16px_rgba(20,20,20,0.12)] ${
            isJustAdded
              ? 'bg-ok text-white'
              : 'bg-ink text-white hover:bg-ink-soft active:scale-95'
          }`}
        >
          {isJustAdded ? (
            <>
              <Check size={14} strokeWidth={2.5} />
              <span>已加入</span>
            </>
          ) : (
            <>
              <Plus size={14} strokeWidth={2.4} />
              <span>加入</span>
            </>
          )}
        </button>
      </div>

      <div className="pt-3 px-0.5 flex flex-col">
        <Link
          to={`/products/${p.id}`}
          className="font-bold text-[15px] text-ink hover:underline leading-snug"
        >
          {p.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="en font-extrabold text-[18px] text-ink tracking-tight">
            {formatNT(p.price)}
          </span>
          {p.original_price > p.price && (
            <span className="en text-[13px] text-muted line-through">
              {formatNT(p.original_price)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function StoreLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cartCount = useCartStore((s) => s.count());
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [headerQuery, setHeaderQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'navy');
    localStorage.setItem('xxtech_theme', 'navy');
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDrawerOpen(false);
  }, [pathname]);

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(headerQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  // Hide mobile bottom nav on product detail, cart, and checkout where sticky action bars live
  const isDetailOrCheckout =
    pathname.startsWith('/products/') || pathname === '/cart' || pathname === '/checkout';

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink">
      {/* Desktop & Mobile Header */}
      <header className="sticky top-0 z-40 bg-bg/95 backdrop-blur-md border-b border-line">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6 h-[64px] md:h-[72px] flex items-center justify-between gap-3">
          {/* Mobile Left: Hamburger + Styla Wallet Pill */}
          <div className="flex md:hidden items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="開啟選單"
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-well cursor-pointer"
            >
              <Menu size={21} strokeWidth={1.9} />
            </button>

            <Link
              to={user ? '/member' : '/login'}
              className="h-9 px-3.5 rounded-full bg-ink text-white inline-flex items-center gap-2 text-[13px] font-bold tracking-tight"
            >
              <span className="w-4 h-3 rounded-[3px] bg-emerald-400/90 inline-block shrink-0" />
              <span className="en">
                {user ? `NT$ ${user.store_credit.toLocaleString()}` : 'NT$ 0 儲值金'}
              </span>
            </Link>
          </div>

          {/* Desktop Left: Brand Identity */}
          <Link
            to="/"
            className="hidden md:flex items-center gap-3 font-black text-[19px] tracking-tight shrink-0"
          >
            <span className="en w-9 h-9 rounded-[10px] bg-ink text-white grid place-items-center font-extrabold text-[15px]">
              XX
            </span>
            <span className="leading-tight">
              {COMPANY_INFO.brandShort}
              <small className="block text-[11px] font-medium text-muted tracking-normal">
                MYCARD 點數卡專賣
              </small>
            </span>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[15px] font-semibold text-muted">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? 'text-ink font-bold' : 'hover:text-ink transition-colors'
              }
            >
              首頁
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? 'text-ink font-bold' : 'hover:text-ink transition-colors'
              }
            >
              商品面額
            </NavLink>
            <a href="/#steps" className="hover:text-ink transition-colors">
              發卡流程
            </a>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? 'text-ink font-bold' : 'hover:text-ink transition-colors'
              }
            >
              常見問題
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? 'text-ink font-bold' : 'hover:text-ink transition-colors'
              }
            >
              關於我們
            </NavLink>
          </nav>

          {/* Desktop Search + Wallet Pill + Actions / Mobile Right Icons */}
          <div className="flex items-center gap-2.5">
            <form
              onSubmit={handleDesktopSearch}
              className="hidden lg:flex items-center bg-well rounded-full px-3.5 h-10 w-[210px] focus-within:ring-2 focus-within:ring-ink"
            >
              <Search size={16} className="text-muted shrink-0" />
              <input
                type="search"
                value={headerQuery}
                onChange={(e) => setHeaderQuery(e.target.value)}
                placeholder="搜尋面額 (如 150, 1000)"
                className="bg-transparent text-sm px-2 w-full outline-none"
              />
            </form>

            {/* Desktop Styla Wallet Pill */}
            <Link
              to={user ? '/member' : '/login'}
              className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-full bg-ink text-white text-xs font-bold tracking-tight hover:bg-ink-soft transition-colors"
              title="會員儲值金餘額"
            >
              <Wallet size={14} strokeWidth={2} />
              <span>儲值金</span>
              <span className="en text-[13px]">
                {user ? formatNT(user.store_credit) : 'NT$0'}
              </span>
            </Link>

            {/* Mobile Brand Pill */}
            <Link
              to="/"
              className="md:hidden font-black text-[15px] tracking-tight px-2 py-1"
            >
              {COMPANY_INFO.brandShort}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              aria-label="購物車"
              className="relative w-10 h-10 rounded-full bg-well hover:bg-well-strong grid place-items-center transition-colors"
            >
              <ShoppingBag size={19} strokeWidth={1.85} />
              {cartCount > 0 && (
                <span className="en absolute -top-1 -right-1 min-w-[19px] h-[19px] px-1 rounded-full bg-ink text-white text-[11px] font-bold grid place-items-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Member / Admin Links on Desktop */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/member"
                  className="h-10 px-4 rounded-full border border-line hover:border-ink text-sm font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <UserIcon size={16} />
                  <span>{user.username}</span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="h-10 px-3.5 rounded-full bg-well hover:bg-well-strong text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <LayoutDashboard size={15} />
                    <span>後台</span>
                  </Link>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex h-10 px-4 rounded-full border border-ink text-sm font-bold items-center hover:bg-ink hover:text-white transition-colors"
              >
                登入
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/45 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative z-10 w-[300px] max-w-[84vw] bg-white h-full flex flex-col justify-between p-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-line">
                <div className="flex items-center gap-2.5">
                  <span className="en w-8 h-8 rounded-lg bg-ink text-white grid place-items-center font-extrabold text-sm">
                    XX
                  </span>
                  <div>
                    <div className="font-black text-base leading-none">
                      {COMPANY_INFO.brandShort}
                    </div>
                    <div className="text-[11px] text-muted mt-1">MYCARD 點數卡專賣</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="關閉選單"
                  className="w-9 h-9 rounded-full bg-well grid place-items-center"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Wallet Summary inside Mobile Drawer */}
              <div className="mt-5 p-4 rounded-2xl bg-ink text-white">
                <div className="text-xs text-zinc-300 flex items-center justify-between">
                  <span>會員儲值金餘額</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/15 text-[11px]">
                    滿千回饋 1%
                  </span>
                </div>
                <div className="en text-2xl font-extrabold mt-1">
                  {user ? formatNT(user.store_credit) : 'NT$0'}
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    to={user ? '/member' : '/login'}
                    className="flex-1 py-2 rounded-full bg-white text-ink text-center text-xs font-bold"
                  >
                    {user ? '查看我的訂單序號' : '登入 / 免費註冊'}
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => useAppStore.getState().loginQuickRole('admin')}
                    className="px-3 py-2 rounded-full bg-white/15 text-white text-xs font-bold"
                  >
                    管理後台
                  </Link>
                </div>
              </div>

              <nav className="mt-6 space-y-1">
                {[
                  { to: '/', label: '首頁總覽', icon: Home },
                  { to: '/products', label: '全部 MyCard 面額', icon: Tag },
                  { to: '/cart', label: `購物車 (${cartCount})`, icon: ShoppingBag },
                  { to: '/member', label: '會員中心 / 查序號', icon: UserIcon },
                  { to: '/faq', label: '常見問題 FAQ', icon: HelpCircle },
                  { to: '/about', label: '關於我們與條款', icon: Building2 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="flex items-center justify-between px-3.5 py-3 rounded-xl font-bold text-[15px] hover:bg-well"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={18} strokeWidth={1.85} className="text-muted" />
                        {item.label}
                      </span>
                      <ChevronRight size={16} className="text-muted" />
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-line text-xs text-muted space-y-1.5">
              <div className="font-bold text-ink">{COMPANY_INFO.name}</div>
              <div>統一編號：{COMPANY_INFO.taxId}</div>
              <div>客服專線：{COMPANY_INFO.phone}</div>
              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDrawerOpen(false);
                  }}
                  className="mt-2 w-full py-2.5 rounded-xl border border-line text-ink font-bold inline-flex items-center justify-center gap-1.5"
                >
                  <LogOut size={14} />
                  <span>登出帳號</span>
                </button>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${isDetailOrCheckout ? 'pb-24 md:pb-16' : 'pb-24 md:pb-16'}`}>
        <Outlet />
      </main>

      {/* Desktop & Mobile Footer */}
      <footer className="bg-ink text-zinc-300 pt-14 pb-24 md:pb-12 border-t border-line">
        <div className="max-w-[1240px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.3fr] gap-9">
            <div>
              <Link
                to="/"
                className="flex items-center gap-3 font-black text-[19px] text-white"
              >
                <span className="en w-9 h-9 rounded-[10px] bg-white text-ink grid place-items-center font-extrabold text-[15px]">
                  XX
                </span>
                <span className="leading-tight">
                  {COMPANY_INFO.brandShort}
                  <small className="block text-[11px] font-medium text-zinc-400">
                    MYCARD 點數卡專賣
                  </small>
                </span>
              </Link>
              <p className="text-zinc-400 text-sm mt-4 max-w-[300px] leading-relaxed">
                專營正版授權 MYCARD 遊戲點數卡線上零售。全系列 95 折透明定價，ATM
                虛擬帳號安全配號，專人核發序號永久可查。
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-400">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>256-bit SSL 加密傳輸 ・ 官方授權零售通路</span>
              </div>
            </div>

            <div>
              <h2 className="text-white text-sm font-bold mb-4">點數選購</h2>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <Link to="/products" className="hover:text-white transition-colors">
                    全部 MyCard 面額
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?filter=hot"
                    className="hover:text-white transition-colors"
                  >
                    熱銷推薦面額
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products?filter=large"
                    className="hover:text-white transition-colors"
                  >
                    滿千享 1% 回饋大面額
                  </Link>
                </li>
                <li>
                  <a href="/#steps" className="hover:text-white transition-colors">
                    三步驟發卡流程
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-sm font-bold mb-4">客戶服務</h2>
              <ul className="space-y-2.5 text-sm text-zinc-400">
                <li>
                  <Link to="/member" className="hover:text-white transition-colors">
                    查詢歷史訂單序號
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    常見問題 FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    關於{COMPANY_INFO.brandShort}與服務條款
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    onClick={() => useAppStore.getState().loginQuickRole('admin')}
                    className="hover:text-white transition-colors"
                  >
                    管理員發卡後台
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-sm font-bold mb-4">公司與聯絡資訊</h2>
              <div className="text-[13px] text-zinc-400 leading-[1.9]">
                <strong className="text-white font-semibold">{COMPANY_INFO.name}</strong>
                <br />
                統一編號：<span className="mono text-zinc-200">{COMPANY_INFO.taxId}</span>
                <br />
                客服電話：<span className="mono text-zinc-200">{COMPANY_INFO.phone}</span>
                <br />
                客服信箱：<span className="mono text-zinc-200">{COMPANY_INFO.email}</span>
                <br />
                {COMPANY_INFO.address}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 flex flex-wrap gap-3 justify-between text-xs text-zinc-400">
            <span>
              © 2026 {COMPANY_INFO.name} {COMPANY_INFO.enName} 版權所有。
            </span>
            <span>MYCARD 為其各自商標所有人之財產，本站為正版授權零售通路。</span>
          </div>
        </div>
      </footer>

      {/* Mobile Styla 4-Tab Sticky Bottom Navigation Bar */}
      {!isDetailOrCheckout && (
        <nav
          aria-label="行動版底部導覽"
          className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-line h-[64px] px-4 grid grid-cols-4 items-center"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                isActive ? 'text-ink' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-8 h-7 rounded-full grid place-items-center ${
                    isActive ? 'bg-ink text-white' : ''
                  }`}
                >
                  <Home size={17} strokeWidth={2} />
                </span>
                <span>首頁</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                isActive ? 'text-ink' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-8 h-7 rounded-full grid place-items-center ${
                    isActive ? 'bg-ink text-white' : ''
                  }`}
                >
                  <Tag size={17} strokeWidth={2} />
                </span>
                <span>優惠面額</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                isActive ? 'text-ink' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative w-8 h-7 rounded-full grid place-items-center ${
                    isActive ? 'bg-ink text-white' : ''
                  }`}
                >
                  <ShoppingBag size={17} strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="en absolute -top-1 -right-1.5 min-w-[16px] h-[16px] px-1 rounded-full bg-sale text-white text-[10px] font-extrabold grid place-items-center">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span>購物車</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/member"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 text-[11px] font-bold ${
                isActive ? 'text-ink' : 'text-muted'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`w-8 h-7 rounded-full grid place-items-center ${
                    isActive ? 'bg-ink text-white' : ''
                  }`}
                >
                  <UserIcon size={17} strokeWidth={2} />
                </span>
                <span>我的序號</span>
              </>
            )}
          </NavLink>
        </nav>
      )}
    </div>
  );
}
