import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export interface Category {
  slug: string;
  name: string;
}

interface ProductStore {
  categories: Category[];
  products: Product[];
  selectedCategory: string;
  loading: boolean;
  error: string | null;

  fetchCategories: () => Promise<void>;
  fetchProducts: (category: string) => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  categories: [],
  products: [],
  selectedCategory: "",
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true });
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

      const categories: Category[] = filtered.map((slug) => ({
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
      }));

      set({ categories, loading: false });
    } catch {
      set({ error: "Failed to load categories", loading: false });
    }
  },

  fetchProducts: async (category) => {
    try {
      set({ loading: true });
      const res = await fetch(`https://dummyjson.com/products/category/${category}`);
      const data = await res.json();
      set({ products: data.products || [], loading: false });
    } catch {
      set({ error: "Failed to load products", loading: false });
    }
  },

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category });
    get().fetchProducts(category);
  },
}));
