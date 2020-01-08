'use strict'
const RiveScript = require('rivescript');
const bot = new RiveScript({utf8: true});

class ChatController {
  constructor({
    socket,
    request,
    session
  }) {
    this.socket = socket
    this.request = request
    this.bot = bot
    this.cargar()
    // Usar sesiones para identificar por id qué archivo de rivescript cargar
    // this.session = session
    // console.log(session.get('id_bot'))

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
}
  module.exports = ChatController
