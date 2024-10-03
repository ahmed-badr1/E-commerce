const PRODUCTS_API = 'https://fakestoreapi.com/products';

export async function fetchProductsByCategory(param) {
  const response = await fetch(`${PRODUCTS_API}/category/${param}`);
  const result = await response.json();
  return result;
}