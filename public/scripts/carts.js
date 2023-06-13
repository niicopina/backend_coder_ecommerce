async function fetchCarts(){
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
                    <p class="card-text">Total: ${cart.total}</p>
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
});
