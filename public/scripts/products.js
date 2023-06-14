fetch('/api/products')
    .then(res=>res.json())
    .then(res=>{
        let templates = res.products.map(each=>{
        let template = `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card m-2" style="width: 12rem">
                <img src='${each.thumbnail}' class="card-img-top p-6">
                <div class="card-body flex-column d-flex justify-content-center">
                    <h5 class="card-title text-center">${each.title}</h5>
                    <p class="card-text text-center">${each.description}</p>
                    <a href="/product?id=${each.id}" class="btn btn-primary">+ info</a>
                </div>
            </div>
        </div>
        `
        return template
    }).join('')
    document.getElementById('products').innerHTML = templates})
    
    .catch(err=>console.log(err))
/* fetch('/api/products')
    .then(res=>res.json())
    .then(res=>res.products.map(each=>{
        let template = `
        
        `
    })) */