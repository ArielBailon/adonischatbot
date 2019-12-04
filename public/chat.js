let ws = null

$(function () {
//  Empezar el chat
    startChat()
})

function crearChat() {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://127.0.0.1:3333/crearchat', true);

  xhr.onload = function() {
    if (this.status == 200) {
      // console.log(this.responseText);
      // var id = this.responseText;
      subscribeToChannel(this.responseText)
    }
  }

  xhr.send()

}



function startChat() {
  ws = adonis.Ws().connect()

  ws.on('open', () => {
    $('.connection-status').addClass('connected')
    crearChat()
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
      <div class="message"><h4> Usuario </h4> <p> ${message.body} </p> </div>
    `)
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    e.preventDefault()

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
