export type InternationalCategory = 'Electronics' | 'Fashion' | 'Food' | 'Books' | 'Beauty'
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

  // international identity fields (added per requirement)
  // set as optional to avoid breaking current dummy records.
  iCategory?: InternationalCategory
  country?: Country
  countryCode?: CountryCode
  flag?: string
  shippingType?: ShippingType
  tags?: ProductTag[]

  // marketplace cultural tags
  culturalTags?: CulturalTag[]
}




export const categories: { name: string; icon: string; cover: string }[] = [
  {
    name: 'Smartphones',
    icon: 'smartphone',
    cover:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Laptops',
    icon: 'laptop_mac',
    cover:
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Tablets',
    icon: 'tablet_mac',
    cover:
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Smart Watches',
    icon: 'watch',
    cover:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Headphones',
    icon: 'headphones',
    cover:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Accessories',
    icon: 'cable',
    cover:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80&auto=format&fit=crop',
  },
  {
    name: 'Gaming',
    icon: 'sports_esports',
    cover:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop',
  },
]

export const brands: string[] = [
  'Apple',
  'Samsung',
  'Xiaomi',
  'ASUS',
  'Lenovo',
  'Dell',
  'Sony',
  'JBL',
  'Logitech',
  'Razer',
  'Garmin',
]



import { usaProducts } from './usaProducts'
import { koreaProducts } from './koreaProducts'
import { japanProducts } from './japanProducts'
import { chinaProducts } from './chinaProducts'
import { cambodiaProducts } from './cambodiaProducts'
import { italyProducts } from './italyProducts'

