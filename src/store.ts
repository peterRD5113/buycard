import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_PRODUCTS, Product, Order, User, SerialCode, TAIWAN_BANKS } from './data';

export interface CartItem {
  id: number;
  name: string;
  face_value: number;
  price: number;
  original_price: number;
  image_url: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  lastAddedId: number | null;
  add: (p: Product, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
  totalSavings: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        {
          id: 10,
          name: 'MyCard 150 點',
          face_value: 150,
          price: 143,
          original_price: 150,
          image_url: '/images/products/mycard-150.webp',
          qty: 1,
        },
        {
          id: 16,
          name: 'MyCard 500 點',
          face_value: 500,
          price: 475,
          original_price: 500,
          image_url: '/images/products/mycard-500.webp',
          qty: 2,
        },
      ],
      lastAddedId: null,
      add: (p, qty = 1) => {
        set((state) => {
          const exists = state.items.find((i) => i.id === p.id);
          const nextItems = exists
            ? state.items.map((i) => (i.id === p.id ? { ...i, qty: i.qty + qty } : i))
            : [
                ...state.items,
                {
                  id: p.id,
                  name: p.name,
                  face_value: p.face_value,
                  price: p.price,
                  original_price: p.original_price,
                  image_url: p.image_url,
                  qty,
                },
              ];
          return { items: nextItems, lastAddedId: p.id };
        });
        setTimeout(() => {
          if (get().lastAddedId === p.id) {
            set({ lastAddedId: null });
          }
        }, 1400);
      },
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      setQty: (id, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.id !== id)
              : state.items.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
        })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, i) => sum + i.qty, 0),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      totalSavings: () =>
        get().items.reduce((sum, i) => sum + (i.original_price - i.price) * i.qty, 0),
    }),
    { name: 'xxtech_cart_v1' }
  )
);

const INITIAL_USERS: User[] = [
  {
    id: 1,
    username: '林冠宇',
    email: 'member@xxtechpoint.com',
    role: 'member',
    store_credit: 65,
    created_at: '2026-09-14 20:15',
  },
  {
    id: 2,
    username: 'XX科技管理員',
    email: 'admin@xxtechpoint.com',
    role: 'admin',
    store_credit: 280,
    created_at: '2026-06-01 09:00',
  },
  {
    id: 3,
    username: '陳宥廷',
    email: 'yuting.chen@gmail.com',
    role: 'member',
    store_credit: 19,
    created_at: '2026-10-22 14:40',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 101,
    order_no: 'XX2611080942',
    user_id: 1,
    name: '林冠宇',
    phone: '0918-624-901',
    email: 'member@xxtechpoint.com',
    tax_id: '',
    payment_method: 'atm',
    subtotal: 1900,
    discount_credit: 0,
    total: 1900,
    earned_credit: 19,
    status: 'completed',
    created_at: '2026-11-08 21:34',
    items: [
      {
        id: 1001,
        product_id: 22,
        product_name: 'MyCard 2000 點',
        face_value: 2000,
        price: 1900,
        quantity: 1,
        codes: [
          {
            code: 'MC88-4920-7731-9042',
            pin: '84920173',
            product_name: 'MyCard 2000 點',
          },
        ],
      },
    ],
    payment: {
      channel: 'vatm',
      bank_name: '中國信託商業銀行',
      vatm_bank_code: '822',
      vatm_account: '9528110809421900',
      payer_bank_code: '822',
      payer_account_last5: '68412',
      amount: 1900,
      expire_at: '2026-11-09 21:34',
    },
  },
  {
    id: 102,
    order_no: 'XX2611091015',
    user_id: 1,
    name: '林冠宇',
    phone: '0918-624-901',
    email: 'member@xxtechpoint.com',
    tax_id: '83362653',
    payment_method: 'atm',
    subtotal: 950,
    discount_credit: 0,
    total: 950,
    earned_credit: 0,
    status: 'paid',
    created_at: '2026-11-09 10:15',
    items: [
      {
        id: 1002,
        product_id: 18,
        product_name: 'MyCard 1000 點',
        face_value: 1000,
        price: 950,
        quantity: 1,
        codes: [],
      },
    ],
    payment: {
      channel: 'vatm',
      bank_name: '國泰世華銀行',
      vatm_bank_code: '013',
      vatm_account: '9528110910150950',
      payer_bank_code: '013',
      payer_account_last5: '10498',
      amount: 950,
      expire_at: '2026-11-10 10:15',
    },
  },
];

