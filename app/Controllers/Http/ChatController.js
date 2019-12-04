'use strict'

const Usuario = use('App/Models/Usuario')
const Chat = use('App/Models/Chat')


class ChatController {

  async inicio ({ response, request, view, session}) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    const data =  await Usuario.findById( session.get('id_usuario') )

    return view.render('/chat', {data: data})
  }

  async crear_chat ({ response, session }) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    try {
      const data = await Usuario.findById( session.get('id_usuario'))
        // Usar para retornar el número de chats creado según usuario para crear chats dinámicos cuando se realize una subscripción a un chat nuevo
        const results = await Chat.find({ id_usuario: data.id })
        // console.log(results.length)
          const nuevoChat = new Chat({
            id_usuario : data.id,
            id_chat: results.length + 1
          })
      await nuevoChat.save()
      return results.length + 1

    } catch (err) {
      console.error(err.message)
    }

  }

  async getid_chat ({ response, request, session }) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    try {
      const data = await Usuario.findById( session.get('id_usuario'))
        // Usar para retornar el número de chats creado según usuario para crear chats dinámicos cuando se realize una subscripción a un chat nuevo
      const results = await Chat.find({ id_usuario: data.id })

      const dataRetornar = [ data.id, results.length]

      // console.log(dataRetornar);

      return dataRetornar


    } catch (err) {
      console.error(err.message)
    }

  }



}

module.exports = ChatController
