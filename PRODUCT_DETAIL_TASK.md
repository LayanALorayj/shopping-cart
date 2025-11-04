# Product Detail Page - Simple Task Guide

## What You Need to Build
Create a product detail page that shows all the information about a single product when someone clicks on it.

## Step 1: Create the Main Page
**File to create:** `src/pages/ProductDetailPage.tsx`

This page should:
- Show when user visits `/product/123` (where 123 is the product ID)
- Display all product information nicely
- Let users add the product to their cart

## Step 2: What the Page Should Show

### Basic Product Info (at the top)
- Product name
- Price
- Rating (stars)
- Brand
- "Add to Cart" button

### Product Images
- Show the main product image
- Show smaller thumbnail images if there are multiple

### Product Details (in tabs)
**Tab 1 - Overview:**
- Product description
- Tags

**Tab 2 - Details:**
- Size (width, height, depth)
- Weight
- SKU number

**Tab 3 - Reviews:**
- List of customer reviews
- Each review shows: rating, comment, reviewer name, date

## Step 3: Update the Store
Add this to `src/store/useProductStore.ts`:

```typescript
// Add these to the store
currentProduct: AsyncState<Product | null>;
loadProduct: (id: number) => Promise<void>;
```

## Step 4: Create API Function
**File to create:** Add to `src/api/products.ts`

```typescript
export const fetchProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
};
```

## Step 5: Simple Component Structure
Create these files in `src/components/product/`:

1. `ProductHeader.tsx` - Shows title, price, rating, add to cart button
2. `ProductImages.tsx` - Shows product images
3. `ProductTabs.tsx` - Shows the tabs with overview, details, reviews
4. `ProductDetailPage.css` - Styles for the page

## Step 6: Connect to Cart
Use the existing cart context to add products to cart when user clicks "Add to Cart".

## What You Need to Know
- Look at existing pages like `HomePage.tsx` and `ProductsPage.tsx` for examples
- Use the same styling approach as other pages
- The product data structure is already updated in the store

## Simple Checklist
- [/] Create `ProductDetailPage.tsx`
- [/] Add route for `/product/:id`
- [/] Update store to fetch single product
- [/] Create API function to get product by ID
- [/] Show product images
- [/] Show product info in tabs
- [/] Add "Add to Cart" button that works
- [/] Make it look good on mobile

## Need Help?
- Check how other pages are built
- Look at the existing cart functionality
- Ask if you get stuck on any step
