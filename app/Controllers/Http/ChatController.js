'use strict'

const Usuario = use('App/Models/Usuario')
const Cliente = use('App/Models/Cliente')
const Bot = use('App/Models/Bot')
const Chat = use('App/Models/Chat')
const GlobalFunc = use('App/Common')
const Helper = use('App/Controllers/Http/HelperController')

class ChatController {

  async inicio ({ response, request, view, session}) {
    if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}

    const usuario =  await Usuario.findById( session.get('id_empresa') )

    const results = await Chat.find({ id_empresa: usuario.id })

    // results.push(usuario.nombres)

    // console.log(usuario.nombres)

    return view.render('/chat', {results: results})
  }

  async crear_chat ({ params, response, session }) {
    //if(!session.get('id_empresa')){response.redirect('/iniciars', false)}
    let id_empresa = (params.id_empresa) ? params.id_empresa:session.get('id_empresa')

    try {
      const usuario = await Usuario.findById(id_empresa)
        // Usar para retornar el número de chats creado según usuario para crear chats dinámicos cuando se realize una subscripción a un chat nuevo
        // const results = await Chat.find({ id_empresa : usuario.id })
        const results = await Chat.find().limit(1).sort({ id_chat: -1})
        console.log(results)
          const nuevoChat = new Chat({
            id_empresa : usuario.id,
            id_chat: results[0].id_chat + 1
          })
      await nuevoChat.save()
      return results[0].id_chat + 1
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

      const prueba = await this.guardar_chat_cliente(body.mensajes)
      const dataRetornar = [ usuario.id, results.length, prueba]

      // console.log(dataRetornar);

      return dataRetornar

    } catch (err) {
      console.error(err.message)
    }
  }

  async guardar_chat_cliente (mensajes) {
    let update = {
                  chat: {
                    id_chat : 'default',
                    mensajes
                  }
                }
    try {
      let nuevoChatCliente = await Cliente.findOneAndUpdate(
        { nombres: 'default' },
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
    if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}

    try {
      const data = request.post()
      console.log(data.chatId);
      const chat = await Chat.find({ id_empresa: session.get('id_empresa'), id_chat: data.chatId })
      // console.log(chat);

      chat[0].asignado = session.get('id_usuario')
      // return dataRetornar

      // console.log(session.all());

      // console.log(chat);

      await chat[0].save()

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