interface AppDataState {
  user: User | null;
  users: User[];
  products: Product[];
  orders: Order[];
  codePool: Record<number, SerialCode[]>;
  login: (email: string, password?: string) => User;
  loginQuickRole: (role: 'member' | 'admin') => void;
  register: (username: string, email: string, password?: string) => User;
  logout: () => void;
  createOrder: (payload: {
    name: string;
    phone: string;
    email: string;
    taxId: string;
    payerBankCode: string;
    bankAccount: string;
    useCredit: boolean;
    cartItems: CartItem[];
  }) => Order;
  simulateOrderPaid: (orderNo: string) => void;
  issueOrderCodes: (
    orderId: number,
    mode: 'auto' | 'manual',
    manualMap?: Record<number, SerialCode[]>
  ) => { fulfilled: boolean };
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
  updateProduct: (
    productId: number,
    patch: Partial<Pick<Product, 'price' | 'badge' | 'status'>>
  ) => void;
  importProductCodes: (productId: number, codes: SerialCode[]) => number;
}

function generateRandomSerial(faceValue: number, idx: number): SerialCode {
  const seg1 = String(1000 + ((faceValue * 7 + idx * 13) % 8999));
  const seg2 = String(2000 + ((Date.now() + idx * 97) % 7999)).slice(-4);
  const seg3 = String(3000 + ((faceValue * 31 + idx * 53) % 6999));
  const pin = String(10000000 + ((Date.now() * (idx + 3)) % 89999999)).slice(0, 8);
  return {
    code: `MC${String(faceValue).padStart(2, '0').slice(0, 2)}-${seg1}-${seg2}-${seg3}`,
    pin,
  };
}

