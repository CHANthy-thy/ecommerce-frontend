export type InternationalCategory =
  | 'Cleanser'
  | 'Toner'
  | 'Serum'
  | 'Moisturizer'
  | 'Sunscreen'
  | 'Face Mask'
  | 'Eye Care'
  | 'Lip Care'
  | 'Acne Care'
  | 'Body Care'

export type ShippingType = 'Local' | 'International'
export type Country = 'Cambodia' | 'Japan' | 'Korea' | 'China' | 'Italy' | 'USA'
export type CountryCode = 'KH' | 'JP' | 'KR' | 'CN' | 'IT' | 'US'

export type ProductTag = 'New' | 'Popular' | 'Discount' | 'Premium' | 'Handmade'

// cultural tags for international marketplace UI
export type CulturalTag = 'Local' | 'Imported' | 'Handmade' | 'Premium'

export interface Product {
  id: number
  name: string
  // legacy fields (kept so existing UI keeps working)
  brand: string
  category: string
  price: number
  oldPrice?: number
  stock: number
  rating: number
  reviews: number
  image: string
  images?: string[]
  shortDescription: string
  description: string
  isNew?: boolean
  isFeatured?: boolean
  isBestSeller?: boolean
  colors?: string[]
  highlights?: string[]

  // international identity fields
  iCategory?: InternationalCategory
  country?: Country
  countryCode?: CountryCode
  flag?: string
  shippingType?: ShippingType
  tags?: ProductTag[]

  culturalTags?: CulturalTag[]
}

export const categories: { name: string; icon: string; cover: string }[] = [
  {
    name: 'Cleanser',
    icon: 'water_drop',
    cover:
      'https://images.unsplash.com/photo-1556228578-4b2b3b7d6e7a?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Toner',
    icon: 'water',
    cover:
      'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Serum',
    icon: 'science',
    cover:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Moisturizer',
    icon: 'spa',
    cover:
      'https://images.unsplash.com/photo-1612818040148-46a0f0b0d2e4?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Sunscreen',
    icon: 'wb_sunny',
    cover:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Face Mask',
    icon: 'self_improvement',
    cover:
      'https://images.unsplash.com/photo-1596462503194-4a6d62c0d1b1?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Eye Care',
    icon: 'visibility',
    cover:
      'https://images.unsplash.com/photo-1598442012560-3f7b2b9f0f3a?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Lip Care',
    icon: 'favorite',
    cover:
      'https://images.unsplash.com/photo-1512206811215-3b3f5b2d7c2f?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Acne Care',
    icon: 'healing',
    cover:
      'https://images.unsplash.com/photo-1598441941022-0f56a302e3af?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Body Care',
    icon: 'eco',
    cover:
      'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc8?w=900&q=80&auto=format&fit=crop',
  },
]

export const brands: string[] = [
  'CeraVe',
  'La Roche-Posay',
  'COSRX',
  'Beauty of Joseon',
  'Anua',
  'SKIN1004',
  'Round Lab',
  'Cetaphil',
  'The Ordinary',
  'Eucerin',
]

// ===== INTERNATIONAL (used by UI; imports now skincare-only) =====
import { usaProducts } from './usaProducts'
import { koreaProducts } from './koreaProducts'
import { japanProducts } from './japanProducts'
import { chinaProducts } from './chinaProducts'
import { cambodiaProducts } from './cambodiaProducts'
import { italyProducts } from './italyProducts'

const internationalProducts: Product[] = (
  [
    ...usaProducts,
    ...koreaProducts,
    ...japanProducts,
    ...chinaProducts,
    ...cambodiaProducts,
    ...italyProducts,
  ] as any[]
).map((p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  category: p.category,
  price: p.price,
  oldPrice: p.originalPrice,
  stock: p.stock,
  rating: p.rating,
  reviews: p.reviews,
  image: p.image,
  shortDescription: p.description,
  description: p.description,
  country: p.country as Product['country'],
  countryCode: p.countryCode as Product['countryCode'],
  flag: p.flag,
  shippingType: p.shippingType as Product['shippingType'],
  tags: p.tags as Product['tags'],
}))

