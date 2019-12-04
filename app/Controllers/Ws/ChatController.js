'use strict'

class ChatController {
  constructor({
    socket,
    request
  }) {
    this.socket = socket
    this.request = request
    console.log('socket conectado')
  }

  onMessage(message) {
    this.socket.broadcastToAll('message', message, [this.socket.id])
    // console.log(this.socket.id)
  }

}
  module.exports = ChatController
