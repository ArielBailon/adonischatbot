'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() =>{
  Route.get('chatbot', 'RespuestaChatController.indice')
  Route.get('chatbot/:id', 'RespuestaChatController.mostrar')
  Route.post('chatbot', 'RespuestaChatController.guardar')
  Route.put('chatbot/:id', 'RespuestaChatController.actualizar')
  Route.delete('chatbot/:id', 'RespuestaChatController.eliminar')

}).prefix('api')

Route.get('chatbot', 'ChatController.onMessage')


//Riden Cedeño
Route.get('ejemplo-view', 'RidenController.ejemplo_view')
Route.group(() =>{
  Route.get('configuracion', 'RidenController.configuracion')  
  Route.post('configuracion', 'RidenController.configuracion_post')  
  Route.get('login', 'RidenController.login')  
}).prefix('chatb')

Route.get('chat', 'RidenController.chat')

Route.get('/', ({ view }) =>{
  return view.render('chat')
})

