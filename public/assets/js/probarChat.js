$(document).ready(function () {
  var chat =
    '<div class="chatCont" id="chatCont">' +
    '<div class="bot_profile">' +
    '<img src="assets/img/bot2.svg" class="bot_p_img">' +
    '<div class="close">' +
    '<i class="fa fa-times" aria-hidden="true"></i>' +
    '</div>' +
    '</div><!--bot_profile end-->' +
    '<form id="guardarChatForm" class="resultDiv messages" action="/guardarChatCliente" method="POST" >' +
    '<div id="result_div"></div>' +
    '</form>' +
    '<div class="chatForm" id="chat-div">' +
    '<div class="spinner">' +
    '<div class="bounce1"></div>' +
    '<div class="bounce2"></div>' +
    '<div class="bounce3"></div>' +
    '</div>' +
    //'<input type="text" id="chat-input" autocomplete="off" placeholder="Escribe un mensaje"'+ 'class="form-control bot-txt"/>'+
    '<input type="text" id="message" autocomplete="off" placeholder="Escribe un mensaje"' + 'class="form-control bot-txt" autofocus=1/>' +
    '</div>' +
    '</div><!--chatCont end-->' +

    '<div class="profile_div">' +
    '<div class="row">' +
    '<div class="col-hgt">' +
    '<img src="assets/img/bot2.svg" class="img-circle img-profile">' +
    '</div><!--col-hgt end-->' +
    '<div class="col-hgt">' +
    '<div class="chat-txt">' +
    'Escribe ahora!' +
    '</div>' +
    '</div><!--col-hgt end-->' +
    '</div><!--row end-->' +
    '</div><!--profile_div end-->';

  $("chat").html(chat);

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

});
