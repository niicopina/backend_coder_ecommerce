import {Router} from "express";

const cookies_router = Router()

//seteamos cookie con firma (con la prop signed la cookie queda firmada)
cookies_router.get('/set',(req,res)=>{
    return res.status(200).cookie(
        'nombre_de_la_clave',
        'objeto',
        {maxAge: 200000, signed: true}
    ).json({
        success: true,
        message: 'cookie seteada'
    })
})
//leemos una cookie
cookies_router.get('/',(req,res)=> {
    //console.log(req)
    return res.status(200).json({
        success: true,
        cookies: req.cookies
    })
})
//leemos cookie con firma
cookies_router.get('/get', (req,res)=>{
    return res.status(200).json({
        success: true,
        cookies: req.signedCookies
    })
})
cookies_router.get('/delete',(req,res)=>{
    return res.status(200).clearCookie('nombre_de_la_clave').json({
        success: true,
        message: 'cookie borrada'
    })
})
//setear cookie con mail
cookies_router.get('/set/:email',(req,res)=>{
    const {email} = req.params
    return res.status(200).cookie(
        'user',
        email,
        {maxAge: 60000, signed: true}
    ).json({
        success: true,
        message: 'cookie seteada'
    })
})

export default cookies_router