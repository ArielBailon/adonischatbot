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
    /*$('.messages').append(`
      <p class="userEnteredText font-weight-bold">Jean</p><div class="clearfix"></div><p class="botResult">${message.body}</p><div class="clearfix"></div>
    `)*/
    $('.messages').append(`
    <p class="${message.usuario}">${message.body}</p><div class="clearfix"></div>
    `)
    scrollToBottomOfResults();
  })
}

/*$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    // id
      let xhr = new XMLHttpRequest();
      xhr.open('GET', 'https://chat.tawsa.com/crearIdChat', true);

      xhr.onload = function() {
        if (this.status == 200) {
          console.log((this.responseText));
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
})*/

$('#message').keyup(function (e) {
  if (e.which === 13) {
    e.preventDefault()

    const message = $(this).val()
    $(this).val('')

    var mensajes = [];
    $('.botResult, .userEnteredText').each(function(){
      let msj = $(this).html();
      let usuario = ($(this).attr('class') == 'userEnteredText')?'Vendedor':'Cliente';
      mensajes.push({usuario: usuario, mensaje: msj});
    });
    mensajes.push({usuario: 'Cliente', mensaje: message});

    //let mensajes = $("#guardarChatForm").html();
     $.ajax({
          type: "POST",
          url: "https://chat.tawsa.com/crearIdChat",
          data: {token: '5e13b20ab1a1d03b78c03f42', mensajes: JSON.stringify(mensajes), id_chat: '1'},
          success: function(answer) {
              alert(answer);
              console.log(answer);
              ws.getSubscription('chat:'+answer[1]).emit('message', {
                usuario: 'botResult',
                body: message
              })
          },
          error: function(jqXHR, errorText, errorThrown) {
            console.log(jqXHR);
              console.log(jqXHR+" - "+errorText+" - "+errorThrown);
          }
      });
            e.preventDefault();
  }
})

//---------------------------------- Scroll to the bottom of the results div -------------------------------
function scrollToBottomOfResults() {
  var terminalResultsDiv = document.getElementById('autoScroll');
  terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
}
