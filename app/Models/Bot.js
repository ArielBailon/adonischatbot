'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose')

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
      empresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuario'
      },
      nombre: {
        type: String,
        default: "Mi chatbot"
      },
      sitio_web: {
        type: String
      },
      configuracion:
        {
          tipo_industria: {
            type: String,
          },
          idioma: {
            type: String
          }
        },
      apariencia:
        {
          nombre_ventana: {
            type: String,
          },
          color_ventana: {
            type: String
          },
          color_titulo: {
            type: String,
          },
          color_background: {
            type: String,
          },
          tiempo_saludo_inicial: {
            type: String,
          },
          logo: {
            type: String,
          },
          forma: {
            type: String,
            default: 'Burbuja'
          }
        },
      conversacion:
        {
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

          forma_solicitar_datos_contacto: {
            type: String,
            default: "Para que recibas información, necesitaré de tu correo y número de teléfono"
          },
          preguntar_horario_llamada: {
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
            type: [String]
          },
          cierre_conversacion: {
            type: String,
            default: "Con la información que me has pasado un asesor se comunicará contigo a la brevedad"
          },
          saludo_final: {
            type: String,
            default: "Bien, me contacto con el asesor y le doy toda esta información. Muchas gracias por comunicarte!"
          }
        },
      respuestas: [
        {
          nombre: {
            type: String,
            default: "El horario de atención será de 9 a 12"
          },
          activado: {
            type: Boolean,
            default: true
          },
          forma_preguntar: [
            {
              pregunta_1: {
                type: String,
                default: 'horario de atención'
              },
              pregunta_2: {
                type: String,
                default: 'horario'
              },
              pregunta_3: {
                type: String,
                default: 'cuando atienden'
              },
              respuesta: {
                type: String,
                default: 'el horario de atención será de 9 a 12'
              }
            }
          ]
        }
      ],
      instalacion:
        {
          script: {
            type: String,
            default: "script para instalar chatbot"
          },
          token_bot: {
            type: String,
            default: "Toekn de instalacion de plugins en wordpress"
          }
        },
      analisis_conversacion: [
        {
          frases: {
            type: [String],
            default: ' ["niños", "adultos", "viajes"] '
          },
          biogramas: {
            type: [String],
            default: ' ["tres ninos", "dos adultos", "fin ano"] '
          }
        }
      ],
      fecha : {
        type: Date,
        default: Date.now
      }
    }
  }
}

module.exports = Bot.buildModel('Bot')
