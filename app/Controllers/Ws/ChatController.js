'use strict'

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }


async onMessage ({message}) {
  await this.socket.broadcastToAll('message', message)
  }
}

module.exports = ChatController
