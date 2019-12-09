'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
//chat_configuracions
class ChatConfiguracion extends Model {
    async guardar_configuracion(body){
        const chat = new ChatConfiguracion()
        chat.nombre_chat = body.txt_nombre
        chat.tipo_industria = body.slt_tipo_industria
        chat.idioma = body.rdo_idioma
        chat.isActivar = body.cbx_activar
        await chat.save()
    }
    async obtener_configuracion(){
        //const dato = await ChatConfiguracion.all()
        return "Hola mundo"
    }

}

module.exports = ChatConfiguracion
