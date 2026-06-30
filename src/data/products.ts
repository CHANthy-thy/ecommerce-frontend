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

export type CulturalTag = 'Local' | 'Imported' | 'Handmade' | 'Premium'

export interface Product {
  id: number
  name: string
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
    cover: 'https://images.unsplash.com/photo-1556228578-4b2b3b7d6e7a?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Toner',
    icon: 'water',
    cover: 'https://images.unsplash.com/photo-1585232351009-eebafc5b2d0f?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Serum',
    icon: 'science',
    cover: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Moisturizer',
    icon: 'spa',
    cover: 'https://images.unsplash.com/photo-1612818040148-46a0f0b0d2e4?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Sunscreen',
    icon: 'wb_sunny',
    cover: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Face Mask',
    icon: 'self_improvement',
    cover: 'https://images.unsplash.com/photo-1596462503194-4a6d62c0d1b1?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Eye Care',
    icon: 'visibility',
    cover: 'https://images.unsplash.com/photo-1598442012560-3f7b2b9f0f3a?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Lip Care',
    icon: 'favorite',
    cover: 'https://images.unsplash.com/photo-1512206811215-3b3f5b2d7c2f?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Acne Care',
    icon: 'healing',
    cover: 'https://images.unsplash.com/photo-1598441941022-0f56a302e3af?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Body Care',
    icon: 'eco',
    cover: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38cc8?w=900&q=80&auto=format&fit=crop',
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

export const products: Product[] = []