let ws = null

function startChat(chatId) {
  ws = adonis.Ws().connect()
    ws.on('open', () => {

      $('.connection-status').addClass('connected')
      console.log(chatId)

      let clienteEl = document.getElementById("cliente"+chatId)

      console.log(clienteEl);

      clienteEl.classList.add("disabled");

      subscribeToChannel(chatId)
      $("#ajaxStart").click(function() {
        $("#ajaxStart").attr("disabled", true);
        $.ajax({
            url: 'http://localhost:8080/jQueryTest/test.json',
            data: {
                action: 'viewRekonInfo'
            },
            type: 'post',
            success: function(response){
                //success process here
                $("#alertContainer").delay(1000).fadeOut(800);

                $("#ajaxStart").attr("disabled", false);
            },
            error: errorhandler,
            dataType: 'json'
        });
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
      <p class="userEnteredText font-weight-bold">Jean</p><div class="clearfix"></div><p class="botResult">${message.body}</p><div class="clearfix"></div>
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
      xhr.open('GET', 'http://127.0.0.1:3333/get_id_chat', true);

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
      xhr.send()

    return
  }
})

