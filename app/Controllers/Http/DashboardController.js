'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Hash = use('Hash')


class DashboardController {
  async inicio ({ view, response, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_empresa') } )

    // console.log(session.get('id_empresa'));

    // console.log(querySitio);

    const id_bot = querySitio.id

    return view.render('dashboard.dashboard', {id_bot})
  }

  async usuarios ({ view, response, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const empresa = await Usuario.findById(session.get('id_empresa'))

    const usuarios = await Usuario.find({ id_empresa: session.get('id_empresa') })

    // console.log(empresa)
    // console.log(usuarios)

    return view.render('dashboard.usuarios', {empresa, usuarios})
  }

  async nuevo_usuario ({ view, response, request, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const body = request.post()

    const usuario =  await Usuario.findOne({ correo: body.correo })

    if (usuario) {
      console.log('Ya existe una cuenta asociada con ese correo')
      return response.redirect('registro.registro')
    }

    const usuarioLogeado = session.get('id_empresa')

    const empresa = await Usuario.findById( usuarioLogeado )

    // console.log(body.nombres);

    try {
      const nuevoUsuario = new Usuario({
        id_cuenta: empresa.id,
        nombres: body.nombres,
        correo: body.correo,
        telefono: body.telefono,
        contrasena: await Hash.make(body.contrasena, 15),
        permisos: body.permisos,
        tipo: 'Usuario'
      })

      await nuevoUsuario.save()

      // console.log(empresa);

    } catch (err) {
      console.error(err.message);
    }

    return response.redirect('usuarios')
  }

  async empresa ({ view, response, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_empresa') } )

    const empresa = await Usuario.findById( session.get('id_empresa'))

    const empresa_config = empresa.config

    const id_bot = querySitio.id

    return view.render('dashboard.empresa', {id_bot, empresa_config})
  }

  async actualizar_empresa ({ view, request, response, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const body = request.post()

    // console.log(body);

    // Actualizar solo un field de un subdocumento
    await Usuario.updateOne({ _id:session.get('id_empresa') } , {
      $set: {
        'config.industria': body.industria,
        'config.nombre_empresa': body.nombre_empresa,
        'config.cant_empresa': body.cant_empresa,
        'config.num_telefono': body.num_telefono
    }
    })
    // redirect
    return response.redirect('/dashboard/empresa', false, 301)
  }

  async perfil ({ view, response, session }) {
    if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_empresa') } )

    const id_bot = querySitio.id

    return view.render('dashboard.perfil', {id_bot})
  }
}

module.exports = DashboardController
