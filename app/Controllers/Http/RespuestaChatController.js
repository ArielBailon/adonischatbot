'use strict'
const fs = use('fs');

const RespuestaChat = use('App/Models/RespuestaChat')
const Bot = use('App/Models/Bot')

class RespuestaChatController {

  async inicio ({ view, session }) {

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )
    const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )

    const sitio_web = querySitio.sitio_web
    const sitios_web = querySitios

    return view.render('chatbot.respuestas', { sitio_web:sitio_web, sitios_web:sitios_web })
  }

  async conversacion ({ view, session }) {
    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )
    const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )

    const sitio_web = querySitio.sitio_web
    const sitios_web = querySitios

    return view.render('chatbot.conversacion', { sitio_web:sitio_web, sitios_web:sitios_web })
  }

  async guardar_post({request, response, view}){
    const body = request.post()
    const respuestaChat = new RespuestaChat()

    // Destructurar la respuesta
    // let { respuesta1 } = body

    // Del body separar las preguntas de la respuesta transformando de objeto a array
    const arrayPreguntas = Object.values(body);
    // Obtener el último valor del array, pues el último siempre es la respuesta
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
    fs.appendFile('config/rivescripts/bot1_empresa1_socket1.rive', contenidoRive, function (err) {
      if (err) throw err;
      console.log('Se creó el archivo rive correctamente');
    });

    // Reemplazar usando regex el archivo rive

    // fs.readFile('config/rivescripts/bot1_empresa1_socket1.rive', 'utf8', (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //     var result = data.replace(/+ pregunta 3/g, '+ pregunta 4 reemplazada');

    //   fs.appendTo('config/rivescripts/bot1_empresa1_socket1.rive', result, 'utf8', function (err) {
    //      if (err) return console.log(err);
    //   });

    // });

    //   var fs = require('fs')
    //    fs.readFile(someFile, 'utf8', function (err,data) {
    //   if (err) {
    //     return console.log(err);
    //   }
    //   var result = data.replace(/string to be replaced/g, 'replacement');

    //   fs.writeFile(someFile, result, 'utf8', function (err) {
    //      if (err) return console.log(err);
    //   });
    // });

    // respuestaChat.guardar_respuesta(arrayPreguntas, respuesta)
    return response.redirect('/chatbot/respuestas')
}

}

module.exports = RespuestaChatController
