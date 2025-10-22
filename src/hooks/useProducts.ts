import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services';
import type { Product } from '../types/product';

interface Category {
  slug: string;
  name: string;
}

export const useProducts = (category?: string) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    }
  }, []);

  const fetchProducts = useCallback(async (cat: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProducts(cat);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const catSlug = category || 'all';
    fetchProducts(catSlug);
  }, [category, fetchProducts]);

  return { categories, products, loading, error };
};

export default useProducts;
