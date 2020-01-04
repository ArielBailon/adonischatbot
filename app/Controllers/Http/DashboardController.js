'use strict'

const Bot = use('App/Models/Bot')

class DashboardController {
  async inicio ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('dashboard.dashboard', {id_bot})
  }

  async usuarios ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('dashboard.usuarios', {id_bot})
  }

  async empresa ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('dashboard.empresa', {id_bot})
  }

  async perfil ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('dashboard.perfil', {id_bot})
  }
}

module.exports = DashboardController
