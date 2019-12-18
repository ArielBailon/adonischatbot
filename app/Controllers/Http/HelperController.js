'use strict'

const Bot = use('App/Models/Bot')

class HelperController {

  async helper_saludo({ id_bot }) {
    try {
      // let id_bot = session.get('id_bot')

      const dataBot = await Bot.findById(id_bot)

      let saludo = dataBot.conversacion[0].saludo_inicial

      return saludo

    } catch (err) {
      console.error(err.message)
    }
  }
}


module.exports = HelperController
