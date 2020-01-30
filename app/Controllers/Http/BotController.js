'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const GlobalFunc = use('App/Common')

const fs = use('fs');

class BotController {

  async inicio ({ view }) {
    return view.render('chatbot')
  }

  async configuracion ({ params, view, session }) {

    try {

      if(params.id_bot){
        // console.log(params.id_bot)
        session.put('id_bot', params.id_bot)

        const querySitio = await Bot.findById( params.id_bot )

        session.put('sitio_bot', querySitio.sitio_web)
      }

      const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
      const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

      const sitio_web = session.get('sitio_bot')
      const sitios_web = querySitios
      const nombre_bot = dataBot.nombre
      const configuracion = dataBot.configuracion
      const id_bot = dataBot.id

      // console.log(dataBot.configuracion.tipo_industria)


      return view.render('chatbot.configuracion', { sitio_web, sitios_web, nombre_bot, configuracion, id_bot })

    } catch (err) {
      console.error(err.message)
    }
  }

  async actualizar_configuracion ({ request, params, view, session }) {

    const body = request.only(['nombre_robot', 'industria', 'idioma', 'activado'])

    console.log(body);


    try {

      if(params.id_bot){
        // console.log(params.id_bot)
        session.put('id_bot', params.id_bot)

        const querySitio = await Bot.findById( params.id_bot )

        session.put('sitio_bot', querySitio.sitio_web)
      }

      // Actualizar solo un field de un subdocumento
      await Bot.findByIdAndUpdate( session.get('id_bot') , {
        $set: {
          'configuracion.nombre': body.nombre_robot,
          'configuracion.tipo_industria': body.industria,
          'configuracion.idioma': body.idioma,
          'configuracion.activado': body.activado

      }
      })

      const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
      const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

      const sitio_web = session.get('sitio_bot')
      const sitios_web = querySitios
      const nombre_bot = dataBot.nombre
      const configuracion = dataBot.configuracion
      const id_bot = dataBot.id

      // console.log(dataBot.configuracion.tipo_industria)


      return view.render('chatbot.configuracion', { sitio_web, sitios_web, nombre_bot, configuracion, id_bot })

    } catch (err) {
      console.error(err.message)
    }
  }

  async apariencia ({ params, view, session }) {

    try {

      if(params.id_bot){
        // console.log(params.id_bot)
        session.put('id_bot', params.id_bot)

        const querySitio = await Bot.findById( params.id_bot )

        session.put('sitio_bot', querySitio.sitio_web)
      }

      const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
      const dataBot = await Bot.findById( session.get('id_bot'))

      // console.log(dataBot);

      const sitio_web = session.get('sitio_bot')
      const sitios_web = querySitios
      const apariencia = dataBot.apariencia
      const id_bot = dataBot.id

      return view.render('chatbot.apariencia', { sitio_web, sitios_web, apariencia, id_bot })

    } catch (err) {
      console.error(err.message)
    }


  }

  async respuestas ({ params, view, session }) {

    try {

      if(params.id_bot){
        // console.log(params.id_bot)
        session.put('id_bot', params.id_bot)

        const querySitio = await Bot.findById( params.id_bot )

        session.put('sitio_bot', querySitio.sitio_web)
      }

      const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
      const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

      const sitio_web = session.get('sitio_bot')
      const sitios_web = querySitios
      const respuestas = dataBot.respuestas
      const id_bot = dataBot.id

      return view.render('chatbot.respuestas', { sitio_web, sitios_web, respuestas, id_bot })

    } catch (err) {
      console.error(err.message)
    }
  }

