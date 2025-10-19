import { useState, useEffect, useCallback } from "react";
import type { Product } from "../types/ProductTypes";

interface Category {
  slug: string;
  name: string;
}


let categoriesCache: Category[] | null = null; 

// Fetch all products for a category
export const useProducts = (category?: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    if (categoriesCache) return; 
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
      const formatted = filtered.map((slug) => ({
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " "),
      }));
      setCategories(formatted);
    } catch {
      setError("Failed to load categories");
    }
  }, []);

  const fetchProducts = useCallback(async (cat: string) => {
    setLoading(true);
    setError(null);
    try {
      const endpoint =
        cat === "all"
          ? "https://dummyjson.com/products?limit=20"
          : `https://dummyjson.com/products/category/${cat}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      setProducts(data.products || []);
    } catch {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);


 useEffect(() => {
    const catSlug = category || "all";
    fetchProducts(catSlug);
  }, [category, fetchProducts]);

  return { categories, products, loading, error };
};

//Fetch single product by ID
export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dummyjson.com/products/${productId}`);
      const data = await res.json();
      setProduct(data);
    } catch {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) fetchProduct(Number(id));
  }, [id, fetchProduct]);

  return { product, loading, error };
};


export const fetchProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
};
