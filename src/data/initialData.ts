import { Product, Category, Collection, Order, Customer, Review, Coupon, StoreSettings } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Gul-e-Noor Embroidered Chiffon Peshwas',
    subtitle: 'Hand-embellished with gold zardozi, sequins, and organza dupatta',
    price: 24500,
    salePrice: 21999,
    sku: 'WJH-FES-001',
    category: 'Festive Collection',
    collection: 'Festive Pret 2026',
    description: 'A regal kalidar peshwas crafted on pure crinkle chiffon in a delicate mauve dusty-rose palette. Features exquisite gold tilla, sequin sprays, and hand-embroidered neckline borders paired with a voluminous raw silk trouser and embroidered scalloped dupatta.',
    fabric: 'Pure Crinkle Chiffon & Raw Silk',
    pieces: '3 Piece',
    fit: 'Relaxed Kalidar Fit with Tailored Bodice',
    care: 'Dry Clean Only. Steam iron on low heat. Store in garment bag.',
    inStock: true,
    stockQuantity: 18,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 38,
    images: [
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
      '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-pink-dress-walking-41484-large.mp4',
    colors: [
      { name: 'Mauve Rose', hex: '#C49E9E', inStock: true },
      { name: 'Champagne Gold', hex: '#D7C49E', inStock: true },
      { name: 'Ivory Cream', hex: '#F4EFE6', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 3 },
      { size: 'S', stock: 6 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 1 }
    ],
    specifications: {
      fabricDetails: 'Pure crinkle chiffon shirt with raw silk trousers and organza dupatta.',
      shirtLength: '52 Inches',
      dupatta: '2.75 Yards Embroidered Organza with scalloped borders',
      trouser: 'Pure raw silk cigarette pant (38 inches)',
      embroidery: 'Gold Zari, Tilla, Marori and Sequins with hand-attached pearl drops'
    },
    createdAt: '2026-09-15'
  },
  {
    id: 'prod-002',
    name: 'Emerald Zari Organza Ensemble',
    subtitle: 'Opulent festive green kurta with straight pants and cutwork dupatta',
    price: 18900,
    sku: 'WJH-LPR-002',
    category: 'Luxury Pret',
    collection: 'Royal Heritage 2026',
    description: 'Make a graceful statement in deep emerald green. This luxury pret kurta features intricate floral vine embroidery in antique dull gold with organza border cutwork and tailored cigarette pants.',
    fabric: 'Fine Organza & Cotton Silk Lining',
    pieces: '3 Piece',
    fit: 'Contemporary Straight Cut',
    care: 'Dry clean recommended. Do not bleach. Protect embellishments while pressing.',
    inStock: true,
    stockQuantity: 24,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    rating: 4.8,
    reviewCount: 24,
    images: [
      '/src/assets/images/wajeeha_luxury_pret_model_1791435683519.jpg',
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'
    ],
    colors: [
      { name: 'Emerald Green', hex: '#1C4A3A', inStock: true },
      { name: 'Teal Peacock', hex: '#184E5A', inStock: false },
      { name: 'Olive Gold', hex: '#58593F', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 8 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 4 }
    ],
    specifications: {
      fabricDetails: 'Embroidered organza shirt with attached cotton silk inner and silk cigarette pants.',
      shirtLength: '45 Inches',
      dupatta: 'Embroidered Organza with multi-head lace border',
      trouser: 'Cotton silk straight trouser (37.5 inches)',
      embroidery: 'Antique gold tilla with delicate sequin accents'
    },
    createdAt: '2026-09-20'
  },
  {
    id: 'prod-003',
    name: 'Shahi Burgundy Velvet Dabka Suit',
    subtitle: 'Pure micro-velvet formal suit with intricate hand-dabka neckline',
    price: 22500,
    salePrice: 19500,
    sku: 'WJH-FOR-003',
    category: 'Formal Wear',
    collection: 'Winter Velvet Soiree',
    description: 'Crafted on lush 9000 micro velvet in rich burgundy maroon. Detailed with antique gold dabka, nakshi, and resham floral embroidery that radiates royal refinement for winter weddings and evening galas.',
    fabric: '9000 Micro Velvet & Pure Silk',
    pieces: '2 Piece',
    fit: 'Standard Traditional Fit',
    care: 'Specialist Dry Clean Only. Avoid direct iron on velvet nap.',
    inStock: true,
    stockQuantity: 12,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 42,
    images: [
      '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg',
      '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg'
    ],
    colors: [
      { name: 'Deep Burgundy', hex: '#58111A', inStock: true },
      { name: 'Royal Navy', hex: '#131B38', inStock: true },
      { name: 'Midnight Black', hex: '#1A1A1A', inStock: true }
    ],
    sizes: [
      { size: 'S', stock: 4 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 3 }
    ],
    specifications: {
      fabricDetails: 'Pure Micro Velvet 9000 shirt and matching velvet trousers.',
      shirtLength: '42 Inches',
      dupatta: 'Optional matching silk organza dupatta',
      trouser: 'Velvet straight cigarette pants with embroidered borders',
      embroidery: 'Traditional hand dabka, kora, nakshi, and sitara work'
    },
    createdAt: '2026-08-30'
  },
  {
    id: 'prod-004',
    name: 'Noor-e-Jahan Midnight Black Chiffon Suit',
    subtitle: 'Classic black crinkle chiffon with dull-gold tilla embroidery',
    price: 26800,
    sku: 'WJH-FOR-004',
    category: 'Formal Wear',
    collection: 'Royal Heritage 2026',
    description: 'An iconic formal silhouette in jet black crinkle chiffon. Adorned with heritage Mughal motifs, delicate scalloped borders, and an ornate tissue-bordered chiffon dupatta that leaves an unforgettable impression.',
    fabric: 'Crinkle Chiffon & Raw Silk',
    pieces: '3 Piece',
    fit: 'Flattering A-Line Silhouette',
    care: 'Dry Clean Only.',
    inStock: true,
    stockQuantity: 15,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 31,
    images: [
      '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg',
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'
    ],
    colors: [
      { name: 'Jet Black', hex: '#161616', inStock: true },
      { name: 'Charcoal Grey', hex: '#333333', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 6 },
      { size: 'L', stock: 2 }
    ],
    specifications: {
      fabricDetails: 'Embroidered chiffon front, back and sleeves with pure silk slip.',
      shirtLength: '46 Inches',
      dupatta: 'Chiffon dupatta with 4-side laser-cut embroidered border',
      trouser: 'Raw silk cropped straight trouser',
      embroidery: 'Fine dull gold tilla and threadwork'
    },
    createdAt: '2026-09-18'
  },
  {
    id: 'prod-005',
    name: 'Gulab Chintz Stitched 2-Piece Lawn',
    subtitle: 'Pastel blush pink stitched lawn kurta with organza lace borders',
    price: 11500,
    salePrice: 9800,
    sku: 'WJH-CAS-005',
    category: 'Casual Wear',
    collection: 'Summer Prêt Edit',
    description: 'Fresh, airy, and effortless. Crafted from luxury Egyptian cotton lawn with delicate thread floral embroidery on neckline and sleeves, accompanied by tailored tulip trousers.',
    fabric: '100% Luxury Combed Lawn',
    pieces: '2 Piece',
    fit: 'Easy Relaxed Boxy Fit',
    care: 'Machine wash delicate cycle or hand wash in cold water.',
    inStock: true,
    stockQuantity: 30,
    isFeatured: false,
    isNew: true,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 19,
    images: [
      '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg',
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'
    ],
    colors: [
      { name: 'Blush Pink', hex: '#E2B8B8', inStock: true },
      { name: 'Powder Blue', hex: '#B8CBE2', inStock: true },
      { name: 'Buttercup Yellow', hex: '#EAE2B8', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 6 },
      { size: 'S', stock: 10 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 6 }
    ],
    specifications: {
      fabricDetails: 'Fine 80s combed lawn shirt and lawn trouser.',
      shirtLength: '40 Inches',
      dupatta: 'N/A (2 Piece Suit)',
      trouser: 'Stitched lawn cigarette trouser',
      embroidery: 'Cotton resham threadwork with lace inserts'
    },
    createdAt: '2026-10-01'
  },
  {
    id: 'prod-006',
    name: 'Rawayat Unstitched 3-Piece Silk Brocade',
    subtitle: 'Pure Banarasi silk brocade shirt with unstitched chiffon dupatta',
    price: 15200,
    salePrice: 13500,
    sku: 'WJH-UNS-006',
    category: 'Unstitched',
    collection: 'Heritage Weaves',
    description: 'For those who cherish custom tailoring. Features 3.25 meters of gold woven Banarasi silk brocade fabric, unstitched embroidered organza border patches, raw silk bottom fabric, and a hand-dyed chiffon dupatta.',
    fabric: 'Banarasi Silk Brocade & Pure Chiffon',
    pieces: 'Unstitched',
    fit: 'Unstitched Fabric Set (Can be stitched up to XXL)',
    care: 'Dry clean only to maintain brocade gold luster.',
    inStock: true,
    stockQuantity: 40,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 52,
    images: [
      '/src/assets/images/wajeeha_unstitched_fabrics_1791435714334.jpg',
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg'
    ],
    colors: [
      { name: 'Champagne Silk', hex: '#DECBB3', inStock: true },
      { name: 'Rose Gold', hex: '#CFA79D', inStock: true },
      { name: 'Pistachio Mint', hex: '#BDD2B6', inStock: true }
    ],
    sizes: [
      { size: 'Unstitched (3 Pc Fabric)', stock: 40 }
    ],
    specifications: {
      fabricDetails: 'Unstitched fabric bundle with embroidered neck patch and sleeve borders.',
      shirtLength: '3.25 Meters Fabric (customizable length)',
      dupatta: '2.5 Meters Pure Crinkle Chiffon with Banarasi Patti',
      trouser: '2.5 Meters Dyed Raw Silk',
      embroidery: 'Brocade weave with organza embroidered appliques'
    },
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-007',
    name: 'Zebaish Hand-Embroidered 2-Piece Pret',
    subtitle: 'Classic ivory raw silk shirt with contrast maroon resham work',
    price: 14800,
    sku: 'WJH-LPR-007',
    category: '2 Piece',
    collection: 'Royal Heritage 2026',
    description: 'An understated luxury staple. Clean ivory raw silk structured shirt accented with intricate botanical motifs in deep crimson and antique tilla, paired with straight cigarette trousers.',
    fabric: 'Korean Raw Silk',
    pieces: '2 Piece',
    fit: 'Tailored Smart Fit',
    care: 'Dry clean recommended.',
    inStock: true,
    stockQuantity: 16,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    rating: 4.6,
    reviewCount: 14,
    images: [
      '/src/assets/images/wajeeha_luxury_pret_model_1791435683519.jpg',
      '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg'
    ],
    colors: [
      { name: 'Ivory Cream', hex: '#FAF5EB', inStock: true },
      { name: 'Ice Grey', hex: '#DCDFE2', inStock: true }
    ],
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 5 },
      { size: 'M', stock: 5 },
      { size: 'L', stock: 4 }
    ],
    specifications: {
      fabricDetails: 'Pure raw silk kurta and trousers.',
      shirtLength: '44 Inches',
      dupatta: 'Not Included (2 Piece Suit)',
      trouser: 'Straight matching trousers (38 inches)',
      embroidery: 'Resham thread and subtle metallic zari'
    },
    createdAt: '2026-09-28'
  },
  {
    id: 'prod-008',
    name: 'Mahnoor Royal Organza 3-Piece Festive',
    subtitle: 'Heavily embellished wedding wear with hand-worked crystal stones',
    price: 32000,
    salePrice: 28500,
    sku: 'WJH-LUX-008',
    category: 'Luxury Collection',
    collection: 'Festive Pret 2026',
    description: 'Our showstopper festive masterwork. Layered sheer organza adorned with 3D floral petals, Swarovski crystal beads, and resham thread embroidery. Accompanied by silk slip, flared palazzo trousers, and a scalloped dupatta.',
    fabric: 'Pure Silk Organza & Silk Crepe',
    pieces: '3 Piece',
    fit: 'Voluminous Flared Silhouette',
    care: 'Specialist Dry Clean Only.',
    inStock: true,
    stockQuantity: 9,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    rating: 5.0,
    reviewCount: 29,
    images: [
      '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
      '/src/assets/images/wajeeha_luxury_pret_model_1791435683519.jpg'
    ],
    colors: [
      { name: 'Rose Petal Mauve', hex: '#CBA2A2', inStock: true },
      { name: 'Antique Gold', hex: '#CBB27A', inStock: true }
    ],
    sizes: [
      { size: 'S', stock: 3 },
      { size: 'M', stock: 4 },
      { size: 'L', stock: 2 }
    ],
    specifications: {
      fabricDetails: 'Imported silk organza shirt with silk crepe palazzo and organza dupatta.',
      shirtLength: '48 Inches',
      dupatta: '2.75 Yards hand-embellished crystal organza',
      trouser: 'Flared silk palazzo pants',
      embroidery: 'Swarovski crystals, cutdana, sequins, and French knot floral clusters'
    },
    createdAt: '2026-10-02'
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'New Arrivals',
    slug: 'new-arrivals',
    productCount: 14,
    image: '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
    description: 'Freshly unveiled handcrafted luxury prêt and couture drops.'
  },
  {
    id: 'cat-2',
    name: 'Luxury Pret',
    slug: 'luxury-pret',
    productCount: 22,
    image: '/src/assets/images/wajeeha_luxury_pret_model_1791435683519.jpg',
    description: 'Ready-to-wear statement silhouettes with fine embroidery.'
  },
  {
    id: 'cat-3',
    name: 'Festive Collection',
    slug: 'festive-collection',
    productCount: 16,
    image: '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
    description: 'Regal peshwas, chiffon kalidars, and wedding celebrations.'
  },
  {
    id: 'cat-4',
    name: 'Formal Wear',
    slug: 'formal-wear',
    productCount: 18,
    image: '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg',
    description: 'Velvet, raw silk, and evening formals with traditional dabka.'
  },
  {
    id: 'cat-5',
    name: '2 Piece',
    slug: '2-piece',
    productCount: 15,
    image: '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg',
    description: 'Effortless coordinated shirts and trousers for daily refinement.'
  },
  {
    id: 'cat-6',
    name: '3 Piece',
    slug: '3-piece',
    productCount: 28,
    image: '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg',
    description: 'Complete ensembles with signature embroidered dupattas.'
  },
  {
    id: 'cat-7',
    name: 'Unstitched',
    slug: 'unstitched',
    productCount: 19,
    image: '/src/assets/images/wajeeha_unstitched_fabrics_1791435714334.jpg',
    description: 'Pure fabrics, Banarasi weaves, and embroidery bundles.'
  },
  {
    id: 'cat-8',
    name: 'Casual Wear',
    slug: 'casual-wear',
    productCount: 12,
    image: '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg',
    description: 'Breathable combed cotton lawn and daily modern styles.'
  }
];

