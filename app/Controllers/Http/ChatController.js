'use strict'

const Usuario = use('App/Models/Usuario')

class ChatController {

  async inicio ({ response, request, view, auth}) {
    return view.render('/chat')
  }
}

module.exports = ChatController
