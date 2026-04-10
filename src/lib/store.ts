export interface Product {
  id: string;
  title: string;
  img: string;
  rating: number;
  reviews: string;
  price: string;
  delivery: string;
  isBestSeller?: boolean;
  isOverallPick?: boolean;
  category: string;
  brand: string;
  condition: string;
  hasDiscount: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    title: "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” FHD+ 16:10 165Hz/3ms Display, NVIDIA® GeForce RTX™ 5060 Laptop GPU, Intel® Core™ i7 Processor 14650HX, 16GB DDR5, 1TB Gen 4 SSD, Wi-Fi 7, Windows 11 Home",
    img: "https://m.media-amazon.com/images/I/81n1T4CYfmL._AC_UL400_.jpg",
    rating: 4.5,
    reviews: "389",
    price: "3,639,974",
    delivery: "TZS 244,088 delivery Fri, Apr 24",
    isOverallPick: true,
    category: "Laptop",
    brand: "ASUS",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p2",
    title: "Razer Iskur X - Ergonomic Gaming Chair for All-Day Gaming Comfort - Multi-Layered Synthetic Leather - High Density Foam Cushions - 2D Armrests - Steel-Reinforced Body - Black/Green",
    img: "https://m.media-amazon.com/images/I/719MpRszpCL._AC_UL300_.jpg",
    rating: 4.6,
    reviews: "1,245",
    price: "899,000",
    delivery: "TZS 150,000 delivery Wed, Apr 15",
    category: "Chair",
    brand: "Razer",
    condition: "New",
    hasDiscount: false
  },
  {
    id: "p3",
    title: "Logitech G Pro X Wireless Lightspeed Gaming Headset - Blue VO!CE Mic Filter Tech, 50mm PRO-G Drivers, DTS Headphone:X 2.0 Surround Sound - Black",
    img: "https://m.media-amazon.com/images/I/81L7Ck1WgKL._AC_UL300_.jpg",
    rating: 4.7,
    reviews: "5,678",
    price: "450,000",
    delivery: "TZS 50,000 delivery Wed, Apr 15",
    category: "Headset",
    brand: "Logitech",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p4",
    title: "SteelSeries Apex Pro TKL Wireless (2025) Mechanical Gaming Keyboard – World's Fastest Keyboard – Adjustable Actuation – OLED Smart Display – RGB – PBT Keycaps – Bluetooth 5.0 – 2.4GHz",
    img: "https://m.media-amazon.com/images/I/71pmVGTqEfL._AC_UL300_.jpg",
    rating: 4.8,
    reviews: "2,341",
    price: "650,000",
    delivery: "TZS 45,000 delivery Wed, Apr 15",
    category: "Keyboard & Mouse",
    brand: "SteelSeries",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p5",
    title: "Corsair K70 RGB PRO Wired Mechanical Gaming Keyboard - Cherry MX Speed Switches - PBT Double-Shot Keycaps - 8,000Hz Hyper-Polling - iCUE Compatible - Black",
    img: "https://m.media-amazon.com/images/I/71pmVGTqEfL._AC_UL300_.jpg",
    rating: 4.6,
    reviews: "3,456",
    price: "380,000",
    delivery: "TZS 40,000 delivery Wed, Apr 15",
    category: "Keyboard & Mouse",
    brand: "Corsair",
    condition: "Renewed",
    hasDiscount: false
  },
  {
    id: "p6",
    title: "msi Katana 15 HX 15.6” 165Hz QHD+ Gaming Laptop: Intel Core i9-14900HX, NVIDIA Geforce RTX 5070, 32GB DDR5, 1TB NVMe SSD, RGB Keyboard, Win 11 Home: Black B14WGK-016US",
    img: "https://m.media-amazon.com/images/I/71TvKdAmIjL._AC_UL300_.jpg",
    rating: 4.2,
    reviews: "267",
    price: "4,367,974",
    delivery: "TZS 227,240 delivery Fri, Apr 24",
    category: "Laptop",
    brand: "msi",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p7",
    title: "acer Nitro V Gaming Laptop | Intel Core i5-13420H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6\" FHD IPS 165Hz Display | 8GB DDR5 | 512GB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-586Z",
    img: "https://m.media-amazon.com/images/I/71gXelI8upL._AC_UL300_.jpg",
    rating: 4.5,
    reviews: "270",
    price: "1,949,974",
    delivery: "TZS 208,416 delivery Wed, Apr 15",
    category: "Laptop",
    brand: "acer",
    condition: "Used",
    hasDiscount: false
  },
  {
    id: "p8",
    title: "Logitech Z623 400 Watt Home Speaker System, 2.1 Speaker System - Black",
    img: "https://m.media-amazon.com/images/I/51iuieCuxSL._AC_UL300_.jpg",
    rating: 4.7,
    reviews: "12,345",
    price: "350,000",
    delivery: "TZS 35,000 delivery Wed, Apr 15",
    category: "PC Speakers",
    brand: "Logitech",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p9",
    title: "Razer BlackShark V2 Pro Wireless Gaming Headset: THX Spatial Audio 7.1 Surround Sound - 50mm Drivers - Detachable Mic - for PC, PS5, PS4, Switch, Black",
    img: "https://m.media-amazon.com/images/I/619bBByro4L._AC_UL300_.jpg",
    rating: 4.5,
    reviews: "8,901",
    price: "320,000",
    delivery: "TZS 30,000 delivery Wed, Apr 15",
    category: "Headset",
    brand: "Razer",
    condition: "New",
    hasDiscount: false
  },
  {
    id: "p10",
    title: "ASUS ROG Swift 27\" OLED Gaming Monitor (PG27AQWP-W) - TrueBlack Glossy Tandem OLED, Dual-Mode (QHD@540Hz, HD@720Hz), 0.02ms, G-SYNC Compatible, Neo Proximity Sensor, DP 2.1, 3 yr Warranty",
    img: "https://m.media-amazon.com/images/I/815FPhAVEpL._AC_UL400_.jpg",
    rating: 4.0,
    reviews: "6",
    price: "2,857,400",
    delivery: "TZS 619,424 delivery Apr 16 - May 4",
    category: "Monitor",
    brand: "ASUS",
    condition: "New",
    hasDiscount: true
  },
  {
    id: "p11",
    title: "SteelSeries Rival 600 Gaming Mouse - 12,000 CPI TrueMove3+ Dual Optical Sensor - 0.5 Lift-off Distance - Weight System - RGB Lighting",
    img: "https://m.media-amazon.com/images/I/51NuotNEd6L._AC_UL300_.jpg",
    rating: 4.4,
    reviews: "4,567",
    price: "180,000",
    delivery: "TZS 25,000 delivery Wed, Apr 15",
    category: "Keyboard & Mouse",
    brand: "SteelSeries",
    condition: "Renewed",
    hasDiscount: true
  },
  {
    id: "p12",
    title: "Corsair HS80 RGB WIRELESS Premium Gaming Headset with Spatial Audio - Carbon",
    img: "https://m.media-amazon.com/images/I/81L7Ck1WgKL._AC_UL300_.jpg",
    rating: 4.3,
    reviews: "1,234",
    price: "280,000",
    delivery: "TZS 30,000 delivery Wed, Apr 15",
    category: "Headset",
    brand: "Corsair",
    condition: "New",
    hasDiscount: false
  }
];

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('irshop_products');
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem('irshop_products', JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

export const addProduct = (product: Omit<Product, 'id'>) => {
  const products = getProducts();
  const newProduct = { ...product, id: 'p' + Date.now() };
  products.push(newProduct);
  localStorage.setItem('irshop_products', JSON.stringify(products));
};

export const getCart = (): CartItem[] => {
  const stored = localStorage.getItem('irshop_cart');
  return stored ? JSON.parse(stored) : [];
};

export const addToCart = (product: Product) => {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('irshop_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart_updated'));
};

