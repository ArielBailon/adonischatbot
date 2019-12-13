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

Route.get('chat', 'RidenController.chat')

// Ariel Bailón
// Dashboard
Route.get('/dashboard', 'DashboardController.inicio')

// Registrarse
Route.get('/registross', 'UsuarioController.inicio')
Route.post('/registros', 'UsuarioController.crear_usuario')

Route.get('/registroBot', 'UsuarioController.registro_bot')
Route.post('/registroBot', 'UsuarioController.crear_bot')

Route.get('/registroInstalar', 'UsuarioController.instalar_bot')

Route.get('/registroAdicional', 'UsuarioController.registro_adicional')
Route.post('/registroAdicionals', 'UsuarioController.crear_registro_adicional')

// Iniciar sesión
Route.get('/iniciars', 'UsuarioController.inicios')
Route.post('/iniciars', 'UsuarioController.iniciar_sesion')

Route.get('cerrar', 'UsuarioController.cerrar_sesion')

// Chatbot - Chat con bot
Route.get('/chatbot', 'BotController.inicio')
Route.post('/crear', 'BotController.crear_bot')

// Sección de respuestas
Route.post('guardar_respuestas', 'RespuestaChatController.guardar_post')
Route.get('/leer_respuestas', 'RespuestaChatController.indice')

// Chat - Chat simple
Route.get('/chats', 'ChatController.inicio')
Route.get('/chatcliente', 'ChatController.chat_cliente')
Route.get('/crearchat', 'ChatController.crear_chat')
Route.get('/getidchat', 'ChatController.getid_chat')


// Módulo chatbot
Route.group(() =>{
  Route.get('configuracion', 'BotController.configuracion')
  Route.get('respuestas', 'RespuestaChatController.inicio')
  Route.get('conversacion', 'RespuestaChatController.conversacion')
  Route.get('apariencia', 'BotController.apariencia')


}).prefix('chatbot')
