import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Product, 
  Category, 
  Collection, 
  Order, 
  Customer, 
  Review, 
  Coupon, 
  StoreSettings, 
  CartItem, 
  CurrencyCode, 
  AdminSection,
  OrderStatus 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_COLLECTIONS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_REVIEWS, 
  INITIAL_COUPONS, 
  INITIAL_SETTINGS 
} from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface StoreContextType {
  // Store Data
  products: Product[];
  categories: Category[];
  collections: Collection[];
  orders: Order[];
  customers: Customer[];
  reviews: Review[];
  coupons: Coupon[];
  settings: StoreSettings;
  
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartShipping: number;
  cartDiscount: number;
  cartTotal: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // Wishlist
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Currency & Formatting
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInPKR: number) => string;
  
  // Navigation & Modals
  viewMode: 'store' | 'admin';
  setViewMode: (mode: 'store' | 'admin') => void;
  adminSection: AdminSection;
  setAdminSection: (section: AdminSection) => void;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  detailProduct: Product | null;
  setDetailProduct: (product: Product | null) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  
  // Customer Filter State
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Admin Operations
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courier?: string) => void;
  addCategory: (category: Omit<Category, 'id' | 'productCount'>) => void;
  deleteCategory: (id: string) => void;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;
  submitReview: (productId: string, productName: string, customerName: string, rating: number, comment: string) => void;
  updateReviewStatus: (reviewId: string, status: 'Approved' | 'Rejected') => void;
  deleteReview: (reviewId: string) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  
  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Conversion rates against PKR
