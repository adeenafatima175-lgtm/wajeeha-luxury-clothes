export type CurrencyCode = 'PKR' | 'USD' | 'AED' | 'GBP';

export interface ProductVariation {
  size: string;
  stock: number;
}

export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface ProductSpecs {
  fabricDetails: string;
  shirtLength: string;
  dupatta: string;
  trouser: string;
  embroidery: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in PKR
  salePrice?: number;
  sku: string;
  category: string;
  collection: string;
  description: string;
  fabric: string;
  pieces: '1 Piece' | '2 Piece' | '3 Piece' | 'Unstitched';
  fit: string;
  care: string;
  inStock: boolean;
  stockQuantity: number;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  rating: number;
  reviewCount: number;
  images: string[];
  videoUrl?: string;
  colors: ProductColor[];
  sizes: ProductVariation[];
  specifications: ProductSpecs;
  createdAt: string;
}

export interface CartItem {
  id: string; // unique item key e.g. productId-size-color
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  sku: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
export type PaymentMethod = 'COD' | 'Bank Transfer' | 'Online Card';
export type PaymentStatus = 'Paid' | 'Pending' | 'Unpaid';

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courier?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  registeredDate: string;
  totalOrders: number;
  totalSpent: number;
  status: 'VIP' | 'Regular' | 'New';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
  description: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string;
  image: string;
  description: string;
  active: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  minOrder: number;
  active: boolean;
  usageCount: number;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
  whatsappNumber: string;
  freeShippingThreshold: number;
  standardShippingRate: number;
  expressShippingRate: number;
  bankDetails: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    iban: string;
  };
}

export type AdminSection = 
  | 'dashboard' 
  | 'products' 
  | 'categories' 
  | 'collections' 
  | 'variations' 
  | 'orders' 
  | 'billing' 
  | 'customers' 
  | 'marketing' 
  | 'analytics' 
  | 'reviews' 
  | 'settings';
