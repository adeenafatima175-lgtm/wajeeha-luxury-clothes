import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { BrandLogo } from '../BrandLogo';
import { ProductFormModal } from './ProductFormModal';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tags, 
  Layers, 
  Truck, 
  Receipt, 
  Users, 
  Megaphone, 
  BarChart3, 
  Star, 
  Settings, 
  ExternalLink, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Eye,
  Printer,
  ChevronRight,
  TrendingUp,
  Percent,
  Banknote,
  DollarSign
} from 'lucide-react';
import { AdminSection, OrderStatus, Product, Order } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { 
    products, 
    orders, 
    customers, 
    categories, 
    collections, 
    reviews, 
    coupons, 
    settings,
    adminSection, 
    setAdminSection, 
    setViewMode, 
    formatPrice,
    deleteProduct,
    duplicateProduct,
    updateProduct,
    updateOrderStatus,
    deleteCategory,
    addCategory,
    updateReviewStatus,
    deleteReview,
    addCoupon,
    deleteCoupon,
    updateSettings,
    setLastPlacedOrder
  } = useStore();

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Filters inside Admin
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All');

  // Category creation form
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [newCatImg, setNewCatImg] = useState('/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg');

  // Coupon form
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(15000);

  // Settings form
  const [settingsForm, setSettingsForm] = useState(settings);

  // Order invoice preview
  const [inspectingOrder, setInspectingOrder] = useState<Order | null>(null);

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed').length;
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const filteredProducts = products.filter(p => {
    const matchesCat = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const matchesQuery = p.name.toLowerCase().includes(productSearch.toLowerCase()) || 
                         p.sku.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const filteredOrders = orders.filter(o => {
    return orderStatusFilter === 'All' || o.orderStatus === orderStatusFilter;
  });

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProductModalOpen(true);
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    addCategory({
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/\s+/g, '-'),
      image: newCatImg,
      description: newCatDesc
    });
    setNewCatName('');
    setNewCatDesc('');
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minOrder: Number(newCouponMin),
      active: true,
      usageCount: 0
    });
    setNewCouponCode('');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  const menuItems: { id: AdminSection; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products & Inventory', icon: ShoppingBag },
    { id: 'categories', label: 'Categories & Curations', icon: Tags },
    { id: 'orders', label: 'Orders & Fulfillment', icon: Truck },
    { id: 'billing', label: 'Billing & Invoices', icon: Receipt },
    { id: 'customers', label: 'Customer CRM', icon: Users },
    { id: 'marketing', label: 'Marketing & Coupons', icon: Megaphone },
    { id: 'analytics', label: 'Sales Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col md:flex-row text-stone-900 font-sans-modern">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#1A1815] text-[#FAF9F5] flex flex-col justify-between shrink-0 border-r border-stone-800">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-stone-800/80 flex items-center justify-between">
            <div>
              <span className="font-serif-luxury text-lg tracking-[0.2em] font-medium text-white uppercase block">
                WAJEEHA
              </span>
              <span className="text-[10px] text-[#D4AF37] uppercase tracking-[0.3em] font-semibold">
                Admin Console
              </span>
            </div>
            
            <button
              onClick={() => setViewMode('store')}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 rounded text-stone-300 hover:text-white transition-colors"
              title="Return to storefront"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setAdminSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs'
                      : 'text-stone-300 hover:bg-stone-800/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switcher */}
        <div className="p-4 border-t border-stone-800">
          <button
            onClick={() => setViewMode('store')}
            className="w-full py-2.5 px-3 bg-stone-800/80 hover:bg-stone-700 text-[#FAF9F5] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Live Storefront</span>
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Control Bar */}
        <header className="bg-white border-b border-[#E5DFD1] px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h1 className="font-serif-luxury text-xl sm:text-2xl font-medium text-stone-900 capitalize">
              {menuItems.find(m => m.id === adminSection)?.label || adminSection}
            </h1>
            <span className="text-[11px] text-stone-500 font-sans-modern">
              WAJEEHA Luxury Pret Management Suite · Autumn / Winter 2026
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('store')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F6F3EB] hover:bg-[#ECE6DA] text-stone-800 rounded text-xs font-semibold tracking-wider uppercase transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#9A7B38]" />
              <span>Visit Storefront</span>
            </button>

            <button
              onClick={handleCreateProduct}
              className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold tracking-wider uppercase shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Add Garment</span>
            </button>
          </div>
        </header>

        {/* Section Router */}
        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          
          {/* 1. DASHBOARD OVERVIEW */}
          {adminSection === 'dashboard' && (
            <div className="space-y-6">
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Total Sales
                    </span>
                    <span className="font-serif-luxury text-2xl font-bold text-stone-900 tabular-nums">
                      {formatPrice(totalRevenue)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +18.4% this month
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#9A7B38]">
                    <Banknote className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Total Orders
                    </span>
                    <span className="font-serif-luxury text-2xl font-bold text-stone-900 tabular-nums">
                      {orders.length}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-1">
                      {pendingOrders} awaiting fulfillment
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-700">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Active Garments
                    </span>
                    <span className="font-serif-luxury text-2xl font-bold text-stone-900 tabular-nums">
                      {products.length}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-1">
                      Across {categories.length} categories
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-700">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 block mb-1">
                      Average Order Value
                    </span>
                    <span className="font-serif-luxury text-2xl font-bold text-stone-900 tabular-nums">
                      {formatPrice(averageOrderValue)}
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-1">
                      High-ticket luxury prêt
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                    <Percent className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-base font-semibold text-stone-900">
                      Recent Orders
                    </h3>
                    <p className="text-xs text-stone-500">Live order queue and shipment dispatches</p>
                  </div>
                  <button
                    onClick={() => setAdminSection('orders')}
                    className="text-xs font-semibold text-[#9A7B38] hover:underline"
                  >
                    View All Orders
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Order ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Destination</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Quick Update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 tabular-nums">
                      {orders.slice(0, 5).map(ord => (
                        <tr key={ord.id} className="hover:bg-stone-50/60 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-stone-900">{ord.orderNumber}</td>
                          <td className="py-3 px-4 font-medium text-stone-900">{ord.customer.fullName}</td>
                          <td className="py-3 px-4 text-stone-600">{ord.customer.city}</td>
                          <td className="py-3 px-4 font-semibold text-stone-900">{formatPrice(ord.total)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              ord.orderStatus === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              ord.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              ord.orderStatus === 'Processing' ? 'bg-amber-100 text-amber-800' :
                              'bg-stone-100 text-stone-800'
                            }`}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <select
                              value={ord.orderStatus}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="px-2 py-1 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Best Selling Spotlight */}
              <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
                <h3 className="font-serif-luxury text-base font-semibold text-stone-900 mb-4">
                  High-Demand Runway Ensembles
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4).map(prod => (
                    <div key={prod.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex gap-3">
                      <img src={prod.images[0]} alt={prod.name} referrerPolicy="no-referrer" className="w-14 h-18 object-cover rounded bg-stone-200 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="font-serif-luxury font-medium text-stone-900 block truncate">{prod.name}</span>
                        <span className="text-[11px] text-stone-500">{prod.pieces} · {prod.category}</span>
                        <span className="text-xs font-bold text-stone-900 block mt-1 tabular-nums">{formatPrice(prod.salePrice ?? prod.price)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS & INVENTORY */}
          {adminSection === 'products' && (
            <div className="space-y-4">
              {/* Product Search & Filter Strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search garments by title or SKU..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 border border-stone-200 rounded text-xs text-stone-900 focus:outline-none focus:border-stone-900"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                  >
                    <option value="All">All Categories ({products.length})</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>

                  <button
                    onClick={handleCreateProduct}
                    className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-stone-800"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Add Garment</span>
                  </button>
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Garment</th>
                        <th className="py-3 px-4">SKU</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {filteredProducts.map(prod => (
                        <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img src={prod.images[0]} alt={prod.name} referrerPolicy="no-referrer" className="w-10 h-12 object-cover rounded bg-stone-100 shrink-0" />
                            <div className="min-w-0">
                              <span className="font-serif-luxury font-medium text-stone-900 block truncate">{prod.name}</span>
                              <span className="text-[10px] text-stone-500">{prod.pieces} · {prod.fabric}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono font-medium text-stone-600">{prod.sku}</td>
                          <td className="py-3 px-4 text-stone-700">{prod.category}</td>
                          <td className="py-3 px-4 font-semibold text-stone-900 tabular-nums">
                            {formatPrice(prod.salePrice ?? prod.price)}
                            {prod.salePrice && <span className="text-[10px] text-stone-400 line-through block">{formatPrice(prod.price)}</span>}
                          </td>
                          <td className="py-3 px-4 tabular-nums font-medium text-stone-800">
                            {prod.stockQuantity} units
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => updateProduct(prod.id, { inStock: !prod.inStock })}
                              className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                                prod.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {prod.inStock ? 'In Stock' : 'Out of Stock'}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => handleEditProduct(prod)}
                              className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded"
                              title="Edit Garment"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => duplicateProduct(prod.id)}
                              className="p-1.5 text-stone-600 hover:text-stone-950 hover:bg-stone-100 rounded"
                              title="Duplicate Garment"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProduct(prod.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                              title="Delete Garment"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. CATEGORIES & CURATIONS */}
          {adminSection === 'categories' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Category List */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
                <h3 className="font-serif-luxury text-base font-semibold text-stone-900">
                  Active Storefront Categories ({categories.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex gap-3 items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={cat.image} alt={cat.name} referrerPolicy="no-referrer" className="w-12 h-12 object-cover rounded-lg bg-stone-200" />
                        <div>
                          <h4 className="font-semibold text-stone-900 text-xs">{cat.name}</h4>
                          <span className="text-[10px] text-stone-500">{cat.productCount} items linked</span>
                        </div>
                      </div>

                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add New Category */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
                <h3 className="font-serif-luxury text-base font-semibold text-stone-900 mb-4">
                  Add New Category
                </h3>

                <form onSubmit={handleAddCategorySubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Category Name</label>
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Bridal Lehengas"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Description</label>
                    <textarea
                      value={newCatDesc}
                      onChange={(e) => setNewCatDesc(e.target.value)}
                      placeholder="Short editorial summary"
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 h-20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Image URL / Path</label>
                    <input
                      type="text"
                      value={newCatImg}
                      onChange={(e) => setNewCatImg(e.target.value)}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono text-[11px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold uppercase tracking-wider text-xs transition-colors"
                  >
                    Save Category
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 4. ORDERS & FULFILLMENT */}
          {adminSection === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-500">Filter by Order Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-1.5 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                  >
                    <option value="All">All Statuses ({orders.length})</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Customer & City</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">Total</th>
                      <th className="py-3 px-4">Payment</th>
                      <th className="py-3 px-4">Order Status</th>
                      <th className="py-3 px-4 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filteredOrders.map(ord => (
                      <tr key={ord.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">{ord.orderNumber}</td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-stone-900 block">{ord.customer.fullName}</span>
                          <span className="text-[11px] text-stone-500">{ord.customer.city} · {ord.customer.phone}</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-stone-800">{ord.items.length} garments</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-stone-950 tabular-nums">{formatPrice(ord.total)}</td>
                        <td className="py-3 px-4">
                          <span className="block font-medium text-stone-900">{ord.paymentMethod}</span>
                          <span className="text-[10px] text-stone-500">Status: {ord.paymentStatus}</span>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="px-2 py-1 border border-stone-200 rounded text-xs text-stone-800 bg-white"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setLastPlacedOrder(ord)}
                            className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1 ml-auto"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Invoice</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. BILLING & INVOICES */}
          {adminSection === 'billing' && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-medium text-stone-900">
                  Billing, Invoices & Accounts Receivable
                </h3>
                <p className="text-xs text-stone-500 font-sans-modern">
                  Official generated sales receipts with WAJEEHA tax identification and courier track records.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Invoice #</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Billed To</th>
                      <th className="py-3 px-4">Payment Method</th>
                      <th className="py-3 px-4">Net Total</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 tabular-nums">
                    {orders.map(ord => (
                      <tr key={ord.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-mono font-bold text-stone-900">INV-{ord.orderNumber}</td>
                        <td className="py-3 px-4 text-stone-600">{new Date(ord.createdAt).toLocaleDateString()}</td>
                        <td className="py-3 px-4 font-medium text-stone-900">{ord.customer.fullName}</td>
                        <td className="py-3 px-4 text-stone-700">{ord.paymentMethod}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">{formatPrice(ord.total)}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => setLastPlacedOrder(ord)}
                            className="px-3 py-1 bg-stone-900 text-white rounded text-[11px] font-semibold uppercase tracking-wider hover:bg-stone-800"
                          >
                            Print Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 6. CUSTOMER CRM */}
          {adminSection === 'customers' && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="font-serif-luxury text-lg font-medium text-stone-900">
                  Registered Clients & VIP Circle
                </h3>
                <p className="text-xs text-stone-500">Loyalty profiles, lifetime order values, and direct contact details.</p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 text-stone-500 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Customer Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Orders</th>
                      <th className="py-3 px-4">Lifetime Spend</th>
                      <th className="py-3 px-4">Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 tabular-nums">
                    {customers.map(c => (
                      <tr key={c.id} className="hover:bg-stone-50">
                        <td className="py-3 px-4 font-semibold text-stone-900">{c.fullName}</td>
                        <td className="py-3 px-4 text-stone-600 font-sans-modern">{c.email}</td>
                        <td className="py-3 px-4 font-mono text-stone-700">{c.phone}</td>
                        <td className="py-3 px-4 text-stone-700">{c.city}</td>
                        <td className="py-3 px-4 font-medium text-stone-900">{c.totalOrders}</td>
                        <td className="py-3 px-4 font-bold text-stone-900">{formatPrice(c.totalSpent)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            c.status === 'VIP' ? 'bg-[#C5A059]/20 text-[#8C7A58]' : 'bg-stone-100 text-stone-700'
                          }`}>
                            {c.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. MARKETING & DISCOUNTS */}
          {adminSection === 'marketing' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Active Coupons List */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-stone-200 p-5 shadow-xs space-y-4">
                <h3 className="font-serif-luxury text-base font-semibold text-stone-900">
                  Active Discount Coupons & Campaigns
                </h3>

                <div className="space-y-3">
                  {coupons.map(coupon => (
                    <div key={coupon.code} className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-stone-900 bg-white px-2 py-0.5 rounded border border-stone-300">
                            {coupon.code}
                          </span>
                          <span className="text-emerald-700 font-bold">{coupon.discountPercent}% OFF</span>
                        </div>
                        <span className="text-[11px] text-stone-500 mt-1 block">
                          Min. Order: Rs. {coupon.minOrder.toLocaleString()} · Used {coupon.usageCount} times
                        </span>
                      </div>

                      <button
                        onClick={() => deleteCoupon(coupon.code)}
                        className="text-stone-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Coupon Form */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-stone-200 p-5 shadow-xs">
                <h3 className="font-serif-luxury text-base font-semibold text-stone-900 mb-4">
                  Create Promotional Code
                </h3>

                <form onSubmit={handleAddCouponSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Coupon Code</label>
                    <input
                      type="text"
                      value={newCouponCode}
                      onChange={(e) => setNewCouponCode(e.target.value)}
                      placeholder="e.g. EID2026"
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 uppercase font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Discount (%)</label>
                    <input
                      type="number"
                      value={newCouponDiscount}
                      onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                      min={1}
                      max={70}
                      required
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Minimum Order (PKR)</label>
                    <input
                      type="number"
                      value={newCouponMin}
                      onChange={(e) => setNewCouponMin(Number(e.target.value))}
                      step={500}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold uppercase tracking-wider text-xs"
                  >
                    Activate Coupon
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 8. SALES ANALYTICS */}
          {adminSection === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                  <h4 className="font-serif-luxury text-sm font-semibold text-stone-900 mb-2">Category Sales Share</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span>Festive Collection</span><strong>42%</strong></div>
                    <div className="flex justify-between"><span>Luxury Pret</span><strong>31%</strong></div>
                    <div className="flex justify-between"><span>Formals & Velvet</span><strong>18%</strong></div>
                    <div className="flex justify-between"><span>Unstitched</span><strong>9%</strong></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                  <h4 className="font-serif-luxury text-sm font-semibold text-stone-900 mb-2">Payment Preferences</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span>Cash on Delivery (COD)</span><strong>54%</strong></div>
                    <div className="flex justify-between"><span>Online Credit/Debit Card</span><strong>28%</strong></div>
                    <div className="flex justify-between"><span>Direct Bank IBFT</span><strong>18%</strong></div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs">
                  <h4 className="font-serif-luxury text-sm font-semibold text-stone-900 mb-2">Top Cities by Volume</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span>Lahore</span><strong>38%</strong></div>
                    <div className="flex justify-between"><span>Karachi</span><strong>32%</strong></div>
                    <div className="flex justify-between"><span>Islamabad / Rawalpindi</span><strong>22%</strong></div>
                    <div className="flex justify-between"><span>Other Cities</span><strong>8%</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 9. REVIEWS MODERATION */}
          {adminSection === 'reviews' && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-4">
              <h3 className="font-serif-luxury text-lg font-medium text-stone-900">
                Customer Reviews & Testimonials Moderation
              </h3>

              <div className="space-y-3">
                {reviews.map(rev => (
                  <div key={rev.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-stone-900">{rev.customerName}</span>
                        <span className="text-stone-400">·</span>
                        <span className="text-stone-600 font-serif-luxury">{rev.productName}</span>
                      </div>
                      <div className="flex items-center text-[#D4AF37]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>

                    <p className="text-stone-700 italic">"{rev.comment}"</p>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        rev.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {rev.status}
                      </span>

                      <div className="space-x-2">
                        {rev.status !== 'Approved' && (
                          <button
                            onClick={() => updateReviewStatus(rev.id, 'Approved')}
                            className="text-emerald-700 hover:underline font-semibold"
                          >
                            Approve
                          </button>
                        )}
                        <button
                          onClick={() => deleteReview(rev.id)}
                          className="text-rose-600 hover:underline font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. STORE SETTINGS */}
          {adminSection === 'settings' && (
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs max-w-2xl">
              <h3 className="font-serif-luxury text-lg font-medium text-stone-900 mb-4">
                Store Configurations & Payment Settings
              </h3>

              <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.storeName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">WhatsApp Concierge #</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Free Delivery Threshold (PKR)</label>
                    <input
                      type="number"
                      value={settingsForm.freeShippingThreshold}
                      onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 font-medium mb-1">Standard Courier Fee (PKR)</label>
                    <input
                      type="number"
                      value={settingsForm.standardShippingRate}
                      onChange={(e) => setSettingsForm({ ...settingsForm, standardShippingRate: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 tabular-nums"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100">
                  <span className="font-bold uppercase tracking-wider text-stone-800 text-[11px] block mb-2">
                    Bank IBFT Transfer Details
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={settingsForm.bankDetails.bankName}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          bankDetails: { ...settingsForm.bankDetails, bankName: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-medium mb-1">Account Title</label>
                      <input
                        type="text"
                        value={settingsForm.bankDetails.accountTitle}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          bankDetails: { ...settingsForm.bankDetails, accountTitle: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="block text-stone-700 font-medium mb-1">Account Number / IBAN</label>
                      <input
                        type="text"
                        value={settingsForm.bankDetails.iban}
                        onChange={(e) => setSettingsForm({
                          ...settingsForm,
                          bankDetails: { ...settingsForm.bankDetails, iban: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded font-semibold uppercase tracking-wider text-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={productModalOpen}
        onClose={() => setProductModalOpen(false)}
        productToEdit={editingProduct}
      />

    </div>
  );
};
