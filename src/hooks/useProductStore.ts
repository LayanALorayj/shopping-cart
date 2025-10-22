import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '../types/product';

interface ProductStore {
  products: Product[];
  currentProduct: Product | null;
  categories: string[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  
  setProducts: (products: Product[]) => void;
  setCurrentProduct: (product: Product | null) => void;
  setCategories: (categories: string[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  clearFilters: () => void;
}

const useProductStore = create<ProductStore>()(
  devtools(
    (set) => ({
      products: [],
      currentProduct: null,
      categories: [],
      loading: false,
      error: null,
      searchQuery: '',
      selectedCategory: null,
      
      setProducts: (products: Product[]) => set({ products }),
      setCurrentProduct: (product: Product | null) => set({ currentProduct: product }),
      setCategories: (categories: string[]) => set({ categories }),
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),
      clearFilters: () => set({ searchQuery: '', selectedCategory: null }),
    }),
    {
      name: 'product-store',
    }
  )
);

export default useProductStore;
