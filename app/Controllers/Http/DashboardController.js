'use strict'

class DashboardController {
  async inicio ({ view }) {
    return view.render('dashboard')
  }
}

module.exports = DashboardController
