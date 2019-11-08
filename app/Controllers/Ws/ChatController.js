'use strict'
const RiveScript = require('rivescript');
const Chalk = require('chalk');
const bot = new RiveScript();

class ChatController {
  constructor({
    socket,
    request
  }) {
    this.socket = socket
    this.request = request
    this.bot = bot
    this.cargar()
    console.log('socket connectado')
  }

  onMessage(message) {
    this.socket.emitTo('message', message, [this.socket.id])
    this.respuesta_bot(message)
  }

  respuesta_bot(message){
    this.bot.sortReplies()
    this.bot.reply('chat', message.body).then((reply) => {
      //console.log(Chalk.green('Bot: ' + reply));
      this.socket.emitTo('message', {body:reply, username:'Chatbot'}, [this.socket.id])
    });
  }

  arreglarbot(){
    this.bot.sortReplies()
  }

  cargar(){
    this.bot.loadFile('public/training_data.rive')
    .then()
    .catch((error) => console.log(error));
  }
}
  module.exports = ChatController
