'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')

/**
 * @class Chat
 */
class Chat extends BaseModel {
  static boot({
    schema
  }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'ChatHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Chat's schema
   */
  static get schema() {
    return {
      id_usuario :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
      },
      id_chat: {
        type: Number,
        default: 0
      },
      id_asignado: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'usuario'
      },
      conversacion: {
        type: String,
        default: "Hola en qué te puedo ayudar"
      }
    }
  }
}

module.exports = Chat.buildModel('Chat')
