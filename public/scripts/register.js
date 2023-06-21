document.getElementById('register').addEventListener('click', (e)=>{
    e.preventDefault()
    let email = document.getElementById('email').value
    fetch(`/api/cookies/set/${email}`)
        .then(res=>res.json())
        .then(res=>alert(res.message))
        .catch(err=>console.log(err))
})
document.getElementById('cookie').addEventListener('click', (e)=>{
    e.preventDefault()
    fetch('/api/cookies/get')
        .then(res=res.json())
        .then(res=>alert(res.cookies.user))
        .catch(err=>console.log(err))
})