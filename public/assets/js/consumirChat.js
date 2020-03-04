
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
    xhr.open('GET', 'https://chat.tawsa.com/crear_chat', true);

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
      <p class="botResult">${message.body}</p><div class="clearfix"></div>
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
        xhr.open('GET', 'https://chat.tawsa.com/get_id_chat', true);

        xhr.onload = function() {
          if (this.status == 200) {
            // console.log(this.responseText[1]);
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

  $('.close').click(function () {
    $('.profile_div').toggle();
    $('.chatCont').toggle();
    $('.bot_profile').toggle();
    $('.chatForm').toggle();
    $('#guardarChatForm').submit();
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