export const products: Product[] = [

  // ===== INTERNATIONAL (USA/Korea/Japan/China/Cambodia/Italy) =====
  ...(
    [
      ...usaProducts,
      ...koreaProducts,
      ...japanProducts,
      ...chinaProducts,
      ...cambodiaProducts,
      ...italyProducts,
    ]
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
  })),

  // ===== SMARTPHONES =====


  {
    id: 1,
    name: 'iPhone 16 Pro Max 256GB',
    brand: 'Apple',
    category: 'Smartphones',
    price: 1299,
    oldPrice: 1399,
    stock: 24,
    rating: 4.9,
    reviews: 1842,
    image: 'https://images.unsplash.com/photo-1594998437718-4a9e7b59b7c9?w=900&q=80&auto=format&fit=crop',

    shortDescription: 'A18 Pro chip · 6.9" ProMotion OLED · Titanium',
    description:
      'The most advanced iPhone ever, with the new A18 Pro chip, a 6.9-inch Super Retina XDR display with ProMotion, a titanium design, and the all-new Camera Control button. Features a 48MP Fusion camera system and up to 33 hours of video playback.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    colors: ['Natural Titanium', 'Blue Titanium', 'White', 'Black'],
    highlights: ['A18 Pro chip', '48MP Fusion camera', '6.9" ProMotion 120Hz', 'Titanium body'],
  },
  {
    id: 2,
    name: 'Galaxy S25 Ultra 512GB',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 1419,
    oldPrice: 1499,
    stock: 18,
    rating: 4.8,
    reviews: 956,
    image:
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Snapdragon 8 Elite · 200MP camera · S Pen',
    description:
      'Meet Galaxy S25 Ultra, the ultimate Galaxy. With a 6.9-inch QHD+ Dynamic AMOLED 2X display, the new Snapdragon 8 Elite for Galaxy, a 200MP main camera, and the iconic S Pen built in.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    colors: ['Titanium Black', 'Titanium Silver', 'Titanium Whitesilver', 'Titanium Gray'],
    highlights: ['Snapdragon 8 Elite', '200MP main camera', 'S Pen built-in', '6.9" QHD+ AMOLED'],
  },
  {
    id: 3,
    name: 'Xiaomi 14 Ultra 512GB',
    brand: 'Xiaomi',
    category: 'Smartphones',
    price: 1099,
    stock: 12,
    rating: 4.7,
    reviews: 432,
    image:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Leica quad camera · Snapdragon 8 Gen 3',
    description:
      'Co-engineered with Leica, the Xiaomi 14 Ultra features a 1-inch 50MP Sony LYT-900 main sensor, Snapdragon 8 Gen 3, and a 6.73-inch WQHD+ LTPO AMOLED display.',
    isFeatured: true,
    colors: ['Black', 'White'],
    highlights: ['Leica quad camera', 'Snapdragon 8 Gen 3', '90W wired charging', 'IP68'],
  },
  {
    id: 4,
    name: 'iPhone 15 128GB',
    brand: 'Apple',
    category: 'Smartphones',
    price: 799,
    oldPrice: 899,
    stock: 36,
    rating: 4.7,
    reviews: 2410,
    image:
      'https://images.unsplash.com/photo-1592286927505-1def25115558?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'A16 Bionic · Dynamic Island · 48MP camera',
    description:
      'iPhone 15 features a durable color-infused glass and aluminum design, the Dynamic Island, a 48MP main camera, and the powerful A16 Bionic chip.',
    isBestSeller: true,
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    highlights: ['A16 Bionic', '48MP camera', 'Dynamic Island', 'USB-C'],
  },
  {
    id: 5,
    name: 'Galaxy A55 5G 256GB',
    brand: 'Samsung',
    category: 'Smartphones',
    price: 449,
    stock: 28,
    rating: 4.5,
    reviews: 612,
    image:
      'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Super AMOLED 120Hz · 5000mAh',
    description:
      'Galaxy A55 5G combines a premium metal frame, 6.6-inch Super AMOLED 120Hz display, 50MP triple camera, and a 5000mAh battery for all-day performance.',
    highlights: ['6.6" Super AMOLED 120Hz', '50MP triple camera', '5000mAh', 'IP67'],
  },
  {
    id: 6,
    name: 'Xiaomi Redmi Note 14 Pro+',
    brand: 'Xiaomi',
    category: 'Smartphones',
    price: 379,
    stock: 40,
    rating: 4.6,
    reviews: 521,
    image:
      'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?w=900&q=80&auto=format&fit=crop',
    shortDescription: '200MP camera · 120W HyperCharge',
    description:
      'Redmi Note 14 Pro+ packs a flagship 200MP camera, 120W HyperCharge, Dimensity 7350 Pro, and a 6.67-inch 1.5K AMOLED display.',
    isNew: true,
    highlights: ['200MP main camera', '120W HyperCharge', '6.67" 1.5K AMOLED', 'Dimensity 7350 Pro'],
  },

  // ===== LAPTOPS =====
  {
    id: 7,
    name: 'MacBook Pro 16" M4 Pro',
    brand: 'Apple',
    category: 'Laptops',
    price: 2799,
    oldPrice: 2999,
    stock: 9,
    rating: 4.9,
    reviews: 1287,
    image:
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'M4 Pro chip · 16" Liquid Retina XDR',
    description:
      'Supercharged by M4 Pro or M4 Max, MacBook Pro features a stunning 16-inch Liquid Retina XDR display, up to 24 hours of battery life, and a powerful Neural Engine for Apple Intelligence.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    highlights: ['M4 Pro chip', '16" Liquid Retina XDR', '24h battery', 'Thunderbolt 5'],
  },
  {
    id: 8,
    name: 'ASUS ROG Zephyrus G16',
    brand: 'ASUS',
    category: 'Laptops',
    price: 1899,
    stock: 14,
    rating: 4.7,
    reviews: 412,
    image:
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'RTX 4070 · Core Ultra 9 · 240Hz OLED',
    description:
      'The ROG Zephyrus G16 is a sleek gaming powerhouse with Intel Core Ultra 9, NVIDIA GeForce RTX 4070, 16-inch 2.5K OLED 240Hz display, and a CNC-machined aluminum chassis.',
    isFeatured: true,
    isBestSeller: true,
    highlights: ['Core Ultra 9', 'RTX 4070', '2.5K OLED 240Hz', 'CNC aluminum'],
  },
  {
    id: 9,
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    brand: 'Lenovo',
    category: 'Laptops',
    price: 1599,
    stock: 22,
    rating: 4.6,
    reviews: 738,
    image:
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Core Ultra 7 · 14" 2.8K OLED · 1.09kg',
    description:
      'The ThinkPad X1 Carbon Gen 12 is ultra-light at 1.09kg, with Intel Core Ultra 7, 14-inch 2.8K OLED anti-glare display, and MIL-SPEC durability for professionals on the go.',
    isFeatured: true,
    highlights: ['Core Ultra 7', '14" 2.8K OLED', '1.09kg ultra-light', 'MIL-SPEC'],
  },
  {
    id: 10,
    name: 'Dell XPS 15 9530',
    brand: 'Dell',
    category: 'Laptops',
    price: 1899,
    oldPrice: 2099,
    stock: 11,
    rating: 4.5,
    reviews: 358,
    image:
      'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Core i9 · RTX 4060 · OLED touch',
    description:
      'Dell XPS 15 9530 pairs a 13th-gen Intel Core i9 with NVIDIA RTX 4060, 15.6-inch 3.5K OLED touch display, and a precision-crafted aluminum chassis.',
    highlights: ['Core i9-13900H', 'RTX 4060', '3.5K OLED touch', 'Aluminum CNC'],
  },
  {
    id: 11,
    name: 'MacBook Air 13" M3',
    brand: 'Apple',
    category: 'Laptops',
    price: 1099,
    stock: 32,
    rating: 4.8,
    reviews: 2154,
    image:
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'M3 chip · 18h battery · Fanless',
    description:
      'MacBook Air with M3 is incredibly thin and light, with up to 18 hours of battery, a stunning Liquid Retina display, and a fanless silent design.',
    isBestSeller: true,
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    highlights: ['Apple M3', '18h battery', 'Liquid Retina', 'Fanless silent'],
  },

  // ===== TABLETS =====
  {
    id: 12,
    name: 'iPad Pro 13" M4',
    brand: 'Apple',
    category: 'Tablets',
    price: 1299,
    stock: 16,
    rating: 4.9,
    reviews: 821,
    image:
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'M4 chip · Ultra Retina XDR · 5.1mm thin',
    description:
      'The thinnest Apple product ever. iPad Pro with M4 features a new Ultra Retina XDR display with tandem OLED, the new Apple M4 chip, and support for Apple Pencil Pro.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    highlights: ['Apple M4', 'Ultra Retina XDR OLED', '5.1mm thin', 'Apple Pencil Pro'],
  },
  {
    id: 13,
    name: 'Galaxy Tab S10 Ultra',
    brand: 'Samsung',
    category: 'Tablets',
    price: 1199,
    oldPrice: 1299,
    stock: 13,
    rating: 4.7,
    reviews: 412,
    image:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=900&q=80&auto=format&fit=crop',
    shortDescription: '14.6" Dynamic AMOLED 2X · S Pen',
    description:
      'Galaxy Tab S10 Ultra features a massive 14.6-inch Dynamic AMOLED 2X display, MediaTek Dimensity 9300+, bundled S Pen, and Galaxy AI features.',
    isNew: true,
    isFeatured: true,
    highlights: ['14.6" AMOLED 2X', 'Dimensity 9300+', 'S Pen included', 'IP68'],
  },
  {
    id: 14,
    name: 'iPad Air 11" M2',
    brand: 'Apple',
    category: 'Tablets',
    price: 599,
    stock: 28,
    rating: 4.7,
    reviews: 612,
    image:
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'M2 chip · Liquid Retina · Apple Pencil Pro',
    description:
      'iPad Air with M2 brings pro-level performance to a thin and light design, with an 11-inch Liquid Retina display and support for Apple Pencil Pro.',
    isBestSeller: true,
    colors: ['Space Gray', 'Blue', 'Purple', 'Starlight'],
    highlights: ['Apple M2', '11" Liquid Retina', 'Apple Pencil Pro', '5G cellular'],
  },
  {
    id: 15,
    name: 'Xiaomi Pad 6 Pro',
    brand: 'Xiaomi',
    category: 'Tablets',
    price: 449,
    stock: 22,
    rating: 4.5,
    reviews: 287,
    image:
      'https://images.unsplash.com/photo-1605464315543-667cd0b88c89?w=900&q=80&auto=format&fit=crop',
    shortDescription: '11" 144Hz · Snapdragon 8+ Gen 1',
    description:
      'Xiaomi Pad 6 Pro features an 11-inch 144Hz display, Snapdragon 8+ Gen 1, 67W turbo charging, and a quad-speaker Dolby Atmos setup.',
    highlights: ['11" 144Hz', 'Snapdragon 8+ Gen 1', '67W charging', 'Dolby Atmos'],
  },
  {
    id: 16,
    name: 'Lenovo Tab P12 Pro',
    brand: 'Lenovo',
    category: 'Tablets',
    price: 549,
    stock: 19,
    rating: 4.4,
    reviews: 198,
    image:
      'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=900&q=80&auto=format&fit=crop',
    shortDescription: '12.6" 2K AMOLED · JBL speakers',
    description:
      'Lenovo Tab P12 Pro is a productivity powerhouse with a 12.6-inch 2K AMOLED display, Snapdragon 870, JBL quad speakers, and bundled Precision Pen 3.',
    highlights: ['12.6" 2K AMOLED', 'Snapdragon 870', 'JBL speakers', 'Precision Pen 3'],
  },

  // ===== SMART WATCHES =====
  {
    id: 17,
    name: 'Apple Watch Ultra 2',
    brand: 'Apple',
    category: 'Smart Watches',
    price: 899,
    stock: 21,
    rating: 4.9,
    reviews: 1245,
    image:
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&q=80&auto=format&fit=crop',
    shortDescription: '49mm titanium · Always-On · 36h battery',
    description:
      'The most rugged and capable Apple Watch. With a 49mm titanium case, the brightest Apple display ever, dual-frequency GPS, and up to 36 hours of battery life.',
    isFeatured: true,
    isBestSeller: true,
    colors: ['Natural Titanium', 'Black Titanium'],
    highlights: ['49mm titanium', 'Dual-frequency GPS', '36h battery', 'Dive certified 100m'],
  },
  {
    id: 18,
    name: 'Galaxy Watch Ultra',
    brand: 'Samsung',
    category: 'Smart Watches',
    price: 649,
    stock: 18,
    rating: 4.7,
    reviews: 587,
    image:
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=900&q=80&auto=format&fit=crop',
    shortDescription: '47mm titanium · LTE · Wear OS 5',
    description:
      'Galaxy Watch Ultra is built for endurance with a 47mm titanium case, Wear OS 5, advanced sleep AI, and a 590mAh battery for multi-day use.',
    isNew: true,
    isFeatured: true,
    highlights: ['47mm titanium', 'Wear OS 5', '590mAh battery', '10ATM water resistance'],
  },
  {
    id: 19,
    name: 'Garmin Fenix 8 Solar',
    brand: 'Garmin',
    category: 'Smart Watches',
    price: 1049,
    stock: 11,
    rating: 4.8,
    reviews: 412,
    image:
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Solar charging · Sapphire · Multiband GPS',
    description:
      'Built for athletes and adventurers, Fenix 8 Solar features a sapphire crystal, solar charging, multiband GPS, and preloaded maps with up to 48 days of battery life.',
    isBestSeller: true,
    highlights: ['Solar charging', 'Sapphire crystal', 'Multiband GPS', '48-day battery'],
  },
  {
    id: 20,
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    category: 'Smart Watches',
    price: 499,
    stock: 34,
    rating: 4.8,
    reviews: 1622,
    image:
      'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=900&q=80&auto=format&fit=crop',
    shortDescription: '46mm · Always-On · Sleep apnea alerts',
    description:
      'Apple Watch Series 10 is thinner, lighter, and features the largest display ever on Apple Watch, with new sleep apnea notifications and faster charging.',
    isNew: true,
    isFeatured: true,
    colors: ['Jet Black', 'Rose Gold', 'Silver', 'Slate'],
    highlights: ['46mm display', 'Sleep apnea alerts', 'Faster charging', 'Wide-angle OLED'],
  },
  {
    id: 21,
    name: 'Xiaomi Smart Band 9 Pro',
    brand: 'Xiaomi',
    category: 'Smart Watches',
    price: 89,
    stock: 80,
    rating: 4.5,
    reviews: 2410,
    image:
      'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=900&q=80&auto=format&fit=crop',
    shortDescription: '1.74" AMOLED · 21-day battery',
    description:
      'Xiaomi Smart Band 9 Pro features a 1.74-inch AMOLED display, 21-day battery life, built-in GPS, and 150+ workout modes.',
    isBestSeller: true,
    highlights: ['1.74" AMOLED', '21-day battery', 'Built-in GPS', '5 ATM water resistance'],
  },

  // ===== HEADPHONES =====
  {
    id: 22,
    name: 'AirPods Pro 2 (USB-C)',
    brand: 'Apple',
    category: 'Headphones',
    price: 249,
    stock: 45,
    rating: 4.8,
    reviews: 3124,
    image:
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Active Noise Cancellation · USB-C',
    description:
      'AirPods Pro feature the H2 chip for up to 2x more Active Noise Cancellation. With Adaptive Audio, Conversation Awareness, and Personalized Spatial Audio.',
    isFeatured: true,
    isBestSeller: true,
    highlights: ['H2 chip', 'Active Noise Cancellation', 'Adaptive Audio', 'USB-C MagSafe case'],
  },
  {
    id: 23,
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Headphones',
    price: 399,
    oldPrice: 449,
    stock: 27,
    rating: 4.9,
    reviews: 4128,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Industry-leading ANC · 30h battery',
    description:
      'Sony WH-1000XM5 wireless noise-cancelling headphones with 8 microphones, 30-hour battery, LDAC, and industry-leading noise cancellation.',
    isBestSeller: true,
    colors: ['Black', 'Silver', 'Midnight Blue'],
    highlights: ['Industry-leading ANC', '30h battery', 'LDAC Hi-Res', '8 beamforming mics'],
  },
  {
    id: 24,
    name: 'JBL Tour One M2',
    brand: 'JBL',
    category: 'Headphones',
    price: 299,
    stock: 18,
    rating: 4.6,
    reviews: 712,
    image:
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'True Adaptive ANC · 50h battery',
    description:
      'JBL Tour One M2 with True Adaptive Noise Cancelling, Hi-Res certified, and a class-leading 50-hour battery life in a premium design.',
    highlights: ['True Adaptive ANC', '50h battery', 'Hi-Res certified', 'Spatial Audio'],
  },
  {
    id: 25,
    name: 'Bose QuietComfort Ultra',
    brand: 'Bose',
    category: 'Headphones',
    price: 429,
    stock: 22,
    rating: 4.8,
    reviews: 1456,
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Immersive Audio · CustomTune',
    description:
      'Bose QuietComfort Ultra Headphones deliver world-class noise cancellation, immersive audio, and a luxurious design with up to 24 hours of battery.',
    isFeatured: true,
    highlights: ['Immersive Audio', 'CustomTune calibration', '24h battery', 'Premium materials'],
  },

  {
    id: 26,
    name: 'JBL Tune 770NC',
    brand: 'JBL',
    category: 'Headphones',
    price: 129,
    oldPrice: 179,
    stock: 60,
    rating: 4.4,
    reviews: 942,
    image:
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Adaptive ANC · 70h battery',
    description:
      'JBL Tune 770NC wireless over-ear headphones with Adaptive Noise Cancelling, up to 70 hours of battery, and JBL Pure Bass Sound.',
    highlights: ['Adaptive ANC', '70h battery', 'JBL Pure Bass', 'Multi-point connection'],
  },

  // ===== ACCESSORIES =====
  {
    id: 27,
    name: 'Logitech MX Master 4',
    brand: 'Logitech',
    category: 'Accessories',
    price: 119,
    stock: 50,
    rating: 4.8,
    reviews: 2187,
    image:
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=900&q=80&auto=format&fit=crop',
    shortDescription: '8K DPI · 70-day battery · Multi-device',
    description:
      'The flagship Logitech MX Master 4 features an 8K DPI Darkfield sensor, MagSpeed electromagnetic scroll, 70-day battery, and seamless multi-device workflow.',
    isBestSeller: true,
    highlights: ['8K DPI sensor', '70-day battery', 'MagSpeed scroll', 'Multi-device flow'],
  },
  {
    id: 28,
    name: 'Apple Magic Keyboard with Touch ID',
    brand: 'Apple',
    category: 'Accessories',
    price: 199,
    stock: 30,
    rating: 4.7,
    reviews: 612,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Touch ID · Lightning · Numeric keypad',
    description:
      'Magic Keyboard delivers a remarkably comfortable and precise typing experience with numeric keypad and Touch ID for fast, easy authentication.',
    highlights: ['Touch ID', 'Numeric keypad', 'Lightning cable', 'Low profile'],
  },
  {
    id: 29,
    name: 'Logitech G Pro X Superlight 2',
    brand: 'Logitech',
    category: 'Accessories',
    price: 159,
    stock: 35,
    rating: 4.8,
    reviews: 1820,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=80&auto=format&fit=crop',
    shortDescription: '60g · 95h battery · HERO 2 sensor',
    description:
      'The legendary pro wireless gaming mouse is now even lighter at 60g, with a 95-hour battery, HERO 2 sensor, and LIGHTFORCE hybrid switches.',
    isBestSeller: true,
    highlights: ['60g ultra-light', '95h battery', 'HERO 2 sensor', 'LIGHTFORCE switches'],
  },
  {
    id: 30,
    name: 'Sony WF-1000XM5',
    brand: 'Sony',
    category: 'Accessories',
    price: 299,
    stock: 40,
    rating: 4.7,
    reviews: 2451,
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Best ANC earbuds · LDAC',
    description:
      'Sony WF-1000XM5 truly wireless earbuds with industry-leading noise cancellation, exceptional sound quality with LDAC, and 24-hour total battery life.',
    isFeatured: true,
    highlights: ['Industry-leading ANC', 'LDAC Hi-Res', '24h total battery', 'IPX4'],
  },
  {
    id: 31,
    name: 'Anker 737 GaNPrime 120W',
    brand: 'Logitech',
    category: 'Accessories',
    price: 89,
    stock: 70,
    rating: 4.7,
    reviews: 3142,
    image:
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=900&q=80&auto=format&fit=crop',
    shortDescription: '120W GaN · 3 ports · PPS',
    description:
      'Charge three devices simultaneously at full speed with 120W total output. GaN technology keeps it compact while powering MacBook, iPhone, and iPad.',
    highlights: ['120W total', 'GaN technology', '3 ports', 'PPS fast charge'],
  },
  {
    id: 32,
    name: 'Samsung T9 Portable SSD 2TB',
    brand: 'Samsung',
    category: 'Accessories',
    price: 219,
    stock: 25,
    rating: 4.7,
    reviews: 871,
    image:
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=900&q=80&auto=format&fit=crop',
    shortDescription: '2000 MB/s · USB 3.2 Gen 2x2',
    description:
      'Portable SSD T9 delivers 2000 MB/s read/write speeds with USB 3.2 Gen 2x2, AES 256-bit hardware encryption, and a sleek rugged design.',
    highlights: ['2000 MB/s', 'USB 3.2 Gen 2x2', 'AES 256-bit', 'Drop resistant 2m'],
  },

  // ===== GAMING =====
  {
    id: 33,
    name: 'Razer BlackWidow V4 Pro',
    brand: 'Razer',
    category: 'Gaming',
    price: 249,
    stock: 18,
    rating: 4.7,
    reviews: 612,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Razer Green switches · Chroma RGB',
    description:
      'The ultimate gaming keyboard with Razer Green tactile clicky switches, per-key Chroma RGB, dedicated media controls, and programmable macro keys.',
    isBestSeller: true,
    highlights: ['Razer Green switches', 'Chroma RGB', 'Macro keys', 'Magnetic wrist rest'],
  },
  {
    id: 34,
    name: 'Sony PlayStation 5 Pro',
    brand: 'Sony',
    category: 'Gaming',
    price: 699,
    stock: 8,
    rating: 4.9,
    reviews: 2410,
    image:
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=900&q=80&auto=format&fit=crop',
    shortDescription: '8K ready · AI upscaling · 2TB SSD',
    description:
      'PlayStation 5 Pro features an upgraded GPU with AI-driven PlayStation Spectral Super Resolution upscaling, 2TB SSD, and 8K-ready output.',
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    highlights: ['AI upscaling', '8K ready', '2TB SSD', 'Wi-Fi 7'],
  },
  {
    id: 35,
    name: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
    category: 'Gaming',
    price: 149,
    stock: 24,
    rating: 4.8,
    reviews: 1287,
    image:
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Focus Pro 30K · 63g · 90h battery',
    description:
      'Razer DeathAdder V3 Pro wireless ergonomic gaming mouse with Focus Pro 30K optical sensor, 90-hour battery, and an ultra-light 63g design.',
    highlights: ['Focus Pro 30K sensor', '63g ultra-light', '90h battery', 'HyperSpeed Wireless'],
  },
  {
    id: 36,
    name: 'ASUS ROG Ally X',
    brand: 'ASUS',
    category: 'Gaming',
    price: 799,
    stock: 11,
    rating: 4.6,
    reviews: 542,
    image:
      'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'AMD Z1 Extreme · 1080p 120Hz',
    description:
      'ASUS ROG Ally X is a premium Windows handheld gaming PC powered by AMD Ryzen Z1 Extreme, 24GB RAM, 1TB SSD, and an 80Wh battery.',
    isNew: true,
    isFeatured: true,
    highlights: ['Ryzen Z1 Extreme', '1080p 120Hz', '24GB RAM', '80Wh battery'],
  },
  {
    id: 37,
    name: 'Logitech G Pro X 2 Lightspeed',
    brand: 'Logitech',
    category: 'Gaming',
    price: 199,
    stock: 30,
    rating: 4.7,
    reviews: 871,
    image:
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'PRO-G Graphene drivers · LIGHTSPEED',
    description:
      'Designed with and for pro esports athletes. PRO-G Graphene drivers, LIGHTSPEED wireless, and 50-hour battery in a premium build.',
    highlights: ['PRO-G Graphene drivers', 'LIGHTSPEED wireless', '50h battery', 'Detachable mic'],
  },
  {
    id: 38,
    name: 'Razer Huntsman Mini',
    brand: 'Razer',
    category: 'Gaming',
    price: 119,
    oldPrice: 149,
    stock: 40,
    rating: 4.7,
    reviews: 2120,
    image:
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900&q=80&auto=format&fit=crop',
    shortDescription: '60% form factor · Linear optical',
    description:
      'Razer Huntsman Mini in a 60% form factor with Razer Linear Optical Switches, doubleshot PBT keycaps, and onboard memory for up to 5 profiles.',
    isBestSeller: true,
    highlights: ['60% form factor', 'Linear optical switches', 'Doubleshot PBT', 'Onboard memory'],
  },
  {
    id: 39,
    name: 'Logitech G923 Racing Wheel',
    brand: 'Logitech',
    category: 'Gaming',
    price: 299,
    stock: 14,
    rating: 4.5,
    reviews: 612,
    image:
      'https://images.unsplash.com/photo-1592842232655-e5d345cbc2c1?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'TRUEFORCE · 11Nm force feedback',
    description:
      'Logitech G923 racing wheel with TRUEFORCE feedback, a 11Nm brushless motor, and pro-grade construction for sim racing on Xbox and PC.',
    highlights: ['TRUEFORCE feedback', '11Nm motor', 'Pro build', 'Xbox & PC'],
  },
  {
    id: 40,
    name: 'Sony INZONE Buds 2',
    brand: 'Sony',
    category: 'Gaming',
    price: 199,
    stock: 22,
    rating: 4.4,
    reviews: 287,
    image:
      'https://images.unsplash.com/photo-1612446215898-c0c31bf2a4ee?w=900&q=80&auto=format&fit=crop',
    shortDescription: 'Low latency · 360 Spatial Audio',
    description:
      'Sony INZONE Buds 2 are true wireless gaming earbuds with low-latency 2.4GHz connection, 360 Spatial Audio, and 24-hour total battery life.',
    isNew: true,
    highlights: ['2.4GHz low latency', '360 Spatial Audio', '24h battery', 'IPX4'],
  },
]