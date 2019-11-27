'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RespuestaChat extends Model {
  async guardar_respuesta(arregloPreguntas, respuesta){
    const respuestaChat = new RespuestaChat()
      respuestaChat.arregloPreguntas = arregloPreguntas
      respuestaChat.respuesta = respuesta[0]
    await respuestaChat.save()
}

  async leer_respuestas () {
    const respuestaChat = new RespuestaChat()
    const respuestas = await respuestaChat.all()
    return respuestas
  }
}

module.exports = RespuestaChat
