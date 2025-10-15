import { create } from "zustand";
import { subscribeWithSelector, devtools } from "zustand/middleware";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Category {
  slug: string;
  name: string;
}

interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface ProductStore {
  categories: AsyncState<Category[]>;
  products: AsyncState<Product[]>;
  selectedCategory: string;
  categoriesFetched: boolean;
  testCounter: number;

  // Actions
  loadCategories: () => Promise<void>;
  loadProducts: (category: string) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  resetError: () => void;
  incrementTest: () => void;
}

const createAsyncState = <T>(initialData: T): AsyncState<T> => ({
  data: initialData,
  loading: false,
  error: null,
});

// Request deduplication
const pendingRequests = new Map<string, Promise<any>>();

export const useProductStore = create<ProductStore>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      categories: createAsyncState<Category[]>([]),
      products: createAsyncState<Product[]>([]),
      selectedCategory: "",
      categoriesFetched: false,
      testCounter: 0,

      loadCategories: async () => {
        const state = get();
        
        // If already fetched or currently loading, return existing promise or do nothing
        if (state.categoriesFetched || state.categories.loading) {
          return;
        }

        const requestKey = 'categories';
        
        // Check if request is already pending
        if (pendingRequests.has(requestKey)) {
          return pendingRequests.get(requestKey);
        }

        const request = (async () => {
          set((state) => ({
            categories: { ...state.categories, loading: true, error: null }
          }), false, 'categories/loadStart');

          try {
            const res = await fetch("https://dummyjson.com/products/category-list");
            const data: string[] = await res.json();

            const girlCategories = [
              "beauty",
              "womens-dresses",
              "womens-shoes",
              "womens-watches",
              "womens-bags",
              "womens-jewellery",
            ];

            const filtered = data.filter((slug) => girlCategories.includes(slug));

            const categoriesData: Category[] = filtered.map((slug) => ({
              slug,
              name: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
            }));

            set(() => ({
              categories: {
                data: categoriesData,
                loading: false,
                error: null,
              },
              categoriesFetched: true,
            }), false, 'categories/loadSuccess');
          } catch (error) {
            set((state) => ({
              categories: {
                ...state.categories,
                loading: false,
                error: "Failed to load categories",
              }
            }), false, 'categories/loadError');
          } finally {
            pendingRequests.delete(requestKey);
          }
        })();

        pendingRequests.set(requestKey, request);
        return request;
      },

      loadProducts: async (category) => {
        const requestKey = `products-${category}`;
        
        // Check if request is already pending for this category
        if (pendingRequests.has(requestKey)) {
          return pendingRequests.get(requestKey);
        }

        const request = (async () => {
          set((state) => ({
            products: { ...state.products, loading: true, error: null }
          }), false, 'products/loadStart');

          try {
            const res = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await res.json();
            
            set(() => ({
              products: {
                data: data.products || [],
                loading: false,
                error: null,
              }
            }), false, 'products/loadSuccess');
          } catch (error) {
            set((state) => ({
              products: {
                ...state.products,
                loading: false,
                error: "Failed to load products",
              }
            }), false, 'products/loadError');
          } finally {
            pendingRequests.delete(requestKey);
          }
        })();

        pendingRequests.set(requestKey, request);
        return request;
      },

      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category }, false, 'category/select');
      },

      resetError: () => {
        set((state) => ({
          categories: { ...state.categories, error: null },
          products: { ...state.products, error: null },
        }), false, 'error/reset');
      },

      incrementTest: () => {
        set((state) => ({
          testCounter: state.testCounter + 1
        }), false, 'test/increment');
      },
    })),
    {
      name: 'product-store',
      enabled: true,
    }
  )
);
