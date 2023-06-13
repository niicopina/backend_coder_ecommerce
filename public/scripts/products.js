fetch('/api/products')
    .then(res=>res.json())
    .then(res=>{
        let templates = res.products.map(each=>{
        let template = `
        <div class="card" style="width: 10rem">
        <img src='${each.thumbnail}' class="card-img-top" style="width: 10rem; height: 8rem">
        <div class="card-body">
            <h5 class="card-title">${each.title}</h5>
            <p class="card-text">${each.description}</p>
            <a href="/product?id=${each.id}" class="btn btn-primary">+ info</a>
        </div>
        </div>
        `
        return template
    }).join('')
    document.getElementById('products-container').innerHTML = templates})
    
    .catch(err=>console.log(err))