export const removeFromCart = (productId: string) => {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('irshop_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart_updated'));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  let cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
  }
  localStorage.setItem('irshop_cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart_updated'));
};

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered';
  date: string;
  shippingAddress?: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  joinDate: string;
}

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem('irshop_orders');
  return stored ? JSON.parse(stored) : [];
};

export const addOrder = (order: Omit<Order, 'id' | 'date'>) => {
  const orders = getOrders();
  const newOrder: Order = {
    ...order,
    id: 'ORD-' + Math.floor(Math.random() * 1000000),
    date: new Date().toISOString().split('T')[0]
  };
  orders.push(newOrder);
  localStorage.setItem('irshop_orders', JSON.stringify(orders));
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']) => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem('irshop_orders', JSON.stringify(orders));
  }
};

export const getUsers = (): User[] => {
  const stored = localStorage.getItem('irshop_users');
  if (stored) return JSON.parse(stored);
  
  // Default users
  const defaultUsers: User[] = [
    { id: 'u1', name: 'Admin User', email: 'admin@irshop.com', role: 'admin', joinDate: '2023-01-15' },
    { id: 'u2', name: 'Test User', email: 'user@example.com', role: 'user', joinDate: '2023-05-20' }
  ];
  localStorage.setItem('irshop_users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

export const deleteProduct = (productId: string) => {
  let products = getProducts();
  products = products.filter(p => p.id !== productId);
  localStorage.setItem('irshop_products', JSON.stringify(products));
};

export const deleteOrder = (orderId: string) => {
  let orders = getOrders();
  orders = orders.filter(o => o.id !== orderId);
  localStorage.setItem('irshop_orders', JSON.stringify(orders));
};

export const deleteUser = (userId: string) => {
  let users = getUsers();
  users = users.filter(u => u.id !== userId);
  localStorage.setItem('irshop_users', JSON.stringify(users));
};

export const clearCart = () => {
  localStorage.setItem('irshop_cart', JSON.stringify([]));
  window.dispatchEvent(new Event('cart_updated'));
};
