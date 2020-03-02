let ws = null

function startChat(chatId) {

  ws = adonis.Ws().connect()
    ws.on('open', () => {

      $('.connection-status').addClass('connected')
      // console.log(chatId)

      // console.log(clienteEl);

      subscribeToChannel(chatId)

      $('#cliente'+chatId).attr('disabled', true)
        $.ajax({
            url: 'https://chat.tawsa.com/asignarUsuario',
            data: {
                chatId
            },
            type: 'POST',
            success: function(response){
                //success process here
                console.log('worked')
            },
            error: console.log('error'),
            dataType: 'json'
        });

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
      <p class="userEnteredText font-weight-bold">Jean</p><div class="clearfix"></div><p class="userEnteredText">${message.body}</p><div class="clearfix"></div>
    `)
    scrollToBottomOfResults();
  })
}

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    // id
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://chat.tawsa.com/get_id_chats', true);

      xhr.onload = function() {
        if (this.status == 200) {
          console.log(JSON.parse(this.responseText)[1]);
          var id = JSON.parse(this.responseText)[1]
          // var id = this.responseText;
          // return this.responseText

          ws.getSubscription('chat:'+id).emit('message', {
            body: message
          })

        }
      }
      xhr.send();
    return
  }
})

//---------------------------------- Scroll to the bottom of the results div -------------------------------
function scrollToBottomOfResults() {
  var terminalResultsDiv = document.getElementById('autoScroll');
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}
