'use strict'

const Hash = use('Hash')
const Usuario = use('App/Models/Usuario')


class IniciarSesionController {
  async iniciar_sesion ({ request, response, view, session }) {
    const body = request.post()
    try {
      Usuario.find({ correo: body.correo } , async (err, usuario) => {
        let { id, contrasena } = usuario[0]

        const verificar = await Hash.verify(body.contrasena, contrasena)

          try {
            if (verificar == true) {
              session.put('id', id)

              return response.redirect('/dashboard', true)

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

module.exports = IniciarSesionController
