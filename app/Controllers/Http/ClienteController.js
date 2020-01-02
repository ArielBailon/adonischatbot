'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Cliente = use('App/Models/Cliente')


class ClienteController {

  async guardar_chat_cliente ({request, response, view, session}) {

    const body = request.post()

    try {

      const nuevoChatCliente = new Cliente({
        id_cuenta: session.get('id_usuario'),
        chatbot: {
          bot_id: session.get('id_bot'),
          mensajes: JSON.stringify(body.mensajes)
        }
      })

      // console.log(session.get('id_usuario'))

      await nuevoChatCliente.save()

      console.log('saved');

    } catch (err) {
      console.error(err.message)
    }

    // console.log(session.get('id_bot'))

    return response.redirect('/chatr')
  }
}

module.exports = ClienteController