  async conversacion ({ params, view, session }) {

    try {

      if(params.id_bot){
        // console.log(params.id_bot)
        session.put('id_bot', params.id_bot)

        const querySitio = await Bot.findById( params.id_bot )

        session.put('sitio_bot', querySitio.sitio_web)
      }

      const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
      const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

      const sitio_web = session.get('sitio_bot')
      const sitios_web = querySitios
      const conversacion = dataBot.conversacion
      const id_bot = dataBot.id

      return view.render('chatbot.conversacion', { sitio_web, sitios_web, conversacion, id_bot })

    } catch (err) {
      console.error(err.message)
    }

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
    arrayPreguntas.forEach( (pregunta) => {
      let contenido = `
+ ${pregunta.toLowerCase()}
- ${respuesta}
`
      contenidoRive += contenido

    });

    // Crear o reemplazar el archivo rive
    fs.appendFile('config/rivescripts/bot1_empresa1_socket1.rive', contenidoRive, (err) => {
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

  async crear_bot ({request, response, view, session}) {
    const data = await Usuario.findById(session.get('id_usuario')).populate('usuario', ['id'])

    const dataBot = await Bot.findOne({ empresa: data.id })

    session.put('id_bot', dataBot.id)
    session.put('sitio_bot', dataBot.sitio_web)

    // console.log(session.all())

    const body = request.post(['nombreBot', 'sitioWeb'])

    const nuevoBot = new Bot({
      empresa: data.id,
      sitio_web: body.sitioWeb,
      "configuracion.nombre": body.nombreBot
    })
    await nuevoBot.save()
    return response.redirect('/chatbot/configuracion/'+dataBot.id)
  }


  async actualizar_conversacion ({request, response, view, session}) {

    const body = request.post()

    // console.log(request.body.preguntar_horario_llamada);

    try {

      console.log(body);

      // Variable para ejecutar en la creación del archivo rive
      let contenidoRive = ``

      let contenidoCorreo =`
> topic correo

  + mi correo es *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?.{topic=telefono}

  + mi correo *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?.{topic=telefono}

  + mi mail *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?.{topic=telefono}

  + mi email *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?.{topic=telefono}

  + mi e-mail *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?.{topic=telefono}

  // Si no matchea, volver a pedir correo
  + *
  * <get name> != undefined => ${body.forma_solicitar_datos}
  - ¿Podrías repertirme tu correo por favor?{topic=correofinal}

< topic

> topic correofinal

  + *
  - <set correo=<star>>Bien, ¿podrías dejarme tu teléfono?{topic=telefono}

< topic
`
      let contenidoTelefono =`
> topic telefono

  + mi telefono es *
  - <set telefono=<star>>Su teléfono <get telefono>{topic=telefono}

  + mi telefono *
  - <set telefono=<star>>Su teléfono <get telefono>{topic=telefono}

  + #
  - <set telefono=<star>>Su teléfono <get telefono>{topic=telefono}

  // Si no matchea, volver a pedir telefono
  + *
  - ¿Podrías repertirme tu teléfono por favor?{topic=telefonofinal}

< topic

> topic telefonofinal

  + *
  - <set telefono=<star>>Bien <get telefono>, random fin de obtención de datos?{topic=random}

< topic

`

if (body.preguntar_correo == '1') {

// Cuerpo para guardar en contenidoRive
var contenido = `
! version = 2.0

+ *
- ${body.forma_solicitar_nombre}{topic=nombre}

> topic nombre

//-- Casos donde se obtiene el nombre inicio --//
  + mi nombre es *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

  + mi nombre *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

  + le saluda *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

  + yo soy *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

  + soy *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

//-- Casos donde se obtiene el nombre fin--//

  // Si no matchea, volver a pedir nombre
  + *
  - ¿Podrías repertirme tu nombre por favor?{topic=nombrefinal}

< topic

> topic nombrefinal

  + *
  - <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu correo?{topic=correo}

< topic
${contenidoCorreo}
`
} if (body.preguntar_correo == '2') {

  if (body.preguntar_telefono == '1') {

// Cuerpo para guardar en contenidoRive
contenido += `
! version = 2.0

+ *
- ${body.forma_solicitar_nombre}{topic=nombre}

> topic nombre

//-- Casos donde se obtiene el nombre inicio --//
+ mi nombre es *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

+ mi nombre *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

+ le saluda *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

+ yo soy *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

+ soy *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

//-- Casos donde se obtiene el nombre fin--//

// Si no matchea, volver a pedir nombre
+ *
- ¿Podrías repertirme tu nombre por favor?{topic=nombrefinal}

< topic

> topic nombrefinal

+ *
- <set nombre=<formal>>Bien <get nombre>, ¿podrías dejarme tu teléfono?{topic=telefono}

< topic
${contenidoTelefono}
`
} if (body.preguntar_telefono == '2') {
  // Cuerpo para guardar en contenidoRive
contenido += `
! version = 2.0

+ *
- ${body.forma_solicitar_nombre}

> topic nombre

//-- Casos donde se obtiene el nombre inicio --//
+ mi nombre es *
- <set nombre=<formal>>Bien <get nombre>, ¿Tiene un horario preferido para contactarlo?{topic=horariollamada}

+ mi nombre *
- <set nombre=<formal>>Bien <get nombre>, ¿Tiene un horario preferido para contactarlo?{topic=horariollamada}

+ le saluda *
- <set nombre=<formal>>Bien <get nombre>, ¿Tiene un horario preferido para contactarlo?{topic=horariollamada}

+ yo soy *
- <set nombre=<formal>>Bien <get nombre>, ¿Tiene un horario preferido para contactarlo?{topic=horariollamada}

+ soy *
- <set nombre=<formal>>Bien <get nombre>, ¿Tiene un horario preferido para contactarlo?{topic=horariollamada}

//-- Casos donde se obtiene el nombre fin--//

// Si no matchea, volver a pedir nombre
+ *
- ¿Podrías repertirme tu nombre por favor?{topic=nombrefinal}

< topic

> topic nombrefinal

+ *
- <set nombre=<formal>>Bien <get nombre>, ¿tiene un horario preferido para contactarlo?{topic=horariollamada}

< topic

`
}
}

        contenidoRive += contenido


      // Crear o reemplazar el archivo rive
      fs.writeFileSync('config/rivescripts/bot1_empresa1_socket1.rive', contenidoRive, (err) => {
        if (err) throw err;
        console.log('Se creó el archivo rive correctamente');
      });


      // Actualizar solo un field de un subdocumento
      await Bot.updateOne({ _id:session.get('id_bot') } , {
        $set: {
          'conversacion.saludo_inicial': body.saludo_inicial,
          'conversacion.forma_solicitar_nombre': body.forma_solicitar_nombre,
          'conversacion.preguntar_correo': parseInt(body.preguntar_correo),
          'conversacion.preguntar_telefono': parseInt(body.preguntar_telefono),
          'conversacion.forma_solicitar_datos_contacto': body.forma_solicitar_datos,
          'conversacion.preguntar_horario_llamada': parseInt(body.preguntar_horario_llamada),
          // 'conversacion.preguntar_num_documento': parseInt(body.preguntar_num_documento),
          'conversacion.cierre_conversacion': body.cierre_conversacion,
          'conversacion.saludo_final': body.saludo_final
      }
      })

      // console.log(data);

    } catch (err) {
      console.error(err.message)
    }

    // console.log(session.get('id_bot'))
    const id_bot = session.get('id_bot')

    return response.redirect('/chatbot/conversacion/'+id_bot)
  }

  async probar_chat ({ request, session, view }) {

    const querySitios = await Bot.find( { empresa: session.get('id_usuario') } )
    const dataBot = await Bot.findOne( {_id: session.get('id_bot')})

    const sitio_web = session.get('sitio_bot')
    const sitios_web = querySitios
    const nombre_bot = dataBot.nombre
    const id_bot = dataBot.id

    // console.log(dataBot.configuracion.tipo_industria)

    return view.render('chatbot.probarChatbot', { sitio_web, sitios_web, nombre_bot, id_bot })

  }
}

module.exports = BotController
