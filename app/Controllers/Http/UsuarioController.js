'use strict'
const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')

class UsuarioController {

  async inicio ({ view, response, session}) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('registro')
  }

  async inicios ({ view, response, session }) {
    if(session.get('id_usuario')){response.redirect('/dashboard', false, 301)}
    return view.render('iniciarsesion')
  }

  async cerrar_sesion({ session }){
    session.clear()
  }

  async crear_usuario ({ request, response, view }) {

    const body = request.only(['nombres', 'correo', 'contrasena'])

    const usuario =  await Usuario.findOne({ correo: body.correo })

    if (usuario) {
      return console.log('usuario ya existe');
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
    return view.render('/dashboard')
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
