'use strict'

const Bot = use('App/Models/Bot')

class DashboardController {
  async inicio ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('dashboard', {id_bot})
  }

  async empresa ({ view, response, session }) {
    if(!session.get('id_usuario')){ return response.redirect('/iniciars', false, 301)}

    const querySitio = await Bot.findOne( { empresa: session.get('id_usuario') } )

    const id_bot = querySitio.id

    return view.render('empresa', {id_bot})
  }
}

module.exports = DashboardController
