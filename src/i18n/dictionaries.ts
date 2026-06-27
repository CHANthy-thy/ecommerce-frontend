export type Lang = 'kh' | 'en'

export const dictionaries: Record<Lang, Record<string, string>> = {
  kh: {
    'home.hero.kicker': 'ស្កូរខ្ញុំ',
    'home.hero.title.line1': 'ជម្រើសសក្កដាភ្លើង',
    'home.hero.title.line2': 'សម្រាប់ស្បែកស្រស់ស្អាត',
    'home.hero.title.line3': 'របស់អ្នក',

    'home.cta.shopNew': 'ទិញសម្រកថ្មី',
    'home.cta.serumDeals': 'រសយារស្កូរ',

    'home.hero.pills.shipping': 'ដឹកជញ្ជូនឥតគិតថ្លៃលើការបញ្ជាទិញលើ $50',
    'home.hero.pills.returns': 'សងប្រាក់វិញក្នុងរយៈពេល 30 ថ្ងៃ',
    'home.hero.pills.warranty': 'ធានាកម្លាំងការថែទាំស្បែក',

    'home.hero.desc': 'យើងផ្តល់ជូននូវស្កូរដែលមានគុណភាពខ្ពស់ និងការធានាផលិតផលស្កូរ។',

    'nav.home': 'ទំព័រដើម',
    'nav.products': 'ផលិតផល',
    'nav.wishlist': 'បញ្ជីប្រាថ្នា',
    'nav.cart': 'កន្ត្រកទិញ',
    'nav.orders': 'ការបញ្ជាទិញ',
    'nav.profile': 'គណនី',
    'nav.login': 'ចូល',
    'nav.register': 'ចុះឈ្មោះ',

    'nav.lang': 'ភាសា',
    'nav.lang.kh': 'ខ្មែរ',
    'nav.lang.en': 'English',

    'nav.theme': 'រូបរាង',
    'nav.theme.light': 'ពន្លឺ',
    'nav.theme.dark': 'ងងឹត',

    'pages.home.title': 'ទំព័រដើម',
    'pages.products.title': 'ផលិតផល',
    'pages.wishlist.title': 'បញ្ជីប្រាថ្នា',
    'pages.cart.title': 'កន្ត្រកទិញ',
    'pages.checkout.title': 'ទូទាត់',
    'pages.orders.title': 'ការបញ្ជាទិញរបស់ខ្ញុំ',
    'pages.profile.title': 'ប្រវត្តិរូប',
    'pages.productNotFound': 'រកមិនឃើញផលិតផល',

    'actions.backToShop': 'ត្រឡប់ទៅហាង',
    'actions.continueShopping': 'បន្តទិញ',
    'actions.browseProducts': 'ស្វែងរកផលិតផល',
    'actions.addToCart': 'ដាក់ចូលកន្ត្រកទិញ',
    'actions.save': 'រក្សាទុក',
    'actions.saved': 'បានរក្សាទុក',
    'actions.placeOrder': 'ដាក់ការបញ្ជាទិញ',
    'actions.viewOrders': 'មើលការបញ្ជាទិញ',

    'products.head.title': 'ទិញគ្រប់យ៉ាង',
    'products.head.subtitle': 'ផលិតផល {{count}} មុខ · អ្វីថ្មី​ចុងក្រោយក្នុងស្កូរ និងការថែទាំស',
    'products.search.placeholder': 'ស្វែងរកស្កូរ ម៉ាក…',
    'products.filters.category': 'ប្រភេទ',
    'products.filters.country': 'ប្រទេស',
    'products.filters.priceMin': 'តម្លៃអប្បបរមា',
    'products.filters.priceMax': 'តម្លៃអតិបរមា',
    'products.filters.rating': 'ការវាយតម្លៃ',
    'products.filters.sort': 'តម្រៀប',
    'products.filters.shippingType': 'ប្រភេទដឹកជញ្ជូន',

    'products.filters.option.all': 'ទាំងអស់',
    'products.filters.option.local': 'ក្នុងស្រុក',
    'products.filters.option.international': 'អន្តរជាតិ',

    'products.sidebar.categories': 'ប្រភេទ',
    'products.sidebar.categories.all': 'ប្រភេទទាំងអស់',
    'products.sidebar.countries': 'ប្រទេស',
    'products.sidebar.brands': 'ម៉ាក',

    'products.clear': 'លុបតម្រង',
    'products.promo.help': 'ត្រូវការជំនួយក្នុងការជ្រើសរើស?',
    'products.promo.desc': 'និយាយជាមួយអ្នកជំនាញស្កូររបស់យើង 24/7',

    'products.empty.title': 'រកមិនឃើញផលិតផល',
    'products.empty.desc': 'សាកល្បងស្វែងរក ឬជ្រើសប្រភេទផ្សេង',

    'cart.head.title': 'កន្ត្រកទិញរបស់អ្នក',
    'cart.head.subtitle': '{{count}} មុខទំនិញនៅក្នុងកន្ត្រក',
    'cart.empty.title': 'កន្ត្រកទិញរបស់អ្នកទទេ',
    'cart.empty.desc': 'បន្ថែមផលិតផល ដើម្បីចាប់ផ្តើមការបញ្ជាទិញ',
    'cart.continue.shopping': 'ស្វែងរកផលិតផល',
    'cart.summary.title': 'សេចក្តីសង្ខេបការបញ្ជាទិញ',
    'cart.qty.inStockShips': 'មានក្នុងស្តុក · ដឹកជញ្ជូនក្នុង 1–2 ថ្ងៃ',

    'wishlist.head.title': 'បញ្ជីប្រាថ្នារបស់អ្នក',
    'wishlist.head.subtitle': '{{count}} បានរក្សាទុក',
    'wishlist.empty.title': 'មិនទាន់មានអ្វីដែលបានរក្សាទុកទេ',
    'wishlist.empty.desc': 'ចុចលើរូបបេះដូមនៅលើផលិតផល ដើម្បីរក្សាទុកសម្រាប់ពេលក្រោយ',
    'wishlist.empty.cta': 'ស្វែងរកផលិតផល',
    'wishlist.addToCart': 'ដាក់ចូលកន្ត្រកទិញ',

    'checkout.success.title': 'ការបញ្ជាទិញបានដាក់ជោគជ័យ!',
    'checkout.success.desc': 'ការបញ្ជាទិញ <strong>#{{id}}</strong> របស់អ្នកត្រូវបានដាក់ដោយជោគជ័យ',
    'checkout.success.viewOrders': 'មើលការបញ្ជាទិញរបស់ខ្ញុំ',
    'checkout.success.continue': 'បន្តទិញ',

    'checkout.empty.title': 'កន្ត្រកទិញរបស់អ្នកទទេ',
    'checkout.empty.desc': 'បន្ថែមផលិតផលមុនពេលធ្វើការទូទាត់',
    'checkout.empty.cta': 'ស្វែងរកផលិតផល',

    'checkout.head.title': 'ទូទាត់',
    'checkout.head.subtitle': 'ជិតរួចហើយ។ ពិនិត្យព័ត៌មានរបស់អ្នក ហើយដាក់ការបញ្ជាទិញ។',

    'checkout.field.fullName': 'ឈ្មោះពេញ',
    'checkout.field.phone': 'លេខទូរស័ព្ទ',
    'checkout.field.address': 'អាសយដ្ឋាន',
    'checkout.field.city': 'ទីក្រុង',
    'checkout.field.zip': 'ZIP / Postal',

    'checkout.payment.card.title': 'ប័ណ្ណឥណទាន/ឥណពន្ធ',
    'checkout.payment.card.desc': 'Visa, Mastercard, Amex',
    'checkout.payment.paypal.title': 'PayPal',
    'checkout.payment.paypal.desc': 'ទូទាត់ដោយសុវត្ថិភាពជាមួយ PayPal',
    'checkout.payment.cod.title': 'ដឹកជញ្ជូនយកប្រាក់',
    'checkout.payment.cod.desc': 'បង់ប្រាក់ពេលអ្នកទទួលបានការបញ្ជាទិញ',

    'checkout.summary.title': 'សេចក្តីសង្ខេបការបញ្ជាទិញ',
    'checkout.summary.subtotal': 'ចំណែករង',
    'checkout.summary.shipping': 'ថ្លៃដឹកជញ្ជូន',
    'checkout.summary.total': 'សរុប',
    'checkout.summary.placeOrder': 'ដាក់ការបញ្ជាទិញ',
    'checkout.note': 'ដោយដាក់ការបញ្ជាទិញ អ្នកយល់ព្រមតាម លក្ខខណ្ឌ និងគោលការណ៍ឯកជនភាពរបស់យើង។',

    'orders.head.title': 'ការបញ្ជាទិញរបស់ខ្ញុំ',
    'orders.head.subtitle': 'តាមដាន មើល និងគ្រប់គ្រងការទិញរបស់អ្នក។',
    'orders.empty.title': 'មិនមានការបញ្ជាទិញទេ',
    'orders.empty.desc': 'ពេលអ្នកដាក់ការបញ្ជាទិញ វានឹងបង្ហាញនៅទីនេះ។',
    'orders.empty.cta': 'ចាប់ផ្តើមទិញ',
    'orders.reorder': 'បញ្ជាទិញម្ដងទៀត',
    'orders.viewDetails': 'មើលព័ត៌មានលម្អិត',

    'orders.status.All': 'ទាំងអស់',
    'orders.status.Processing': 'កំពុងដំណើរការ',
    'orders.status.Shipped': 'បានដឹកជញ្ជូន',
    'orders.status.Delivered': 'បានទទួល',
    'orders.status.Cancelled': 'បានលុប',
    'orders.item.qty': 'បរិមាណ',

    'profile.personal': 'ព័ត៌មានផ្ទាល់ខ្លួន',
    'profile.password': 'ផ្លាស់ប្តូរលេខសម្ងាត់',
    'profile.preferences': 'ចំណូលចិត្ត',
    'profile.side.orders': 'ការបញ្ជាទិញរបស់ខ្ញុំ',
    'profile.side.wishlist': 'បញ្ជីប្រាថ្នារបស់ខ្ញុំ',

    'profile.card.personal.title': 'ព័ត៌មានផ្ទាល់ខ្លួន',
    'profile.card.personal.desc': 'ធ្វើបច្ចុប្បន្នភាពព័ត៌មានគណនី និងអាសយដ្ឋានដឹកជញ្ជូន។',

    'profile.field.name': 'ឈ្មោះពេញ',
    'profile.field.email': 'អ៊ីមែល',
    'profile.field.phone': 'លេខទូរស័ព្ទ',
    'profile.field.country': 'ប្រទេស',
    'profile.field.address': 'អាសយដ្ឋាន',

    'profile.action.saveChanges': 'រក្សាទុកការផ្លាស់ប្តូរ',
    'profile.action.saved': 'បានរក្សាទុក',

    'profile.card.password.title': 'ផ្លាស់ប្តូរលេខសម្ងាត់',
    'profile.card.password.desc': 'ជ្រើសរើសលេខសម្ងាត់ដែលរឹងមាំ ដែលអ្នកមិនប្រើនៅកន្លែងផ្សេង។',

    'profile.card.preferences.title': 'ចំណូលចិត្ត',
    'profile.card.preferences.desc': 'កំណត់របៀបដែល SkinCare Haven ទាក់ទងជាមួយអ្នក។',

    'profile.pref.newsletter.title': 'ព្រឹត្តិប័ត្រព័ត៌មាន (Email)',
    'profile.pref.newsletter.desc': 'ព័ត៌មានស្កូរថ្មី ការបញ្ចុះតម្លៃ និងជម្រើសប្រចាំសប្ដាហ៍។',
    'profile.pref.sms.title': 'ការអាប់ដេតតាម SMS',
    'profile.pref.sms.desc': 'ព័ត៌មានស្ថានភាពការបញ្ជាទិញតាមសារខ្លី។',

    'profile.theme.title': 'រូបរាង',

    'auth.login.welcome': 'សូមស្វាគមន៍មកវិញ',
    'auth.login.subtitle': 'ចូលដើម្បីបន្តការទិញស្កូររបស់អ្នក។',
    'auth.login.email': 'អ៊ីមែល',
    'auth.login.password': 'លេខសម្ងាត់',
    'auth.login.rememberMe': 'ចាំខ្ញុំ',
    'auth.login.forgot': 'ភ្លេចលេខសម្ងាត់?',
    'auth.login.submit': 'ចូល',
    'auth.login.createAccount': 'បង្កើតគណនី',

    'auth.register.title': 'បង្កើតគណនីរបស់អ្នក',
    'auth.register.subtitle': 'ចូលរួម SkinCare Haven ក្នុងរយៈពេលប៉ុន្មានវិនាទី។',
    'auth.register.name': 'ឈ្មោះពេញ',
    'auth.register.confirmPassword': 'បញ្ជាក់លេខសម្ងាត់',
    'auth.register.terms': 'ខ្ញុំយល់ព្រមតាម',
    'auth.register.privacy': 'គោលការណ៍ឯកជនភាព',
    'auth.register.submit': 'បង្កើតគណនី',
    'auth.register.signIn': 'ចូល',

    'product.notFound.title': 'រកមិនឃើញផលិតផល',
    'product.notFound.backToShop': 'ត្រឡប់ទៅហាង',
    'product.tabs.description': 'ការពិពណ៌នា',
    'product.tabs.specs': 'លក្ខណៈពិសេស',
    'product.tabs.reviews': 'ការវាយតម្លៃ',
  } as const,

  en: {
    'home.hero.kicker': 'SkinCare Haven',
    'home.hero.title.line1': 'Skincare Essentials',
    'home.hero.title.line2': 'For Healthy Glowing Skin',
    'home.hero.title.line3': 'Delivered Fast',

    'home.cta.shopNew': 'Shop New Arrivals',
    'home.cta.serumDeals': 'Serum Deals',

    'home.hero.pills.shipping': 'Free shipping on orders over $50',
    'home.hero.pills.returns': '30-day money-back guarantee',
    'home.hero.pills.warranty': 'Dermatologist-tested products',

    'home.hero.desc': 'Discover premium skincare essentials with high-quality formulations for all skin types.',

    'nav.home': 'Home',
    'nav.products': 'Products',

    'nav.wishlist': 'Wishlist',
    'nav.cart': 'Cart',
    'nav.orders': 'Orders',
    'nav.profile': 'Profile',
    'nav.login': 'Login',
    'nav.register': 'Register',

    'nav.lang': 'Language',
    'nav.lang.kh': 'Khmer',
    'nav.lang.en': 'English',

    'nav.theme': 'Theme',
    'nav.theme.light': 'Light',
    'nav.theme.dark': 'Dark',

    'pages.home.title': 'Home',
    'pages.products.title': 'Products',
    'pages.wishlist.title': 'Wishlist',
    'pages.cart.title': 'Cart',
    'pages.checkout.title': 'Checkout',
    'pages.orders.title': 'My Orders',
    'pages.profile.title': 'Profile',
    'pages.productNotFound': 'Product not found',

    'actions.backToShop': 'Back to shop',
    'actions.continueShopping': 'Continue shopping',
    'actions.browseProducts': 'Browse products',
    'actions.addToCart': 'Add to cart',
    'actions.save': 'Save',
    'actions.saved': 'Saved',
    'actions.placeOrder': 'Place order',
    'actions.viewOrders': 'View my orders',
  }
}