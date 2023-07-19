const form = document.getElementById('loginForm')
form.addEventListener('submit',event=>{
    event.preventDefault()
    let data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
    }
    fetch(`/api/auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>alert(err))
})
document.getElementById('ghlogin').addEventListener('click', event=>{
    event.preventDefault()
    fetch(`/api/auth/github`,{method: 'GET'})
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>alert(err))
     //window.location.href = '/api/auth/github';
     //window.location.replace('/home.html')
})
/* document.getElementById('ghlogin').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = '/api/auth/github';
});
 */

document.getElementById('signout').addEventListener('submit', event=>{
    event.preventDefault()
    fetch(`/api/auth/signout`,{method: 'POST'})
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})


/* document.getElementById('login').addEventListener('submit',event=>{
    event.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log({email, password})
    fetch('/api/sessions/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({email, password})
    })
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
}) */