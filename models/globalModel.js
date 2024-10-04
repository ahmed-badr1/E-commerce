const PRODUCTS_API = 'https://fakestoreapi.com/products';

export async function fetchProductId(id) {
  const response = await fetch(`${PRODUCTS_API}/${id}`);
  const result = await response.json();
  return result;
}