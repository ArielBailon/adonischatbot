'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Cliente = use('App/Models/Cliente')


class ClienteController {

  async guardar_chat_cliente ({request, response, view, session}) {

    const body = request.post()

    // try {
    //   const nuevoChatCliente = new Cliente({
    //     id_cuenta: session.get('id_usuario'),
    //     chatbot: {
    //       id_chat: session.get('id_bot'),
    //       mensajes: JSON.stringify(body.mensajes)
    //     }
    //   })
    //
    //   // console.log(session.get('id_usuario'))
    //
    //   await nuevoChatCliente.save()
    //
    //   // console.log('saved');
    //
    // } catch (err) {
    //   console.error(err.message)
    // }

    try {
      let nuevoChatCliente = await Cliente.findOneAndUpdate(
        { id_cuenta: params.id_empresa },
        { $set:
          chat: {
                id_chat : params.id_empresa,
                mensajes :  JSON.stringify(body.mensajes)
              }
            },
        { new: true, upsert: true }
      );
    } catch (err) {
      console.error(err.message)
    }

    // console.log(session.get('id_bot'))

    return response.redirect('/chatr')
  }
}

module.exports = ClienteController
