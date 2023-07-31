/* import twilio from 'twilio'
import config from '../config/config.js'

const cliente = twilio(twilio_sid, twilio_token)

const sendSms = (nombre, apellido) => cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: twilio_phone,
    to: my_phone
})
const sendWhatsapp = (nombre, apellido) => cliente.messages.create({
    body: `Gracias por tu compra ${nombre} ${apellido}`,
    from: 'whatsapp+17625256124',
    to: my_phone
})

export default sendSms */