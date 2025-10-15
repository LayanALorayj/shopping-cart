export const fetchProduct = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return response.json();
};
