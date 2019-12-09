'use strict'

class DashboardController {
  async inicio ({ view, response, session }) {
    if(!session.get('id_usuario')){response.redirect('/iniciars', false, 301)}

    return view.render('dashboard')
  }
}

module.exports = DashboardController
