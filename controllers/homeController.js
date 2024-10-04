import { fetchCategories, fetchProducts } from "../models/homeModel.js";
import { renderProducts, descriptionAppearance, productsPopup, closeProductPopup } from "./globalController.js";

const productsWrapper = document.querySelector('.products-content');
const categoriesWrapper = document.querySelector('.categories-content .pagination');

let categories;

async function showProducts(query) {
  let products = await fetchProducts(query);
  renderProducts(productsWrapper, products);
}

async function showCategories() {
  categories = await fetchCategories();
  renderCategories();
}

function renderCategories() {
  categories.forEach((category) =>
    categoriesWrapper.innerHTML += `
      <a href="views/category.html?category=${encodeURIComponent(category)}"><li>${category}</li></a>
    `
  );
}

// Events & Logic
const moreProductsBtn = document.querySelector('.products-preview .more-products');

document.addEventListener('DOMContentLoaded', async () => {
  await showProducts(4);
  await showCategories();

  // Event To Make Popup For Each Product Thorw Parent Because it's Static HTML
  const everyProduct = document.querySelector('.products-content');
  everyProduct.addEventListener('click', productsPopup);

  // Event to close product popup when click close button
  document.addEventListener('click', closeProductPopup);

  // Event to show all or part of the product description
  // TODO => There Is Problem On Propagation to stop it i wanna adding event directly on element
  // TODO => But in this case the event will be removed if i renderd new products by API.
  const toggleDescriptionBtnDelegate = document.querySelector('.products-content');
  toggleDescriptionBtnDelegate.addEventListener('click', descriptionAppearance);

  // Event to show all or part of products
  moreProductsBtn.addEventListener('click', function () {
    if (this.classList.contains('closed')) {
      this.classList.remove('closed');
      showProducts()
      this.firstElementChild.textContent = 'Less';
    } else {
      this.classList.add('closed');
      showProducts(4);
      this.firstElementChild.textContent = 'All Products';
    }
  });
});