const CURRENCY_RATES: Record<CurrencyCode, { rate: number; symbol: string; prefix: string }> = {
  PKR: { rate: 1, symbol: 'Rs. ', prefix: 'Rs. ' },
  USD: { rate: 0.0036, symbol: '$', prefix: '$' },
  AED: { rate: 0.0132, symbol: 'AED ', prefix: 'AED ' },
  GBP: { rate: 0.0028, symbol: '£', prefix: '£' }
};

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state or fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('wajeeha_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('wajeeha_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('wajeeha_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('wajeeha_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('wajeeha_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('wajeeha_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('wajeeha_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('wajeeha_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('wajeeha_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('wajeeha_wishlist');
    return saved ? JSON.parse(saved) : ['prod-001', 'prod-003'];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>('PKR');
  const [viewMode, setViewMode] = useState<'store' | 'admin'>('store');
  const [adminSection, setAdminSection] = useState<AdminSection>('dashboard');
  
  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('wajeeha_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('wajeeha_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('wajeeha_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wajeeha_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    const priceToUse = product.salePrice ?? product.price;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: priceToUse,
            salePrice: product.salePrice,
            image: product.images[0] || '',
            size,
            color,
            quantity,
            sku: product.sku
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${size}, ${color}) to your shopping bag.`);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
    showToast('Item removed from shopping bag.', 'info');
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartShipping = cartSubtotal >= settings.freeShippingThreshold || cartSubtotal === 0 
    ? 0 
    : settings.standardShippingRate;

  const cartDiscount = appliedCoupon ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string): boolean => {
    const cleanedCode = code.trim().toUpperCase();
    const found = coupons.find(c => c.code.toUpperCase() === cleanedCode && c.active);
    if (!found) {
      showToast('Invalid or expired coupon code.', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Coupon requires a minimum order of Rs. ${found.minOrder.toLocaleString()}.`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon applied! ${found.discountPercent}% discount activated.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from wishlist.', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Saved to your wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Price formatting
  const formatPrice = (amountInPKR: number): string => {
    const config = CURRENCY_RATES[currency];
    const converted = amountInPKR * config.rate;
    if (currency === 'PKR') {
      return `Rs. ${Math.round(converted).toLocaleString()}`;
    }
    return `${config.prefix}${converted.toFixed(2)}`;
  };

  // Admin Actions
  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [product, ...prev]);
    showToast(`Product "${product.name}" created successfully.`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    showToast('Product updated successfully.');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from inventory.', 'info');
  };

  const duplicateProduct = (id: string) => {
    const existing = products.find(p => p.id === id);
    if (!existing) return;
    const duplicated: Product = {
      ...existing,
      id: `prod-${Date.now()}`,
      name: `${existing.name} (Copy)`,
      sku: `${existing.sku}-CPY`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [duplicated, ...prev]);
    showToast(`Duplicated "${existing.name}".`);
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `WJH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      trackingNumber: `TCS-PK-${Math.floor(1000000 + Math.random() * 9000000)}`,
      courier: 'TCS Express'
    };

    setOrders(prev => [newOrder, ...prev]);

    // Check or update customer
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === newOrder.customer.email.toLowerCase());
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          totalOrders: c.totalOrders + 1,
          totalSpent: c.totalSpent + newOrder.total,
          status: c.totalOrders + 1 >= 3 ? 'VIP' : 'Regular'
        } : c);
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          fullName: newOrder.customer.fullName,
          email: newOrder.customer.email,
          phone: newOrder.customer.phone,
          city: newOrder.customer.city,
          registeredDate: new Date().toISOString().split('T')[0],
          totalOrders: 1,
          totalSpent: newOrder.total,
          status: 'New'
        };
        return [newCustomer, ...prev];
      }
    });

    clearCart();
    setLastPlacedOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string, courier?: string) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          orderStatus: status,
          paymentStatus: status === 'Delivered' ? 'Paid' : ord.paymentStatus,
          ...(trackingNumber ? { trackingNumber } : {}),
          ...(courier ? { courier } : {})
        };
      }
      return ord;
    }));
    showToast(`Order status updated to "${status}".`);
  };

  const addCategory = (categoryData: Omit<Category, 'id' | 'productCount'>) => {
    const id = `cat-${Date.now()}`;
    const newCat: Category = {
      ...categoryData,
      id,
      productCount: 0
    };
    setCategories(prev => [...prev, newCat]);
    showToast(`Category "${newCat.name}" added.`);
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    showToast('Category deleted.', 'info');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings saved successfully.');
  };

  const submitReview = (productId: string, productName: string, customerName: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName,
      customerName,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment,
      verifiedPurchase: true,
      status: 'Approved'
    };
    setReviews(prev => [newRev, ...prev]);
    showToast('Thank you! Your review has been submitted and published.');
  };

  const updateReviewStatus = (reviewId: string, status: 'Approved' | 'Rejected') => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status } : r));
    showToast(`Review marked as ${status}.`);
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast('Review removed.', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    showToast(`Coupon ${coupon.code} created.`);
  };

  const deleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
    showToast(`Coupon ${code} removed.`, 'info');
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      collections,
      orders,
      customers,
      reviews,
      coupons,
      settings,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartSubtotal,
      cartShipping,
      cartDiscount,
      cartTotal,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      wishlist,
      toggleWishlist,
      isInWishlist,
      currency,
      setCurrency,
      formatPrice,
      viewMode,
      setViewMode,
      adminSection,
      setAdminSection,
      isCartOpen,
      setIsCartOpen,
      isWishlistOpen,
      setIsWishlistOpen,
      isSearchOpen,
      setIsSearchOpen,
      isSizeGuideOpen,
      setIsSizeGuideOpen,
      isCheckoutOpen,
      setIsCheckoutOpen,
      isAccountOpen,
      setIsAccountOpen,
      quickViewProduct,
      setQuickViewProduct,
      detailProduct,
      setDetailProduct,
      lastPlacedOrder,
      setLastPlacedOrder,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      addProduct,
      updateProduct,
      deleteProduct,
      duplicateProduct,
      createOrder,
      updateOrderStatus,
      addCategory,
      deleteCategory,
      updateSettings,
      submitReview,
      updateReviewStatus,
      deleteReview,
      addCoupon,
      deleteCoupon,
      toasts,
      showToast,
      dismissToast
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
