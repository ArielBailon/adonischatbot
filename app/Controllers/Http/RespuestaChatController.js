'use strict'
const fs = use('fs');

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

  async guardar_post({request, view}){
    const body = request.post()
    const respuestaChat = new RespuestaChat()

    // Destructurar la respuesta
    // let { respuesta1 } = body

    // Del body separar las preguntas de la respuesta transformando de objeto a array
    const arrayPreguntas = Object.values(body);
    const respuesta = arrayPreguntas.splice(-1,1)

    // Variable para ejecutar en la creación del archivo rive
    let contenidoRive = ``

    // Recorrer el array de preguntas y guardar en variable contenidoRive
    arrayPreguntas.forEach(function(pregunta) {
      let contenido = `
+ ${pregunta.toLowerCase()}
- ${respuesta}
`
      contenidoRive += contenido

    });

    // Crear o reemplazar el archivo rive
    fs.writeFileSync('config/rivescripts/bot1_empresa1_socket1.rive', contenidoRive, function (err) {
      if (err) throw err;
      console.log('Se creó el archivo rive correctamente');
    });

    // respuestaChat.guardar_respuesta(arrayPreguntas, respuesta)
    return view.render('respuestas')
}

  async conversacion ( { view } ) {
    return view.render('conversacion')
  }


}

module.exports = RespuestaChatController
