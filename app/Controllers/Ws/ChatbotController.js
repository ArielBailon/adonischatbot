'use strict'
const RiveScript = require('rivescript');
const bot = new RiveScript({utf8: true});

class ChatController {
  constructor({
    socket,
    request
  }) {
    this.socket = socket
    this.request = request
    this.bot = bot
    this.cargar()
    console.log('socket conectado')
  }

  onMessage(message) {
    this.socket.emitTo('message', message, [this.socket.id])
    this.respuesta_bot(message)
  }

  respuesta_bot(message){
    this.bot.sortReplies()
    this.bot.reply('chat', message.body).then((reply) => {
      //console.log(Chalk.green('Bot: ' + reply));
      this.socket.emitTo('message', { body:reply, username:'Chatbot' }, [this.socket.id])
    });
  }

  cargar(){
    this.bot.loadDirectory('config/rivescripts')
    .then(console.log('El bot leyó los archivos rive correctamente'))
    .catch((error) => console.log(error));

  }

  // start_chat({ view }){
  //   let ws = adonis.Ws().connect()

  //   ws.on('open', (datos) => {
  //     let clase = 'connected'
  //     // $('.connection-status').addClass('connected')
  //     // $('.messages').append(`
  //     //   <div class="message"><h3> ${datos.nombre} </h3> <p> ${datos.saludo_inicial} </p> </div>
  //     // `)
  //      view.render('chatbot', { clase: clase })

  //     subscribeToChannel()
  //   })

  //   ws.on('error', () => {
  //     $('.connection-status').removeClass('connected')
  //   })
  // }
}
  module.exports = ChatController
