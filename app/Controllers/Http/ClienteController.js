'use strict'

const Bot = use('App/Models/Bot')
const Usuario = use('App/Models/Usuario')
const Cliente = use('App/Models/Cliente')
const Antl = use('Antl')

class ClienteController {
  async gestion_cliente({response, view, session}){
      //const data =  await Cliente.find()
      const tiempoIni = (Date.now() % 1000) / 1000
      //const data = ['Titulo']
      const data = 20
      //const data =  await Cliente.find()
      //response.json(data)
      const tiempoCarga = ((Date.now() % 1000) / 1000) - tiempoIni
      return view.render('clientes.gestionCliente', {data: data, tiempoCarga: tiempoCarga, Antl: Antl})
  }

  async ajax_gestion_cliente({response, request}){
      const body = request.post()
      let draw = body.draw

      let paginacion = body.start
      let mostrando = parseInt(body.length)

      let valorBusqueda = body.search['value']

      let columnIndex = body.order[0]['column']
      let columnName = body.columns[columnIndex]['data']
      let columnSortOrder = body.order[0]['dir']

      let skip = paginacion * mostrando
      let contador = await Cliente.find().count()
      var data = {}

      data['data'] =  await Cliente.find().limit(mostrando).skip(skip).sort({nombre: 1})


      data['draw'] = draw
      data['recordsTotal'] = contador
      data['recordsFiltered'] = contador //Con filtro
      /*data['recordsFiltered'] =  57
      data['recordsTotal'] =  57
      data['draw'] =  1*/
      //const data =  await Cliente.find()
      response.json(data)
  }

  async get_clientes ({ response, request, view, session }) {
      if(!session.get('id_empresa')){ return response.redirect('/iniciars', false, 301)}

      const usuario =  await Usuario.findById( session.get('id_empresa') )

      const data = {}

      data['data'] = await Cliente.find({ pertenece: usuario.id })

      // console.log();

      // results.push(usuario.nombres)
      // console.log(usuario.nombres)

      return data

    }


  /*************
  Eliminar: cuando ya no se use
  Metodo para insertar muchos usuarios, este metodo solo es para poder probar
  ************/
  async insertar_multiples_clientes({response, params}){
      let i = 0;
      while(i < params.cantidad){
          const nuevoCliente = new Cliente({
              nombre: 'Cliente ' + i,
              correo: 'cliente'+i+'@gmail.com',
              telefono: '0994283082',
              asignado: 0,
              fecha_contacto: '10/12/2019 16:17:00',
              clasificacion: '0',
              estado: 0,
              origen: 0
          })
          await nuevoCliente.save()
          ++i
      }
      response.json(params)
  }

  async detalle_cliente({response, view, session}){
    if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}

    try {
      const data = request.body()
      let id_empresa = session.get('id_empresa')

      const clientes = await Cliente.find({ id_cliente: data.chatId })

      return clientes[0].chat.mensajes
    } catch (err) {
      console.error(err.message)
    }
      return view.render('clientes.detalleCliente')
  }

  async asignar_usuario ({ response, request, session }) {
      //if(!session.get('id_empresa')){response.redirect('/iniciars', false, 301)}
      try {
        const data = request.body()
        let id_empresa = (data.token) ? data.token:session.get('id_empresa')

        const chat = await Chat.find({ id_empresa: id_empresa, id_chat: data.chatId })
        const clientes = await Cliente.find({ id_cliente: data.chatId })
        // console.log(chat);

        chat[0].asignado = session.get('id_usuario')
        // return dataRetornar
        // console.log(session.all());
        // console.log(chat);

        await chat[0].save()
        return clientes[0].chat.mensajes
      } catch (err) {
        console.error(err.message)
      }

    }
}

module.exports = ClienteController
