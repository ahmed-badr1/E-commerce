const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;

export async function fetchProductsByCategory(param) {
  const response = await fetch(`${PRODUCTS_API}/category/${param}`);
  const result = await response.json();
  return result;
}