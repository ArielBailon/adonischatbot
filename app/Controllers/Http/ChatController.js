'use strict'

const Usuario = use('App/Models/Usuario')
const Cliente = use('App/Models/Cliente')
const Bot = use('App/Models/Bot')
const Chat = use('App/Models/Chat')
const GlobalFunc = use('App/Common')
const Helper = use('App/Controllers/Http/HelperController')

class ChatController {

  async inicio ({ response, request, view, session}) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const usuario =  await Usuario.findById( session.get('id_empresa') )

    const results = await Chat.find({ id_empresa: usuario.id })

    // results.push(usuario.nombres)
    // console.log(usuario.nombres)

    return view.render('/chat', {results: results, id_usuario: session.get('id_usuario')})
  }

  async prueba ({ response, request, view, session}) {
    //if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}
    //return response.send("Hola mundo " + session.get('id_empresa'));
    return view.render('prueba');
  }

  async vista_chat ({ params, response, request, view, session}) {
      //return response.send("Hola mundo " + params.token_1 + " 2: " + params.token_2);
      return view.render('/chatbot/popup_chat')
  }


  async crear_chat ({ params, response, session }) {
    //if(!session.get('id_empresa')){response.redirect('/iniciars', false)}
    let id_empresa = (params.id_empresa) ? params.id_empresa:session.get('id_empresa')

    try {
      const usuario = await Usuario.findById(id_empresa)
        // Usar para retornar el número de chats creado según usuario para crear chats dinámicos cuando se realize una subscripción a un chat nuevo
        // const results = await Chat.find({ id_empresa : usuario.id })
        const results = await Chat.find().limit(1).sort({ id_chat: -1})
        let id_chat = (results.length > 0)?results[0].id_chat + 1 : 1
          const nuevoChat = new Chat({
            id_empresa : usuario.id,
            id_chat: id_chat
          })
      await nuevoChat.save()
      return id_chat
      //return session.get('id_empresa');

    } catch (err) {
      console.error(err.message)
    }


  }

  async get_id_chat ({ params, response, request, session }) {
    //if(!session.get('id_empresa')){response.redirect('/iniciars', false)}
    const body = request.post()

    let id_empresa = (body.token) ? body.token:session.get('id_empresa')

    try {
      const usuario = await Usuario.findById( id_empresa)
      // Usar para retornar el número de chats creado según usuario para crear chats dinámicos cuando se realize una subscripción a un chat nuevo
      const results = await Chat.find({ id_empresa: usuario.id })

      const prueba = await this.guardar_chat_cliente(body.mensajes, body.id_chat)
      const dataRetornar = [ usuario.id, results.length, prueba]

      // console.log(dataRetornar);

      return dataRetornar

    } catch (err) {
      console.error(err.message)
    }
  }

  async guardar_chat_cliente (mensajes, id_chat) {
    let update = {
                  chat: {
                    mensajes
                  }
                }
    try {
      let nuevoChatCliente = await Cliente.findOneAndUpdate(
        { id_cliente: id_chat },
        { $set: update },
        { new: true, upsert: true }
      );
      return nuevoChatCliente
    } catch (err) {
      console.error(err.message)
    }
    return update
  }

  async asignar_usuario ({ response, request, session }) {
    //if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}
    try {
      const data = request.post()
      let id_empresa = (data.token) ? data.token:session.get('id_empresa')

      const chat = await Chat.find({ id_empresa: id_empresa, id_chat: data.chatId })
      const clientes = await Cliente.find({ id_cliente: data.chatId })
      // console.log(chat);

      chat[0].asignado = session.get('id_usuario')
      // return dataRetornar
      // console.log(session.all());
      // console.log(chat);

      await chat[0].save()
      return clientes[0].chat.mensajes
    } catch (err) {
      console.error(err.message)
    }

  }

  async saludo_inicial ({ response, request, session }) {
    if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}

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

  async probar_chat ({ request, session, view }) {

    const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
    const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

    const sitio_web = session.get('sitio_bot')
    const sitios_web = querySitios
    const nombre_bot = dataBot.nombre
    const id_bot = dataBot.id

    // console.log(dataBot.configuracion.tipo_industria)

    return view.render('probarChat', { sitio_web, sitios_web, nombre_bot, id_bot })

  }

}

module.exports = ChatController
