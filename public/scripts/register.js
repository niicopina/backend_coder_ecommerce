const form = document.getElementById('newUser')
form.addEventListener('submit', (event)=>{
    event.preventDefault()
    let data = {
        first_name: document.querySelector('#first_name').value,
        last_name: document.querySelector('#last_name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
})


/* fetch(`/api/cookies/set/${email}`)
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err)) */
/* document.getElementById('cookie').addEventListener('submit', (e)=>{
    e.preventDefault()
    fetch('/api/cookies/get')
        .then(res=res.json())
        .then(res=>alert(res.cookies.user))
        .catch(err=>console.log(err))
}) */