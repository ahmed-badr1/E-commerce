import { fetchProductsByCategory } from "../models/categoryModel.js";
import { renderProducts } from "./globalController.js";

const productsWrapper = document.querySelector('.products-content');
const headingTitle = document.querySelector('.heading');

let categoryTitle;

async function showProducts() {
  categoryTitle = getCategoryFromURL();
  const headingText = categoryTitle ? `${categoryTitle} Products` : "Category Not Found";
  headingTitle.textContent = headingText;
  let products = await fetchProductsByCategory(categoryTitle);
  renderProducts(productsWrapper, products);
}

function getCategoryFromURL() {
  const parameters = new URLSearchParams(window.location.search);
  const category = parameters.get('category');
  return category;
}


// Events & Logic


document.addEventListener('DOMContentLoaded', () => {
  showProducts();
});