export const useAppStore = create<AppDataState>()(
  persist(
    (set, get) => ({
      user: INITIAL_USERS[0],
      users: INITIAL_USERS,
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      codePool: {},

      login: (email) => {
        const trimmed = email.trim().toLowerCase();
        const existing = get().users.find((u) => u.email.toLowerCase() === trimmed);
        if (existing) {
          set({ user: existing });
          return existing;
        }
        const isAdmin = trimmed.includes('admin');
        const created: User = {
          id: get().users.length + 1,
          username: trimmed.split('@')[0] || '會員',
          email: email.trim(),
          role: isAdmin ? 'admin' : 'member',
          store_credit: isAdmin ? 200 : 50,
          created_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
        };
        set((s) => ({ users: [...s.users, created], user: created }));
        return created;
      },

      loginQuickRole: (role) => {
        const target =
          get().users.find((u) => u.role === role) ||
          (role === 'admin' ? INITIAL_USERS[1] : INITIAL_USERS[0]);
        set({ user: target });
      },

      register: (username, email) => {
        const created: User = {
          id: get().users.length + 1,
          username: username.trim() || email.split('@')[0],
          email: email.trim(),
          role: 'member',
          store_credit: 30,
          created_at: new Date().toISOString().slice(0, 16).replace('T', ' '),
        };
        set((s) => ({ users: [...s.users, created], user: created }));
        return created;
      },

      logout: () => set({ user: null }),

      createOrder: ({
        name,
        phone,
        email,
        taxId,
        payerBankCode,
        bankAccount,
        useCredit,
        cartItems,
      }) => {
        const currentUser = get().user;
        const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
        const availableCredit = currentUser && useCredit ? currentUser.store_credit : 0;
        const discountCredit = Math.min(availableCredit, subtotal);
        const total = Math.max(0, subtotal - discountCredit);
        const earnedCredit = total >= 1000 ? Math.floor(total * 0.01) : 0;

        const now = new Date();
        const stamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(
          now.getDate()
        ).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(
          now.getMinutes()
        ).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
        const orderNo = `XX26${stamp}`;

        const bankObj = TAIWAN_BANKS.find((b) => b.code === payerBankCode);
        const vatmBankCode = bankObj ? bankObj.code : '822';
        const vatmBankName = bankObj ? bankObj.name : '中國信託商業銀行';
        const vatmAccount = `9528${stamp}${String(total).padStart(4, '0').slice(-4)}`;

        const expireDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        const expireAt = expireDate.toISOString().slice(0, 16).replace('T', ' ');

        const newOrder: Order = {
          id: Date.now(),
          order_no: orderNo,
          user_id: currentUser?.id,
          name: name.trim() || currentUser?.username || '訂購會員',
          phone: phone.trim() || '0912-345-678',
          email: email.trim(),
          tax_id: taxId.trim(),
          payment_method: 'atm',
          subtotal,
          discount_credit: discountCredit,
          total,
          earned_credit: earnedCredit,
          status: 'pending',
          created_at: now.toISOString().slice(0, 16).replace('T', ' '),
          items: cartItems.map((item, idx) => ({
            id: Date.now() + idx + 1,
            product_id: item.id,
            product_name: item.name,
            face_value: item.face_value,
            price: item.price,
            quantity: item.qty,
            codes: [],
          })),
          payment: {
            channel: 'vatm',
            bank_name: vatmBankName,
            vatm_bank_code: vatmBankCode,
            vatm_account: vatmAccount,
            payer_bank_code: payerBankCode,
            payer_account_last5: bankAccount.slice(-5),
            amount: total,
            expire_at: expireAt,
          },
        };

        set((state) => {
          let updatedUser = state.user;
          let updatedUsers = state.users;
          if (currentUser && discountCredit > 0) {
            const nextCredit = Math.max(0, currentUser.store_credit - discountCredit);
            updatedUser = { ...currentUser, store_credit: nextCredit };
            updatedUsers = state.users.map((u) =>
              u.id === currentUser.id ? updatedUser! : u
            );
          }
          return {
            orders: [newOrder, ...state.orders],
            user: updatedUser,
            users: updatedUsers,
          };
        });

        return newOrder;
      },

      simulateOrderPaid: (orderNo) => {
        set((state) => {
          const target = state.orders.find((o) => o.order_no === orderNo);
          if (!target) return state;

          const updatedOrders = state.orders.map((o) => {
            if (o.order_no !== orderNo) return o;
            const populatedItems = o.items.map((item) => {
              if (item.codes && item.codes.length >= item.quantity) return item;
              const generated: SerialCode[] = [];
              for (let i = 0; i < item.quantity; i++) {
                generated.push({
                  ...generateRandomSerial(item.face_value, i + 1),
                  product_name: item.product_name,
                });
              }
              return { ...item, codes: generated };
            });
            return {
              ...o,
              status: 'completed' as const,
              items: populatedItems,
            };
          });

          let updatedUser = state.user;
          let updatedUsers = state.users;
          if (target.earned_credit > 0 && target.user_id) {
            updatedUsers = state.users.map((u) =>
              u.id === target.user_id
                ? { ...u, store_credit: u.store_credit + target.earned_credit }
                : u
            );
            if (state.user && state.user.id === target.user_id) {
              updatedUser = {
                ...state.user,
                store_credit: state.user.store_credit + target.earned_credit,
              };
            }
          }

          return {
            orders: updatedOrders,
            user: updatedUser,
            users: updatedUsers,
          };
        });
      },

      issueOrderCodes: (orderId, mode, manualMap) => {
        let allFulfilled = true;
        set((state) => {
          const nextOrders = state.orders.map((o) => {
            if (o.id !== orderId) return o;
            const nextItems = o.items.map((item) => {
              if (mode === 'manual' && manualMap && manualMap[item.id]?.length) {
                const provided = manualMap[item.id].map((c) => ({
                  ...c,
                  product_name: item.product_name,
                }));
                if (provided.length < item.quantity) allFulfilled = false;
                return { ...item, codes: provided };
              }
              // Auto mode: generate codes
              const generated: SerialCode[] = [];
              for (let i = 0; i < item.quantity; i++) {
                generated.push({
                  ...generateRandomSerial(item.face_value, i + 1),
                  product_name: item.product_name,
                });
              }
              return { ...item, codes: generated };
            });
            return {
              ...o,
              items: nextItems,
              status: allFulfilled ? ('completed' as const) : o.status,
            };
          });
          return { orders: nextOrders };
        });
        return { fulfilled: allFulfilled };
      },

      updateOrderStatus: (orderId, status) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
        })),

      updateProduct: (productId, patch) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === productId ? { ...p, ...patch } : p)),
        })),

      importProductCodes: (productId, codes) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, stock: p.stock + codes.length } : p
          ),
          codePool: {
            ...state.codePool,
            [productId]: [...(state.codePool[productId] || []), ...codes],
          },
        }));
        return codes.length;
      },
    }),
    { name: 'xxtech_store_v1' }
  )
);

export const formatNT = (n: number) => `NT$${n.toLocaleString('en-US')}`;
export const formatDollar = (n: number) => `$${n.toLocaleString('en-US')}`;
