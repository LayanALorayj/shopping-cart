export type Product = {
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
};

export type Category = {
  slug: string;
  name: string;
};

export type AsyncState<T> = {
  data: T;
  loading: boolean;
  error: string | null;
};

export type ProductSlice = {
  // State
  categories: AsyncState<Category[]>;
  products: AsyncState<Product[]>;
  currentProduct: AsyncState<Product | null>;
  selectedCategory: string;
  categoriesFetched: boolean;

  // Actions
  loadCategories: () => Promise<void>;
  loadProducts: (category: string) => Promise<void>;
  loadProduct: (id: number) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  clearCurrentProduct: () => void;
  resetError: () => void;
};
