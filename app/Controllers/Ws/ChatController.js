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
    // console.log(this.request)
  }

}
  module.exports = ChatController
