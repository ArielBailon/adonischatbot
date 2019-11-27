let ws = null

$(function () {
  // Only connect when username is available
  if (window.username) {
    startChat()
  }
})

function startChat() {
  ws = adonis.Ws().connect()

  ws.on('open', (datos) => {
    $('.connection-status').addClass('connected')
    $('.messages').append(`
      <div class="message"><h3> ${datos.nombre} </h3> <p> ${datos.saludo_inicial} </p> </div>
    `)
    subscribeToChannel()
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })
}


function subscribeToChannel() {
  const chat = ws.subscribe('chat')

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  chat.on('message', (message) => {
    $('.messages').append(`
      <div class="message"><h3> ${message.username} </h3> <p> ${message.body} </p> </div>
    `)
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    ws.getSubscription('chat').emit('message', {
      username: window.username,
      body: message
    })
    return
  }
})
