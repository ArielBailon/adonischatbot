'use strict'


const Bot = use('App/Models/Bot')

class BotController {
  async crear_bot ({request, view}) {
    const body = request.post()
    const nuevoBot = new Bot({
      // saludo_inicial: body.saludo_inicial,
      // forma_solicitar_nombre: body.forma_solicitar_nombre,
      // preguntar_correo: body.preguntar_correo,
      // preguntar_telefono: body.preguntar_telefono,
      // forma_solicitar_horario_llamada: body.forma_solicitar_horario_llamada,
      // preguntar_num_documento: body.preguntar_num_documento,
      // preguntas_adicionales: body.preguntas_adicionales,
      // cierre_conversacion: body.cierre_conversacion,
      // saludo_final: body.saludo_final
    })
    await nuevoBot.save()
    return view.render('conversacion')
  }

}

module.exports = BotController
