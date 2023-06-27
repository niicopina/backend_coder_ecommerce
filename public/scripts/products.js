/* function getProducts(page = 1, title = ''){
 fetch(`/api/products?page=${page}&title=${encodeURIComponent(title)}`)
    .then(res=>res.json())
    .then(res=>{
        let templates = res.data.map(each=>{
        let template = `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card m-2" style="width: 12rem">
                <img src='${each.thumbnail}' class="card-img-top p-6">
                <div class="card-body flex-column d-flex justify-content-center">
                    <h5 class="card-title text-center">${each.title}</h5>
                    <p class="card-text text-center">${each.description}</p>
                    <a href="/product_detail.html?id=${each.id}" class="btn btn-primary">+ info</a>
                </div>
            </div>
        </div>
        `
        return template
    }).join('')
    document.getElementById('products').innerHTML = templates
    generatePagination(res.pagination)
    })
    .catch(err=>console.log(err))
} */
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderProducts(response) {
  const container = document.getElementById('products');
  container.innerHTML = '';

  if (response) {
    response.data.forEach((product) => {
      const productElement = document.createElement('div');
      productElement.innerHTML = `
        <div class="col">
          <div class="card h-100">
            <img src="${product.thumbnail}" class="card-img-top p-6">
            <div class="card-body">
              <h5 class="card-title text-center">${product.title}</h5>
              <p class="card-text text-center">${product.description}</p>
              <a href="/product_detail.html?id=${product.id}" class="btn btn-primary">+ info</a>
            </div>
          </div>
        </div>
      `;

      container.appendChild(productElement);
    });
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const products = await fetchProducts();
    console.log(products); // Imprimir la respuesta en la consola
    renderProducts(products);
  } catch (error) {
    console.log(error);
  }})

/* function generatePagination(pagination) {
    const currentPage = pagination.currentPage;
    const totalPages = pagination.totalPages;
  
    let paginationHTML = '';
    // Botón para la página anterior
    if (pagination.previousPage) {
      paginationHTML += `
                <button class="btn btn-primary me-2" 
                onclick="getProducts(${pagination.previousPage}, '${pagination.title}')">Anterior</button>`;
    }
    // Botones para las páginas intermedias
    for (let page = 1; page <= totalPages; page++) {
      if (page === currentPage) {
        paginationHTML += `<button class="btn btn-primary me-2 active">${page}</button>`;
      } else {
        paginationHTML += `
            <button class="btn btn-primary me-2" onclick="getProducts(${page},
                 '${pagination.title}')">${page}</button>`;
      }
    }
    // Botón para la página siguiente
    if (pagination.nextPage) {
      paginationHTML += `
        <button class="btn btn-primary me-2" onclick="getProducts(${pagination.nextPage},
             '${pagination.title}')">Siguiente</button>`;
    }
    document.getElementById('pagination').innerHTML = paginationHTML;
  }  
getProducts(); */