// ===== SKINCARE (sample catalog) =====
export const products: Product[] = [
  ...internationalProducts,

  // Local demo products - using category-based Unsplash images
  {
    id: 1,
    name: 'CeraVe Foaming Cleanser (Daily Refresh)',
    brand: 'CeraVe',
    category: 'Cleanser',
    iCategory: 'Cleanser',
    price: 14.99,
    oldPrice: 17.99,
    stock: 120,
    rating: 4.8,
    reviews: 812,
    image:
      'https://images.unsplash.com/photo-1556228578-4b2b3b7d6e7a?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Gentle foam · Niacinamide · Ceramides',
    description:
      'A daily facial cleanser designed to remove dirt and oil without stripping the skin barrier. Lathers into a gentle foam to help leave skin feeling clean, fresh, and comfortable—great for normal to oily skin.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    highlights: [
      'Niacinamide support',
      'Ceramide blend',
      'Daily-friendly foam cleanse',
      'Comfortable finish',
    ],
  },
  {
    id: 2,
    name: 'La Roche-Posay Hydrating Toner (Soothing Boost)',
    brand: 'La Roche-Posay',
    category: 'Toner',
    iCategory: 'Toner',
    price: 19.5,
    stock: 85,
    rating: 4.7,
    reviews: 540,
    image:
      'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Hydration toner · Thermal water · Lightweight',
    description:
      'A lightweight toner that helps soothe and prep skin for the next steps in your routine. Absorbs quickly to support a hydrated, comfortable feel—ideal for everyday use.',
    isFeatured: true,
    highlights: [
      'Thermal water comfort',
      'Quick-absorbing feel',
      'Preps for serums',
      'Gentle hydration layer',
    ],
  },
  {
    id: 3,
    name: 'COSRX The Niacinamide Serum (Glow + Calm)',
    brand: 'COSRX',
    category: 'Serum',
    iCategory: 'Serum',
    price: 22.99,
    oldPrice: 28.99,
    stock: 60,
    rating: 4.8,
    reviews: 920,
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Niacinamide · Brightening · Lightweight',
    description:
      'A targeted niacinamide serum formulated to support a brighter look and a calmer-feeling complexion. Helps reduce the look of uneven tone while leaving skin feeling smooth and hydrated.',
    isFeatured: true,
    isBestSeller: true,
    highlights: [
      'Niacinamide support',
      'Comfortable lightweight gel',
      'Helps refine tone',
      'Pairs easily with moisturizer',
    ],
  },
  {
    id: 4,
    name: 'Beauty of Joseon Glow Serum Moisturizer (Barrier Care)',
    brand: 'Beauty of Joseon',
    category: 'Moisturizer',
    iCategory: 'Moisturizer',
    price: 24.0,
    stock: 45,
    rating: 4.6,
    reviews: 310,
    image:
      'https://images.unsplash.com/photo-1612818040148-46a0f0b0d2e4?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Moisture cream · Glow finish · Daily barrier care',
    description:
      'A nourishing moisturizer that helps maintain hydration and supports the skin barrier. Leaves skin feeling soft and smooth with a subtle healthy glow—ideal for morning and night routines.',
    isNew: true,
    highlights: [
      'Barrier-supporting hydration',
      'Soft, dewy finish',
      'Daily comfort',
      'Smooth application',
    ],
  },
  {
    id: 5,
    name: 'Anua Daily Sunscreen SPF 50+ (No-White-Cast)',
    brand: 'Anua',
    category: 'Sunscreen',
    iCategory: 'Sunscreen',
    price: 16.9,
    stock: 140,
    rating: 4.7,
    reviews: 705,
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'SPF50+ · Lightweight · Skin-friendly finish',
    description:
      'A daily sunscreen designed for smooth, comfortable wear with an easy-to-blend texture. Helps protect skin from harmful UV exposure while leaving a natural-looking finish.',
    isFeatured: true,
    highlights: [
      'SPF 50+ protection',
      'No heavy residue feel',
      'Natural finish',
      'Easy re-application',
    ],
  },
  {
    id: 6,
    name: 'SKIN1004 Madagascar Centella Face Mask (Calming Sheet)',
    brand: 'SKIN1004',
    category: 'Face Mask',
    iCategory: 'Face Mask',
    price: 13.5,
    stock: 95,
    rating: 4.8,
    reviews: 430,
    image:
      'https://images.unsplash.com/photo-1596462503194-4a6d62c0d1b1?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Centella mask · Soothing hydration · Refreshing',
    description:
      'A calming sheet mask infused with a hydration-rich essence inspired by centella care. Helps replenish moisture and soothe the look of stressed skin for a fresh, rested feel.',
    isNew: true,
    highlights: [
      'Centella-inspired comfort',
      'Hydration-rich essence',
      'Cooling fresh feel',
      'Good for weekly reset',
    ],
  },
]
