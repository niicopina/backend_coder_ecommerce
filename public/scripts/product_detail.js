const params = new URLSearchParams()
const id = params.get('id')

fetch('/api/products/'+id)
    .then(res=>res.json())
    //.then(res=>console.log(res))
    .then(res=>{
        let template = `
        <div class="card" style="width: 18rem">
            <img src='' class="card-img-top" style="width: 10rem; height: 8rem">
            <div class="card-body">
                <h5 class="card-title">${res.product.name}</h5>
                <p class="card-text">${res.product.description}</p>
                <input type='number'>
                <input type='button' value='add to cart'>
            </div>
        </div>
        `
        document.getElementById('product').innerHTML = template
    })
    .catch(err=>console.log(err))