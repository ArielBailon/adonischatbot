let ws = null


$(function () {
  // Only connect when username is available
  if (window.username) {
    startChat()
  }

function startChat() {
  ws = adonis.Ws().connect()
  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    console.log(chatId)
    subscribeToChannel(chatId)
  })

  ws.on('error', () => {
    $('.connection-status').removeClass('connected')
  })
}

function subscribeToChannel(id) {
  const chat = ws.subscribe('chat:'+id)
  // console.log('chat'+id)

  chat.on('error', () => {
    $('.connection-status').removeClass('connected')
  })

  chat.on('message', (message) => {
    $('.messages').append(`
      <p class="userEnteredText">${message.body}</p><div class="clearfix"></div><p class="botResult">${message.body}</p><div class="clearfix"></div>
    `)
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    // id
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://127.0.0.1:3333/getidchat', true);

      xhr.onload = function() {
        if (this.status == 200) {
          // console.log(JSON.parse(this.responseText)[1]);
          var id = JSON.parse(this.responseText)[1]
          // var id = this.responseText;
          // return this.responseText

          ws.getSubscription('chat:'+id).emit('message', {
            body: message
          })

        }
      }
      xhr.send()

    return
  }
})
