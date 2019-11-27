'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')


class RegistroController {
  async crear_usuario ({request, view}) {
    const body = request.post()
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
}

module.exports = RegistroController