export const INITIAL_COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    name: 'Festive Pret 2026',
    slug: 'festive-pret-2026',
    season: 'Autumn / Winter Festive',
    image: '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
    description: 'Timeless luxury silhouettes crafted for weddings and festive soirees.',
    active: true
  },
  {
    id: 'col-2',
    name: 'Royal Heritage Velvet',
    slug: 'royal-heritage-velvet',
    season: 'Winter Couture',
    image: '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg',
    description: 'Rich velvet masterpieces touched by heritage dabka and tilla.',
    active: true
  },
  {
    id: 'col-3',
    name: 'Noor Modern Monochromes',
    slug: 'noor-modern-monochromes',
    season: 'Year-Round Signature',
    image: '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg',
    description: 'Monochromatic black and ivory couture for timeless sophistication.',
    active: true
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    orderNumber: 'WJH-98214',
    createdAt: '2026-10-06T14:32:00Z',
    customer: {
      fullName: 'Ayesha Tariq',
      email: 'ayesha.tariq@gmail.com',
      phone: '+92 300 8472910',
      address: 'House 42, Street 8, Sector F-7/2',
      city: 'Islamabad',
      province: 'Federal Capital',
      postalCode: '44000',
      orderNotes: 'Please ring bell and leave with security guard if unavailable.'
    },
    items: [
      {
        id: 'item-1',
        productId: 'prod-001',
        name: 'Gul-e-Noor Embroidered Chiffon Peshwas',
        price: 21999,
        image: '/src/assets/images/hero_wajeeha_festive_model_1791435670867.jpg',
        size: 'M',
        color: 'Mauve Rose',
        quantity: 1,
        sku: 'WJH-FES-001-M'
      }
    ],
    subtotal: 21999,
    shipping: 0,
    discount: 2200,
    couponCode: 'WAJEEHA10',
    total: 19799,
    paymentMethod: 'COD',
    paymentStatus: 'Pending',
    orderStatus: 'Confirmed',
    trackingNumber: 'TCS-PK-98214761',
    courier: 'TCS Express'
  },
  {
    id: 'ord-1002',
    orderNumber: 'WJH-98215',
    createdAt: '2026-10-05T09:14:00Z',
    customer: {
      fullName: 'Dr. Mahnoor Bilal',
      email: 'mahnoor.bilal@yahoo.com',
      phone: '+92 321 9841123',
      address: 'Bungalow 18-A, Phase 5, DHA',
      city: 'Lahore',
      province: 'Punjab',
      postalCode: '54792',
      orderNotes: 'Urgent delivery requested for family dinner on weekend.'
    },
    items: [
      {
        id: 'item-2',
        productId: 'prod-003',
        name: 'Shahi Burgundy Velvet Dabka Suit',
        price: 19500,
        image: '/src/assets/images/wajeeha_festive_velvet_model_1791435701142.jpg',
        size: 'S',
        color: 'Deep Burgundy',
        quantity: 1,
        sku: 'WJH-FOR-003-S'
      },
      {
        id: 'item-3',
        productId: 'prod-005',
        name: 'Gulab Chintz Stitched 2-Piece Lawn',
        price: 9800,
        image: '/src/assets/images/wajeeha_blush_pink_lawn_1791435841179.jpg',
        size: 'S',
        color: 'Blush Pink',
        quantity: 1,
        sku: 'WJH-CAS-005-S'
      }
    ],
    subtotal: 29300,
    shipping: 0,
    discount: 0,
    total: 29300,
    paymentMethod: 'Online Card',
    paymentStatus: 'Paid',
    orderStatus: 'Processing',
    trackingNumber: 'LEO-KHI-447819',
    courier: 'Leopards Courier'
  },
  {
    id: 'ord-1003',
    orderNumber: 'WJH-98216',
    createdAt: '2026-10-04T18:45:00Z',
    customer: {
      fullName: 'Zainab Qureshi',
      email: 'zainab.q@hotmail.com',
      phone: '+92 333 4109827',
      address: 'Apartment 4B, Creek Vistas, DHA Phase 8',
      city: 'Karachi',
      province: 'Sindh',
      postalCode: '75500'
    },
    items: [
      {
        id: 'item-4',
        productId: 'prod-004',
        name: 'Noor-e-Jahan Midnight Black Chiffon Suit',
        price: 26800,
        image: '/src/assets/images/wajeeha_black_formal_model_1791435826102.jpg',
        size: 'M',
        color: 'Jet Black',
        quantity: 1,
        sku: 'WJH-FOR-004-M'
      }
    ],
    subtotal: 26800,
    shipping: 0,
    discount: 4020,
    couponCode: 'WAJEEHA15',
    total: 22780,
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'Paid',
    orderStatus: 'Shipped',
    trackingNumber: 'TCS-KHI-993812',
    courier: 'TCS Express'
  },
  {
    id: 'ord-1004',
    orderNumber: 'WJH-98217',
    createdAt: '2026-09-30T11:20:00Z',
    customer: {
      fullName: 'Fatima Zahra',
      email: 'fatima.zahra@outlook.com',
      phone: '+92 312 7654321',
      address: 'Villa 14, Mall Road Cantonment',
      city: 'Peshawar',
      province: 'Khyber Pakhtunkhwa',
      postalCode: '25000'
    },
    items: [
      {
        id: 'item-5',
        productId: 'prod-006',
        name: 'Rawayat Unstitched 3-Piece Silk Brocade',
        price: 13500,
        image: '/src/assets/images/wajeeha_unstitched_fabrics_1791435714334.jpg',
        size: 'Unstitched',
        color: 'Champagne Silk',
        quantity: 1,
        sku: 'WJH-UNS-006'
      }
    ],
    subtotal: 13500,
    shipping: 0,
    discount: 0,
    total: 13500,
    paymentMethod: 'COD',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    trackingNumber: 'TCS-PEW-102948',
    courier: 'TCS Express'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    fullName: 'Ayesha Tariq',
    email: 'ayesha.tariq@gmail.com',
    phone: '+92 300 8472910',
    city: 'Islamabad',
    registeredDate: '2026-05-12',
    totalOrders: 4,
    totalSpent: 86400,
    status: 'VIP'
  },
  {
    id: 'cust-2',
    fullName: 'Dr. Mahnoor Bilal',
    email: 'mahnoor.bilal@yahoo.com',
    phone: '+92 321 9841123',
    city: 'Lahore',
    registeredDate: '2026-06-20',
    totalOrders: 3,
    totalSpent: 67300,
    status: 'VIP'
  },
  {
    id: 'cust-3',
    fullName: 'Zainab Qureshi',
    email: 'zainab.q@hotmail.com',
    phone: '+92 333 4109827',
    city: 'Karachi',
    registeredDate: '2026-08-01',
    totalOrders: 2,
    totalSpent: 44200,
    status: 'Regular'
  },
  {
    id: 'cust-4',
    fullName: 'Fatima Zahra',
    email: 'fatima.zahra@outlook.com',
    phone: '+92 312 7654321',
    city: 'Peshawar',
    registeredDate: '2026-09-14',
    totalOrders: 1,
    totalSpent: 13500,
    status: 'New'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    productId: 'prod-001',
    productName: 'Gul-e-Noor Embroidered Chiffon Peshwas',
    customerName: 'Sanam Saeed',
    rating: 5,
    date: '2026-10-02',
    comment: 'SubhanAllah! The stitching quality, flare, and pure chiffon fabric exceeded all expectations. Looks even more royal in person than the pictures.',
    verifiedPurchase: true,
    status: 'Approved'
  },
  {
    id: 'rev-2',
    productId: 'prod-001',
    productName: 'Gul-e-Noor Embroidered Chiffon Peshwas',
    customerName: 'Hira Mani',
    rating: 5,
    date: '2026-09-27',
    comment: 'The gold zari and pearl detailing is so delicate and non-itchy. Delivered within 3 days in Islamabad in a beautiful signature luxury box.',
    verifiedPurchase: true,
    status: 'Approved'
  },
  {
    id: 'rev-3',
    productId: 'prod-003',
    productName: 'Shahi Burgundy Velvet Dabka Suit',
    customerName: 'Alizeh Shah',
    rating: 5,
    date: '2026-09-20',
    comment: 'Pure micro velvet has that heavy regal fall. The neckline dabka work is true artisanal craftsmanship. Got compliments from everyone at the dholki!',
    verifiedPurchase: true,
    status: 'Approved'
  },
  {
    id: 'rev-4',
    productId: 'prod-004',
    productName: 'Noor-e-Jahan Midnight Black Chiffon Suit',
    customerName: 'Komal Rizvi',
    rating: 5,
    date: '2026-09-24',
    comment: 'Timeless elegance. The black color depth and scallop border embroidery is sheer perfection.',
    verifiedPurchase: true,
    status: 'Approved'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WAJEEHA10',
    discountPercent: 10,
    minOrder: 15000,
    active: true,
    usageCount: 64
  },
  {
    code: 'WAJEEHA15',
    discountPercent: 15,
    minOrder: 22000,
    active: true,
    usageCount: 38
  },
  {
    code: 'EIDLUXE',
    discountPercent: 20,
    minOrder: 30000,
    active: true,
    usageCount: 19
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'WAJEEHA',
  tagline: 'Elegance in Every Stitch',
  supportEmail: 'concierge@wajeehafashion.com',
  supportPhone: '+92 300 1234567',
  whatsappNumber: '+923001234567',
  freeShippingThreshold: 10000,
  standardShippingRate: 350,
  expressShippingRate: 750,
  bankDetails: {
    bankName: 'Meezan Bank Limited / HBL',
    accountTitle: 'Wajeeha Luxury Pret Pvt Ltd',
    accountNumber: '02010103487102',
    iban: 'PK45MEZN0002010103487102'
  }
};
