'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Usuario
 */
class Usuario extends BaseModel {
  static boot ({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'UsuarioHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Usuario's schema
   */
  static get schema () {
    return {
      // Campo de id_cuenta para relacionar por si una cuenta principal crea más usuarios para que administren la misma,
      // si es principal no se llena
      // Tal vez sea mejor crear otro modelo de usuarios que administren cuentas, usuarios secundarios, por los campos que hay que llenar
      id_cuenta: {
        type: String,
      },
      nombres: {
        type: String,
        required: true
      },
      correo: {
        type: String,
        required: true,
        unique: true
      },
      contrasena: {
        type: String,
        required: true
      },
      imagen: {
        type: String,
      },
      sitio_web: {
        type: String,
      },
      config: {
        nombre_empresa: {
          type: String
        },
        telefono: {
          type: Number
        },
        zona_horaria: {
          type: String
        },
        industria: {
          type: String
        },
        tamano_empresa: {
          type: String
        },
        metodo_visitas_sitio: {
          type: String
        }
      },
      datos_contacto: {
        titulo: {
          type: String
        },
        dominio: {
          type: String
        }
      }
    }
  }
}

module.exports = Usuario.buildModel('Usuario')
