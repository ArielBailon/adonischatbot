'use strict'

/*
|--------------------------------------------------------------------------
| Http server
|--------------------------------------------------------------------------
|
| This file bootstrap Adonisjs to start the HTTP server. You are free to
| customize the process of booting the http server.
|
| """ Loading ace commands """
|     At times you may want to load ace commands when starting the HTTP server.
|     Same can be done by chaining `loadCommands()` method after
|
| """ Preloading files """
|     Also you can preload files by calling `preLoad('path/to/file')` method.
|     Make sure to pass relative path from the project root.
*/

const {
  Ignitor
} = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .wsServer() // boot the WebSocket server
  .fireHttpServer()
  .catch(console.error)

// const startChat = require('./public/chat')

const RiveScript = require('rivescript');
const Chalk = require('chalk');
const bot = new RiveScript();

// let ask = () => {
//   bot.sortReplies()
//       socket.on('message', (message) => {
//         bot.reply('local-user', message).then((reply) => {
//           console.log(Chalk.green('Bot: ' + reply));
//         $('.messages').append(`
//               <div class="message"><h3> ${message.username} </h3> <p> ${message.body} </p> </div>
//             `)
//       })

//       ask();
//     })
//     .catch((error) => console.log(error));
// }

// // Leer el archivo rive
// bot.loadFile("./config/rivescripts/training_data.rive")
//   .then(ask)
//   .catch((error) => console.log(error));

