import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services';
import type { Product } from '../types/product';

export const useProduct = (id?: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct(Number(id));
    }
  }, [id, fetchProduct]);

  return { product, loading, error };
};

export default useProduct;
