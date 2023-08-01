const params = new URLSearchParams(location.search)
console.log(params)
const pid = params.get('id')
console.log(pid)

fetch(`/api/products/${pid}`)
    .then(res=>res.json())
    .then(res=>{
        let product = res.data
        let template =`
        <div class="card" style="width: 18rem">
            <img src=${product.thumbnail} class="card-img-top" style="width: 10rem; height: 8rem">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.price}</p>
                <input type='number'>
                <input type='button' id="addToCartBtn" value='add to cart'>
            </div>
        </div>
        `
        document.getElementById('product').innerHTML = template

        const addToCartBtn = document.getElementById('addToCartBtn')
        addToCartBtn.addEventListener('click',()=>{
            const params = new URLSearchParams(location.search)
            const productId = params.get('id')
            console.log(productId)
            const quantityInput = document.querySelector('input[type="number"]')
            const quantity = parseInt(quantityInput.value)
            //`/api/products/${productId}`
            fetch(`/:cid/addProduct/productId`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    product_id: productId,
                    quantity})
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data)
            })
            .catch(err=>{console.log(err)})
        })
    })
    .catch(err=>console.log(err))


/*     //`/api/products/${productId}`
    fetch(`/api/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_id: productId,
            quantity})
    })
    .then(res=> res.json())
    .then(data=>{
        const cartId = data.data._id
    })
    .catch(err=>{console.log(err)})
})
}) */