'use strict'
const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')
const { validate } = use('Validator')

class UsuarioController {

  async inicio ({ view, response, session}) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('registro.registro')
  }

  async inicios ({ view, response, session }) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('registro.iniciarsesion')
  }

  async registro_bot ({ view, response, session }) {
    return view.render('registro.registroConfigurarBot')
  }

  async crear_bot ({ request, response, view, session }) {

    const body = request.only(['sitioWeb', 'colorVentana', 'nombreRobot', 'mensajeBienvenida'])

    // Consulta de la sesión actual creada al registrar un nuevo usuario, para buscar aquel usuario
    //  y relacionar el bot con la empresa mediante id
    const data = await Usuario.findById(session.get('id_usuario')).populate('usuario', ['id'])

    try {
      const nuevoBot = new Bot({
        sitio_web: body.sitioWeb,
        empresa: data.id,
        nombre: body.nombreRobot,
        apariencia: { color_ventana: body.colorVentana, },
        conversacion: { saludo_inicial: body.mensajeBienvenida, }
      })

      await nuevoBot.save()

      session.put('id_bot', nuevoBot.id)

    } catch (err) {
      console.error(err.message);
    }

    return response.redirect('registroInstalar')
  }

  async instalar_bot ({ view, response, session }) {
    return view.render('registro.registroInstalarBot')
  }

  async registro_adicional ({ view, response, session }) {
    return view.render('registro.registroAdicional')
  }

  async crear_registro_adicional ({ request, response, view, session }) {

    const body = request.only(['industria', 'cantidadEmpleados', 'posicionEmpresa', 'numeroTelefono'])

    try {
      await Usuario.findByIdAndUpdate(session.get('id_usuario'),
      {
        config: {
          industria: body.industria,
          cant_empresa: body.cantidadEmpleados,
          posicion_empresa: body.posicionEmpresa,
          num_telefono: body.numeroTelefono
        }
      }
      )
    } catch (err) {
      console.error(err.message)
    }


    return response.redirect('dashboard')
  }

  async cerrar_sesion({ session, view }){
    session.clear()
    return view.render('registro.iniciarsesion')
  }

  async crear_usuario ({ request, response, view, session }) {

    const body = request.only(['nombres', 'correo', 'contrasena', 'contrasena_confirmar'])

    const usuario =  await Usuario.findOne({ correo: body.correo })

    const reglas = {
      nombres: 'required|alpha',
      correo: 'required|email',
      contrasena: 'required|min:5',
      contrasena_confirmar: 'same:contrasena'
    }

    const mensajes = {
      required: 'Por favor, llenar el campo',
      alpha: 'Ingresar nombres sin carácteres especiales o números',
      email: 'Ingrese un correo válido, por favor',
      min: 'La contraseña es muy corta',
      same: 'La contraseñas deben de ser iguales'
    }

    const validation = await validate(body, reglas, mensajes)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['contrasena'])
        console.log('didnt work')

      return response.redirect('registro.registro')
    }


    if (usuario) {
      console.log('Ya existe una cuenta asociada con ese correo')
      return response.redirect('registro.registro')
    }

    try {
      const nuevoUsuario = new Usuario({
        nombres: body.nombres,
        correo: body.correo,
        contrasena: await Hash.make(body.contrasena, 15)
      })

      await nuevoUsuario.save()

    } catch (err) {
      console.error(err.message);
    }

    // Iniciarle sesión cuando se registre, es el mejor approach?

    const data = await Usuario.findOne({ correo: body.correo })

    try {

      session.put('id_usuario', data.id)

      // console.log(session.all())

    } catch (err) {
      console.error(err.message)
      console.log(session.all())

    }

    // console.log(session.all())

    return response.redirect('registroBot')
  }

  async iniciar_sesion({ request, response, session }){
      const body = request.post()

      const data = await Usuario.findOne({ correo: body.correo })
      // Encontrar bot mediante id con la relación de campo empresa, empresa = id de cuenta
      const dataBot = await Bot.findOne({ empresa: data.id })

      const verificar = await Hash.verify(body.contrasena, data.contrasena)
      if(verificar){
        session.put('id_usuario', data.id)
        session.put('id_bot', dataBot.id)
        session.put('sitio_bot', dataBot.sitio_web)

        response.redirect('/dashboard', false, 301)
      } else {
        console.log("Err");
      }
  }

}
module.exports = UsuarioController
