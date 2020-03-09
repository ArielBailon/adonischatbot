'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')

/**
 * @class Cliente
 */
class Cliente extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'ClienteHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Cliente's schema
   */
  static get schema () {
    return {
      id_cuenta: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
      },
      id_cliente: {
        type: String,
      },
      nombres: {
        type: String,
      },
      correo: {
        type: String,
      },
      telefono: {
        type: Number,
      },
      asignado: {
        type: String,
      },
      estado: {
        type: String,
      },
      calificacion: {
        type: String
      },
      chat: {
        mensajes : {
          type: String
        },
      chatbot: {
        id_bot : { type: String },
        mensajes : {
          type: String
         }
      }

    }
  }
}
}


module.exports = Cliente.buildModel('Cliente')
