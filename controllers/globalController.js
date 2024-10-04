import { fetchProductId } from "../models/globalModel.js";
// This File Is For Global Functions That Are Used For More Than One File

function createProductHTML(product, configuration=true) {
  return `
    <div id="${product.id}" class="product">
      <div class="image">
        <button class="love"><i class="fa-regular fa-heart fa-xl"></i></button>
        <img src=${product.image} alt=${product.title}>
        <button class="cart">Add To Cart</button>
      </div>
      <div class="info">
        <div class="text">
          <p class="title">${product.title}</p>
          <p class="description ${configuration ? 'less' : ''}">${product.description}</p>
          ${configuration ? "<button class='more-desc closed'>more</button>" : ''}
        </div>
        <p class="price">${product.price}</p>
        <div class="rating">
          <p class="percent">${product.rating.rate}</p>
          <div class="stars">
            ${'<i class="full fa-solid fa-star"></i>'.repeat(Math.round(product.rating.rate))}
            ${'<i class="empty fa-regular fa-star"></i>'.repeat(5 - Math.round(product.rating.rate))}
          </div>
          <p class="rate-count">(${product.rating.count})</p>
        </div>
      </div>
    </div>
  `;
}

export function renderProducts(productsWrapper, products) {
  productsWrapper.innerHTML = '';
  products.forEach(product => productsWrapper.innerHTML +=  createProductHTML(product));
}

// Make Popup For Every Product it's Contains Details
export async function productsPopup(event) {
  const popupWrapper = document.createElement('div');
  popupWrapper.className = 'popup-wrapper';

  popupWrapper.innerHTML += (`
    <div class="popup-overlay"></div>
    <div class="popup-box">
      <button class="close-popup">X</button>
      ${createProductHTML(await fetchProductId(event.target.closest('.product').id), false)}
    </div>
  `);
  document.querySelector('.popup-content').appendChild(popupWrapper);
}

export function closeProductPopup(event) {
  if (event.target.classList.contains("close-popup")) {
    event.target.closest('.popup-wrapper').remove();
  }
}


// Events & Logic
export function descriptionAppearance(event) {
  const btn = event.target;
  if (btn.classList.contains('more-desc')) {
    event.stopPropagation();
    console.log('test');
    if (btn.classList.contains('closed')) {
      btn.previousElementSibling.classList.remove('less');
      btn.classList.remove('closed');
      btn.textContent = 'Less';
    } else {
      btn.previousElementSibling.classList.add('less');
      btn.classList.add('closed');
      btn.textContent = 'More';
    }
  }
}