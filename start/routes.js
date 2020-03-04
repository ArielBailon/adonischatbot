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

Route.get('/', 'DashboardController.inicio')

// Dashboard
Route.group(() =>{

Route.get('/', 'DashboardController.inicio')
Route.get('/usuarios', 'DashboardController.usuarios')
Route.post('/nuevoUsuario', 'DashboardController.nuevo_usuario')
Route.get('/empresa', 'DashboardController.empresa')
Route.post('/actualizarEmpresa', 'DashboardController.actualizar_empresa')

Route.get('/perfil', 'DashboardController.perfil')

}).prefix('dashboard')


// Registrarse
Route.get('/registro', 'UsuarioController.inicio')
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

// Chatbot
Route.get('/chatbot', 'BotController.inicio')
Route.post('/crear', 'BotController.crear_bot')
Route.get('chatr', 'BotController.probar_chat')

// Sección de respuestas
Route.post('guardar_respuestas', 'RespuestaChatController.guardar_post')
Route.get('/leer_respuestas', 'RespuestaChatController.indice')

// Chat - Chat simple
Route.get('/chats', 'ChatController.inicio')
Route.get('/chatCliente', 'ChatController.chat_cliente')
Route.get('chatClienteprueba', 'ChatController.probar_chat')
Route.get('/crearChat/:id_empresa', 'ChatController.crear_chat')
Route.get('/crearChat', 'ChatController.crear_chat')
Route.get('/crearIdChat', 'ChatController.get_id_chat')
Route.post('/crearIdChat', 'ChatController.get_id_chat')
Route.post('/asignarUsuario', 'ChatController.asignar_usuario')
Route.get('/saludoInicialss', 'ChatController.saludo_inicial')

// CLiente
Route.post('guardarChatCliente', 'ClienteController.guardar_chat_cliente')


// Módulo chatbot
Route.group(() =>{
  Route.get('configuracion/:id_bot', 'BotController.configuracion')
  Route.post('actualizarConfiguracion/:id_bot', 'BotController.actualizar_configuracion')
  Route.get('apariencia/:id_bot', 'BotController.apariencia')
  Route.get('conversacion/:id_bot', 'BotController.conversacion')
  Route.post('actualizarConversacion', 'BotController.actualizar_conversacion')

  Route.get('respuestas/:id_bot', 'BotController.respuestas')

}).prefix('chatbot')
