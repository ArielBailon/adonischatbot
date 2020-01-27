'use strict'

const Usuario = use('App/Models/Usuario')
const Bot = use('App/Models/Bot')
const Chat = use('App/Models/Chat')
const GlobalFunc = use('App/Common')
const Helper = use('App/Controllers/Http/HelperController')



class ChatController {

  async inicio ({ response, request, view, session}) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    const data =  await Usuario.findById( session.get('id_usuario') )

    const results = await Chat.find({ id_usuario: data.id })

    // results.push(data.nombres)

    // console.log(data.nombres)

    return view.render('/chat', {results: results})
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

  async get_id_chat ({ response, request, session }) {
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

  async saludo_inicial ({ response, request, session }) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    // let id_bot = session.get('id_bot')

    // const helper = new Helper()

    // helper.helper_saludo(id_bot)

    // Esta función se necesita llamar en otro controlador, buscar manera de tener funciones globales

      try {
        let id_bot = session.get('id_bot')

        const dataBot = await Bot.findById(id_bot)

        let info = []

        info.push(dataBot.conversacion.saludo_inicial)
        info.push(dataBot.configuracion.nombre)

        // console.log(info);

        return info

      } catch (err) {
        console.error(err.message)
      }

  }

  async chat_cliente ({ response, request, view, session}) {

    return view.render('/chatcliente', )
  }

}

module.exports = ChatController
