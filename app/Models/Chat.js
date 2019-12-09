'use strict'

const BaseModel = use('MongooseModel')

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
        type: String
      },
      id_chat: {
        type: Number,
        default: 0
      },
      conversacion: {
        type: String,
        default: "Hola en qué te puedo ayudar"
      }
    }
  }
}

module.exports = Chat.buildModel('Chat')
