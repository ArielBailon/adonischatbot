(function() {
  var responseText;
  // ------------------------------------------ Toggle chatbot -----------------------------------------------
  $('.profile_div').click(function () {
    startChat()
    $('.profile_div').toggle();
    $('.chatCont').toggle();
    $('.bot_profile').toggle();
    $('.chatForm').toggle();
    document.getElementById('message').focus();
  });

  let ws = null

  function crearChat() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://chat.tawsa.com/crearChat/5e615c30542bea3118de7b99/', true);

    xhr.onload = function(variable) {
      responseText = this.responseText;

      if (this.status == 200) {
        // console.log(this.responseText);
        // var id = this.responseText;
        subscribeToChannel(this.responseText)
      }
      /*$.each(['Hola en que puedo ayudarte'], function( index, value ) {
        $('.messages').append(`
        <p class="botResult">${value}</p><div class="clearfix"></div>
        `)
      });*/
    }
   xhr.send()
  }

  function startChat() {
    ws = adonis.Ws('wss://chat.tawsa.com/').connect()

    ws.on('open', () => {
      $('.connection-status').addClass('connected')
      crearChat()
    })

    ws.on('error', () => {
      $('.connection-status').removeClass('connected')
    })
  }

  function startChatSesion(chatId) {
      let ws = null
      ws = adonis.Ws().connect()

      ws.on('open', () => {
        $('.connection-status').addClass('connected')
        subscribeToChannel(chatId)

        $('#cliente'+chatId).attr('disabled', true)
          $.ajax({
              url: 'https://chat.tawsa.com/asignarUsuario',
              data: {
                  chatId: chatId,
              },
              type: 'POST',
              success: function(response){
                  console.log('worked')
                  console.log(response);
                  console.log(typeof(response));

                  $.each(response, function( index, value ) {
                    let clase = (value.usuario == 'Cliente')?'userEnteredText':'botResult';
                    $('.messages').append(`
                    <p class="${clase}">${value.mensaje}</p><div class="clearfix"></div>
                    `)
                  });
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
      <p class="${message.usuario}">${message.body}</p><div class="clearfix"></div>
      `)
    })
  }


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
           data: {token: '5e615c30542bea3118de7b99', mensajes: JSON.stringify(mensajes) , id_chat: responseText},
           success: function(answer) {
               console.log(answer);
               ws.getSubscription('chat:'+answer[1]).emit('message', {
                 usuario: 'userEnteredText',
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

  $('.close').click(function () {
    $('.profile_div').toggle();
    $('.chatCont').toggle();
    $('.bot_profile').toggle();
    $('.chatForm').toggle();
    //$('#guardarChatForm').submit();
  });

  //---------------------------------- Scroll to the bottom of the results div -------------------------------
  function scrollToBottomOfResults() {
    var terminalResultsDiv = document.getElementById('guardarChatForm');
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  }

  //---------------------------------------- Ascii Spinner ---------------------------------------------------
  function showSpinner() {
    $('.spinner').show();
  }

  function hideSpinner() {
    $('.spinner').hide();
  }  

})();
