import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductColor, ProductVariation, ProductSpecs } from '../../types';
import { X, Plus, Trash2 } from 'lucide-react';

interface ProductFormModalProps {
  productToEdit?: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProductFormData {
  name: string;
  subtitle: string;
  price: number;
  salePrice: number;
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
  videoUrl: string;
  colors: ProductColor[];
  sizes: ProductVariation[];
  specifications: ProductSpecs;
}

export const ProductFormModal: React.FC<ProductFormModalProps> = ({
  productToEdit,
  isOpen,
  onClose
}) => {
  const { addProduct, updateProduct, categories, collections } = useStore();

  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    subtitle: '',
    price: 15000,
    salePrice: 0,
    sku: '',
    category: 'Luxury Pret',
    collection: 'Festive Pret 2026',
    description: '',
    fabric: 'Pure Raw Silk & Organza',
    pieces: '3 Piece',
    fit: 'Tailored Smart Fit',
    care: 'Dry Clean Only',
    inStock: true,
    stockQuantity: 20,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    rating: 5.0,
    reviewCount: 0,
    images: ['/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'],
    videoUrl: '',
    colors: [
      { name: 'Mauve Rose', hex: '#C49E9E', inStock: true },
      { name: 'Champagne Gold', hex: '#D7C49E', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 2 }
    ],
    specifications: {
      fabricDetails: 'Pure fabric with fine gold tilla threadwork',
      shirtLength: '45 Inches',
      dupatta: '2.5 Metres Embroidered Organza',
      trouser: 'Stitched raw silk trousers',
      embroidery: 'Hand tilla and sitara embellishments'
    }
  });

  const [imageUrlInput, setImageUrlInput] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name,
        subtitle: productToEdit.subtitle,
        price: productToEdit.price,
        salePrice: productToEdit.salePrice || 0,
        sku: productToEdit.sku,
        category: productToEdit.category,
        collection: productToEdit.collection,
        description: productToEdit.description,
        fabric: productToEdit.fabric,
        pieces: productToEdit.pieces,
        fit: productToEdit.fit,
        care: productToEdit.care,
        inStock: productToEdit.inStock,
        stockQuantity: productToEdit.stockQuantity,
        isFeatured: productToEdit.isFeatured,
        isNew: productToEdit.isNew,
        isBestSeller: productToEdit.isBestSeller,
        rating: productToEdit.rating,
        reviewCount: productToEdit.reviewCount,
        images: productToEdit.images,
        videoUrl: productToEdit.videoUrl || '',
        colors: productToEdit.colors,
        sizes: productToEdit.sizes,
        specifications: productToEdit.specifications
      });
    } else {
      // Reset
      setFormData({
        name: '',
        subtitle: '',
        price: 18000,
        salePrice: 0,
        sku: `WJH-${Math.floor(100 + Math.random() * 900)}`,
        category: categories[0]?.name || 'Luxury Pret',
        collection: collections[0]?.name || 'Festive Pret 2026',
        description: '',
        fabric: 'Pure Crinkle Chiffon & Silk',
        pieces: '3 Piece',
        fit: 'Regular Tailored Fit',
        care: 'Specialist Dry Clean Only',
        inStock: true,
        stockQuantity: 15,
        isFeatured: false,
        isNew: true,
        isBestSeller: false,
        rating: 5.0,
        reviewCount: 0,
        images: ['/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'],
        videoUrl: '',
        colors: [
          { name: 'Mauve Rose', hex: '#C49E9E', inStock: true },
          { name: 'Ivory Cream', hex: '#FAF5EB', inStock: true }
        ],
        sizes: [
          { size: 'XS', stock: 3 },
          { size: 'S', stock: 5 },
          { size: 'M', stock: 5 },
          { size: 'L', stock: 2 }
        ],
        specifications: {
          fabricDetails: 'Pure fabric with fine tilla work',
          shirtLength: '44 Inches',
          dupatta: '2.5 Meters Embroidered Chiffon',
          trouser: 'Raw Silk Trouser',
          embroidery: 'Handmade dabka and tilla'
        }
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSpecChange = (field: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [field]: val
      }
    }));
  };

  const handleAddImage = () => {
    if (imageUrlInput.trim()) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageUrlInput.trim()] }));
      setImageUrlInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productPayload = {
      ...formData,
      salePrice: formData.salePrice > 0 ? formData.salePrice : undefined
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-xs transition-opacity"
        onClick={onClose} 
      />

      <div className="relative bg-[#FAF9F5] rounded-2xl shadow-2xl max-w-4xl w-full border border-stone-200 overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-white flex items-center justify-between">
          <div>
            <h3 className="font-serif-luxury text-xl font-medium text-stone-900">
              {productToEdit ? 'Edit Garment Listing' : 'Add New Luxury Garment'}
            </h3>
            <span className="text-xs text-stone-500 font-sans-modern">
              WAJEEHA Inventory & Variation Catalog
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto text-xs">
          
          {/* Section 1: General Info */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 text-[11px] pb-1 border-b border-stone-200">
              1. Basic Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Gul-e-Noor Embroidered Chiffon Peshwas"
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">Short Subtitle / Tagline</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="e.g. Hand-embellished with gold zardozi and sequins"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Collection</label>
                <select
                  name="collection"
                  value={formData.collection}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                >
                  {collections.map(col => (
                    <option key={col.id} value={col.name}>{col.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">SKU / Code *</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Pieces / Silhouette *</label>
                <select
                  name="pieces"
                  value={formData.pieces}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 focus:outline-none focus:border-stone-900 bg-white"
                >
                  <option value="1 Piece">1 Piece</option>
                  <option value="2 Piece">2 Piece</option>
                  <option value="3 Piece">3 Piece</option>
                  <option value="Unstitched">Unstitched</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Inventory */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 text-[11px] pb-1 border-b border-stone-200">
              2. Pricing & Stock
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Regular Price (PKR) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min={100}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Sale / Discount Price (Optional)</label>
                <input
                  type="number"
                  name="salePrice"
                  value={formData.salePrice}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Stock Quantity</label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="rounded text-stone-900"
                />
                <span>In Stock</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="rounded text-stone-900"
                />
                <span>Featured on Homepage</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="rounded text-stone-900"
                />
                <span>New Arrival Tag</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isBestSeller"
                  checked={formData.isBestSeller}
                  onChange={handleChange}
                  className="rounded text-stone-900"
                />
                <span>Bestseller Tag</span>
              </label>
            </div>
          </div>

          {/* Section 3: Fabrics & Specs */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 text-[11px] pb-1 border-b border-stone-200">
              3. Fabric & Tailoring Specifications
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-medium mb-1">Fabric Title</label>
                <input
                  type="text"
                  name="fabric"
                  value={formData.fabric}
                  onChange={handleChange}
                  placeholder="e.g. Pure Crinkle Chiffon & Silk"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Fit Type</label>
                <input
                  type="text"
                  name="fit"
                  value={formData.fit}
                  onChange={handleChange}
                  placeholder="e.g. Kalidar Peshwas with tailored bodice"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Shirt Length</label>
                <input
                  type="text"
                  value={formData.specifications.shirtLength}
                  onChange={(e) => handleSpecChange('shirtLength', e.target.value)}
                  placeholder="e.g. 48 Inches"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">Dupatta Details</label>
                <input
                  type="text"
                  value={formData.specifications.dupatta}
                  onChange={(e) => handleSpecChange('dupatta', e.target.value)}
                  placeholder="e.g. 2.75 Yards Embroidered Organza"
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-stone-700 font-medium mb-1">Full Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Detailed artisanal craft description..."
                  className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Images & Media */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-stone-800 text-[11px] pb-1 border-b border-stone-200">
              4. Media & Runway Video
            </h4>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter image URL or local asset path"
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-stone-900 text-white rounded font-semibold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto py-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-24 rounded-lg overflow-hidden border border-stone-300 shrink-0 group">
                  <img src={img} alt="Product view" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute inset-0 bg-stone-950/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                  </button>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-stone-700 font-medium mb-1">Runway Video URL (Optional)</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://... MP4 link or fashion reel"
                className="w-full px-3 py-2 border border-stone-300 rounded text-stone-900 font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded font-semibold uppercase tracking-wider text-[11px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-950 hover:bg-[#C5A059] hover:text-stone-950 text-white rounded font-semibold uppercase tracking-wider text-[11px] transition-colors"
            >
              {productToEdit ? 'Save Changes' : 'Publish Garment'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
