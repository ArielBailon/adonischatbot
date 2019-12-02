'use strict'
const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')

class UsuarioController {

  async inicio ({ view }) {
    return view.render('registro')
  }

  async inicios ({ view }) {
    return view.render('iniciarsesion')
  }

  async crear_usuario ({ request, response, auth, view }) {
    const body = request.only(['nombres', 'correo', 'contrasena'])
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

  async iniciar_sesion ({ request, response, view, session, auth }) {
    const body = request.post()
    try {
      Usuario.find({ correo: body.correo } , async (err, usuario) => {
        let { id, contrasena } = usuario[0]

        const verificar = await Hash.verify(body.contrasena, contrasena)
          try {
            if (verificar == true) {
              session.put('id', id)
              console.log('Logeado')

              response.redirect('/dashboard')

            } else {
              console.log('El correo o contraseña no coinciden')
            }
          } catch (err) {
            console.error(err)
          }

        console.log(session.all())
      })
    } catch (err) {
      console.error(err)
    }

  }

}

module.exports = UsuarioController
