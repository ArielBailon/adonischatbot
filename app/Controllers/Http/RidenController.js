'use strict'
const ChatConfiguracion = use('App/Models/ChatConfiguracion')
const Usuario = use('App/Models/Usuario')

class RidenController {
    ejemplo_view ({view}) {        
        return view.render('prueba', {data: ["pasar valores","hola mundo 2"]})
    }
    async login({response, session}){
        const data = []                
        var json
        const username = 'maxrd'
        const contrasena = '123'

        data['titulo'] = 'Iniciar Sesión'
        data['configuracion'] =  await Usuario.where({ username: username }).fetch()                      
        json = data['configuracion'].toJSON()  
        //console.log(json[0]._id)
        session.put('id_empresa', json[0].id_empresa)
        return response.json(data['configuracion'])
    }

    async configuracion ({view, response, session}){
        const data = []                
        const id_empresa =  session.get('id_empresa')
        data['titulo'] = 'Configuración'
        data['configuracion'] = await ChatConfiguracion.where({ id_empresa: id_empresa }).fetch()        
        //console.log(chatConfiguracion.updatedAtColumn())

        return response.json(data['configuracion'])
        //return view.render('configuracion', {data: data})
    }

    async configuracion_post({request, view}){
        const data = []
        const body = request.post()
        const chatConfiguracion = new ChatConfiguracion()

        data['titulo'] = 'Configuración'     
        chatConfiguracion.guardar_configuracion(body)                          
        return view.render('configuracion', {data: data})        
    }

}

module.exports = RidenController
