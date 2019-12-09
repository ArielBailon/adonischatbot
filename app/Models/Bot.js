'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Bot
 */
class Bot extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'BotHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Bot's schema
   */
  static get schema () {
    return {
      saludo_inicial: {
        type: String,
        default: "Hola en qué te puedo ayudar"
      },
      forma_solicitar_nombre: {
        type: String,
        default: "Será un placer asistirle, ¿cuál es su nombre?"
      },
      preguntar_correo: {
        type: Number,
        default: 1
      },
      preguntar_telefono: {
        type: Number,
        default: 1
      },
      forma_solicitar_horario_llamada: {
        type: String,
        default: "¿En qué horario del día prefiere que te llamemos?"
      },
      preguntar_num_documento: {
        type: Number,
        default: 2
      },
      preguntas_adicionales: {
        type: [String],
        default: ["¿a qué lugares te gustaría viajar?", "¿en qué fecha?"]
      },
      cierre_conversacion: {
        type: String,
        default: "Con la información que me has pasado un asesor se comunicará contigo a la brevedad"
      },
      saludo_final: {
        type: String,
        default: "Bien, me contacto con el asesor y le doy toda esta información. Muchas gracias por comunicarte!"
      }
    }
  }
}

module.exports = Bot.buildModel('Bot')
