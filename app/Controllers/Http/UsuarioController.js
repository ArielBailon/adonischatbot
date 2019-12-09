'use strict'
const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')
const { validate } = use('Validator')

class UsuarioController {

  async inicio ({ view, response, session}) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('registro')
  }

  async inicios ({ view, response, session }) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('iniciarsesion')
  }

  async registro_bot ({ view, response, session }) {
    return view.render('registroConfigurarBot')
  }

  async cerrar_sesion({ session, view }){
    session.clear()
    return view.render('iniciarsesion')
  }

  async crear_usuario ({ request, response, view, session }) {

    const body = request.only(['nombres', 'correo', 'contrasena'])

    const usuario =  await Usuario.findOne({ correo: body.correo })

    const reglas = {
      nombres: 'required|alpha',
      correo: 'required|email',
      contrasena: 'required|min:5'
    }

    const mensajes = {
      required: 'Por favor, llenar el campo',
      alpha: 'Ingresar nombres sin carácteres especiales o números',
      email: 'Ingrese un correo válido, por favor',
      min: 'La contraseña es muy corta',
    }

    const validation = await validate(body, reglas, mensajes)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['contrasena'])
        // console.log('didnt work')

      return response.redirect('registros')
    }


    if (usuario) {
      console.log('Ya existe una cuenta asociada con ese correo')
      return response.redirect('registros')
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
    return response.redirect('registroBot')
  }

  async iniciar_sesion({ request, response, session }){
      const body = request.post()

      const data =  await Usuario.findOne({ correo: body.correo })

      const verificar = await Hash.verify(body.contrasena, data.contrasena)
      if(verificar){
        session.put('id_usuario', data.id)
        response.redirect('/dashboard', false, 301)
      } else {
        console.log("Err");
      }
  }

}
module.exports = UsuarioController
