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

// Riden Cedeño
Route.get('ejemplo-view', 'RidenController.ejemplo_view')
Route.group(() =>{
  Route.get('configuracion', 'RidenController.configuracion')
  Route.post('configuracion', 'RidenController.configuracion_post')
  Route.get('login', 'RidenController.login')
}).prefix('chatb')


// Ariel Bailón
// Dashboard
Route.get('/dashboard', 'DashboardController.inicio')

// Registrarse
Route.get('/registro', 'UsuarioController.inicio')
Route.post('/registro', 'UsuarioController.crear_usuario')

// Iniciar sesión
Route.get('/iniciars', 'UsuarioController.inicios')
Route.post('/iniciars', 'UsuarioController.iniciar_sesion')

Route.get('cerrar', 'UsuarioController.cerrar_sesion')

// Chatbot - Chat con bot
Route.get('/chatbot', 'BotController.inicio')
Route.post('/crear', 'BotController.crear_bot')

// Sección de respuestas
Route.get('/respuestas', 'RespuestaChatController.inicio')
Route.post('guardar_respuestas', 'RespuestaChatController.guardar_post')
Route.get('/conversacion', 'RespuestaChatController.conversacion')
Route.get('/leer_respuestas', 'RespuestaChatController.indice')

// Chat - Chat simple
Route.get('/chats', 'ChatController.inicio')
Route.get('/crearchat', 'ChatController.crear_chat')
Route.get('/getidchat', 'ChatController.getid_chat')




