'use strict'

const RespuestaChat = use('App/Models/RespuestaChat')
class RespuestaChatController {
  async indice ({ response }) {
    let respuesta = await RespuestaChat.all()

    return response.json(respuesta)
  }

  async mostrar({ params, response}) {
    const respuesta = await RespuestaChat.find(params.id)

    return response.json(respuesta)
  }

  async guardar ({response, request}) {
    const infoRespuesta = request.only(['respuesta_chat'])

    const respuesta = new RespuestaChat()
    respuesta.respuesta_chat = infoRespuesta.respuesta_chat

    await respuesta.save()
    return response.status(201).json(respuesta)
  }


  async actualizar({ params, request, response}) {
    const infoRespuesta = request.only(['respuesta_chat'])

    const respuesta = await RespuestaChat.find(params.id)
    if (!respuesta) {
      return response.status(404).json({ data:'No se encontraron datos'})
    }

    respuesta.respuesta_chat = infoRespuesta.respuesta_chat

    await respuesta.save()

    return response.status(200).json(respuesta)
  }

  async eliminar({ params, response}) {
    const respuesta = await RespuestaChat.find(params.id)
    if (!respuesta) {
      return response.status(404).json({ data:'No se encontraron datos'})
    }

    await respuesta.delete()

    return response.status(204).json(null)


  }
}

module.exports = RespuestaChatController
