import { fetchCategories, fetchProducts } from "../models/homeModel.js";
import { renderProducts, descriptionAppearance } from "./globalController.js";

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
const moreBtnProducts = document.querySelector('.products-preview .more-products');

document.addEventListener('DOMContentLoaded', () => {
  showCategories()
  showProducts(4);

  // Event to show all or part of the product description
  document.addEventListener('click', descriptionAppearance);

  // Event to show all or part of products
  moreBtnProducts.addEventListener('click', function () {
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
