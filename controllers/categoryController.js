import { fetchProductsByCategory } from "../models/categoryModel.js";
import { renderProducts, descriptionAppearance, productsPopup, closeProductPopup } from "./globalController.js";

const productsWrapper = document.querySelector('.products-content');
const headingTitle = document.querySelector('.heading');

async function showProducts() {
  const categoryTitle = getCategoryFromURL();
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
document.addEventListener('DOMContentLoaded', async () => {
  await showProducts();

  // Event To Make Popup For Each Product
  const everyProduct = document.querySelectorAll('.products-content .product');
  everyProduct.forEach(product => product.addEventListener('click', productsPopup));

  // Event to close product popup when click close button
  document.addEventListener('click', closeProductPopup);

  // Event to show all or part of the product description
  const toggleDescriptionBtn = document.querySelectorAll('.products-preview .more-desc');
  toggleDescriptionBtn.forEach(btn => btn.addEventListener('click', descriptionAppearance))
});