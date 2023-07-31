import nodemailer from 'nodemailer'
const {config: {
    gmail_user_app,
    gmail_pass_app
}} = require('../config/config')

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmail_user_app ,
        pass: config.gmail_pass_app
    }
})

exports.sendMail = async() => {
    return await transport.sendMail({
        from: 'Coder Test',
        to: 'projectodigitalgen@gmail.com',
        subject: 'correo de prueba',
        html: `<h1>Esto es un correo de prueba</h1>`,
        attachments: [{
            filename: 'node',
            path: __dirname + '/nodejs.png',
            cid: 'nodejs'
    }]
    })
}