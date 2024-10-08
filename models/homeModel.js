const PRODUCTS_API = import.meta.env.VITE_PRODUCTS_API;

export async function fetchProducts(query) {
  const response = await fetch(PRODUCTS_API + (query ? `?limit=${query}` : ''));
  const result = await response.json();

  return result;
}

export async function fetchCategories() {
  const response = await fetch(`${PRODUCTS_API}/categories`);
  const result = await response.json();
  return result;
}