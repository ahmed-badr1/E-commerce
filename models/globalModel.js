const PRODUCTS_API = process.evn.REACT_APP_PRODUCTS_API;

export async function fetchProductId(id) {
  const response = await fetch(`${PRODUCTS_API}/${id}`);
  const result = await response.json();
  return result;
}