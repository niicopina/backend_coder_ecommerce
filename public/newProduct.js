const form = document.getElementById('newProductForm')
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const title = document.getElementById('name').value
    const description = document.getElementById('description').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    const code = document.getElementById('code').value
    const stock = document.getElementById('stock').value

    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json'
            },
            body: JSON.stringify({
            title, description, price, thumbnail, code, stock
        })
        })
        if(response.ok){
            alert('product created')
            window.location.href = '/products'
        } else {
            const errorData = await response.json()
            alert(`Error: ${errorData.message}`)
        }
    }catch(error){
        console.error('Error:', error);
        alert('An error occurred');
    }})