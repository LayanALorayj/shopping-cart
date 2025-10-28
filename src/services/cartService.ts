import apiClient from './apiClient';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

interface Cart {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

class CartService {
  async getCart(cartId: number): Promise<Cart> {
    return apiClient.get<Cart>(`/carts/${cartId}`);
  }

  async getUserCarts(userId: number): Promise<{ carts: Cart[] }> {
    return apiClient.get<{ carts: Cart[] }>(`/carts/user/${userId}`);
  }

  async addToCart(cartId: number, productId: number, quantity = 1): Promise<Cart> {
    return apiClient.put<Cart>(`/carts/${cartId}`, {
      products: [{ id: productId, quantity }],
    });
  }

  async updateCartItem(cartId: number, productId: number, quantity: number): Promise<Cart> {
    return apiClient.put<Cart>(`/carts/${cartId}`, {
      products: [{ id: productId, quantity }],
    });
  }

  async removeFromCart(cartId: number, productId: number): Promise<Cart> {
    return apiClient.delete<Cart>(`/carts/${cartId}/products/${productId}`);
  }

  async createCart(userId: number, products: Array<{ id: number; quantity: number }>): Promise<Cart> {
    return apiClient.post<Cart>('/carts/add', {
      userId,
      products,
    });
  }
}

export default new CartService();