# TODO - Khmer i18n coverage

## Step 1: Extend i18n dictionaries
- Add missing Khmer + English keys for all hardcoded UI strings found in:
  - Home.vue, Products.vue, Wishlist.vue, Cart.vue, Checkout.vue
  - Login.vue, Register.vue, Orders.vue, Profile.vue
  - Footer.vue, SearchBar.vue
  - ProductCard.vue, ProductDetail.vue

## Step 2: Update components/views to use `t(key)`
- Replace all hardcoded English UI text with `{{ t('...') }}`.
- Replace aria-label / alt text where applicable with `t()`.
- Keep data-driven values (product names, categories, flags) unchanged.

## Step 3: Build & verify
- Run `npm run build`.
- Manually verify: switch language to Khmer; ensure entire UI updates (not just navbar).

