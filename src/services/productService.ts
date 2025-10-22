import apiClient from './apiClient';
import type { Product } from '../types/product';

interface Category {
  slug: string;
  name: string;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

class ProductService {
  private categoriesCache: Category[] | null = null;

  async getProducts(category?: string, limit = 20): Promise<Product[]> {
    const endpoint = category === 'all' || !category
      ? `/products?limit=${limit}`
      : `/products/category/${category}`;
    
    const response = await apiClient.get<ProductsResponse>(endpoint);
    return response.products;
  }

  async getProduct(id: number): Promise<Product> {
    return apiClient.get<Product>(`/products/${id}`);
  }

  async getCategories(): Promise<Category[]> {
    if (this.categoriesCache) {
      return this.categoriesCache;
    }

    const categories = await apiClient.get<string[]>('/products/category-list');
    const girlCategories = [
      'beauty',
      'womens-dresses',
      'womens-shoes',
      'womens-watches',
      'womens-bags',
      'womens-jewellery',
    ];
    
    const filtered = categories.filter((slug) => girlCategories.includes(slug));
    const formatted = filtered.map((slug) => ({
      slug,
      name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' '),
    }));

    this.categoriesCache = formatted;
    return formatted;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await apiClient.get<ProductsResponse>(`/products/search?q=${encodeURIComponent(query)}`);
    return response.products;
  }
}

export default new ProductService();
