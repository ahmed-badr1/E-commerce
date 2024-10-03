// This File Is For Global Functions That Are Used For More Than One File

export function renderProducts(productsWrapper, products) {
  productsWrapper.innerHTML = '';

  products.forEach(product =>
    productsWrapper.innerHTML += `
      <div id="${product.id}" class="product">
        <div class="image">
          <button class="love"><i class="fa-regular fa-heart fa-xl"></i></button>
          <img src=${product.image} alt=${product.title}>
          <button class="cart">Add To Cart</button>
        </div>
        <div class="info">
          <div class="text">
            <p class="title">${product.title}</p>
            <p class="description less">${product.description}</p>
            <button class='more-desc closed'>more</button>
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
    `
  );
}

export function productDetails() {
  
}