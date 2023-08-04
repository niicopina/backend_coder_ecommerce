/* async function fetchCarts(){
    try {
        const response = await fetch('/api/carts')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
function renderCarts(response){
    const container = document.getElementById('carts-container')
    container.innerHTML = ''
    if(response){
    response.data.forEach(cart => {
        const cartElement = document.createElement('div')
        cartElement.innerHTML = `
            <div class="card" style="width: 18rem">
                <div class="card-body">
                    <h5 class="card-title"></h5>
                    <p class="card-text">Cart ID: ${cart._id}</p>
                    <p class="card-text">Productos: ${cart.product_id}</p>
                    <p class="card-text">Total: ${cart.quantity}</p>
                    <ul>
                    ${cart.products && cart.products.length > 0
                        ? cart.products
                    .map((product) => `<li><h5>${product.title}</h5></li>`)
                    .join('')
                    : ''}
                    </ul>            
                    <a href="#" class="btn btn-primary">buy</a>
                </div>
            </div>
        `
    container.appendChild(cartElement)
        }
    )}}
window.addEventListener('DOMContentLoaded', async () => {
try {
    const carts = await fetchCarts();
    console.log(carts); // Imprimir la respuesta en la consola
    renderCarts(carts);
} catch (error) {
    console.log(error);
}
}); */


async function fetchUserCart() {
    try {
      const response = await fetch('/api/carts/current');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderUserCart(cart) {
    const container = document.getElementById('carts-container');
    container.innerHTML = '';
  
    if (cart) {
      const cartElement = document.createElement('div');
      cartElement.innerHTML = `
        <div class="card" style="width: 18rem">
          <div class="card-body">
            <h5 class="card-title">User Cart</h5>
            <p class="card-text">Cart ID: ${cart._id}</p>
            <ul>
              ${cart.products && cart.products.length > 0
                ? cart.products
                    .map(
                      (product) => `
                        <li>
                          <h5>${product.product_id.title}</h5>
                          <p>Price: ${product.product_id.price}</p>
                        </li>
                      `
                    )
                    .join('')
                : '<li>No products in the cart</li>'}
            </ul>
            <a href="#" class="btn btn-primary">buy</a>
          </div>
        </div>
      `;
  
      container.appendChild(cartElement);
    } else {
      const cartElement = document.createElement('div');
      cartElement.innerHTML = '<p>No cart found for the user.</p>';
      container.appendChild(cartElement);
    }
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
    try {
      const userCart = await fetchUserCart();
      console.log(userCart); // Imprimir la respuesta en la consola
      renderUserCart(userCart.data);
    } catch (error) {
      console.log(error);
    }
  });