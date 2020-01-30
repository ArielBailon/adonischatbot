'use strict'

const BaseModel = use('MongooseModel')
const mongoose = use('mongoose');

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
      id_empresa: {
        type: mongoose.Types.ObjectId
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
      telefono: {
        type: String
      },
      permisos: {
        type: String,
        default: 'Administrador'
      },
      config: {
        nombre_empresa: {
          type: String,
        },
        num_telefono: {
          type: Number,
        },
        posicion_empresa: {
          type: String,
        },
        zona_horaria: {
          type: String
        },
        industria: {
          type: String
        },
        cant_empresa: {
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
      },
      tipo: {
        type: String,
        default: 'Empresa'
      }
    }
  }
}

module.exports = Usuario.buildModel('Usuario')
