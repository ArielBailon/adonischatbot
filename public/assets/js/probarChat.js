$(document).ready(function() {
	var mybot = '<div class="chatCont" id="chatCont">'+
								'<div class="bot_profile">'+
									'<img src="assets/img/bot2.svg" class="bot_p_img">'+
									'<div class="close">'+
										'<i class="fa fa-times" aria-hidden="true"></i>'+
									'</div>'+
                '</div><!--bot_profile end-->'+
                '<form id="guardarChatForm" action="/guardarChatCliente" method="POST" >'+
                 '<div id="result_div" class="resultDiv messages"></div>'+
								'</form>'+
								'<div class="chatForm" id="chat-div">'+
									'<div class="spinner">'+
										'<div class="bounce1"></div>'+
										'<div class="bounce2"></div>'+
										'<div class="bounce3"></div>'+
									'</div>'+
									//'<input type="text" id="chat-input" autocomplete="off" placeholder="Escribe un mensaje"'+ 'class="form-control bot-txt"/>'+
									'<input type="text" id="message" autocomplete="off" placeholder="Escribe un mensaje"'+ 'class="form-control bot-txt" autofocus=1/>'+
								'</div>'+
							'</div><!--chatCont end-->'+

							'<div class="profile_div">'+
								'<div class="row">'+
									'<div class="col-hgt">'+
										'<img src="assets/img/bot2.svg" class="img-circle img-profile">'+
									'</div><!--col-hgt end-->'+
									'<div class="col-hgt">'+
										'<div class="chat-txt">'+
											'Escribe ahora!'+
										'</div>'+
									'</div><!--col-hgt end-->'+
								'</div><!--row end-->'+
							'</div><!--profile_div end-->';

	$("mybot").html(mybot);

	// ------------------------------------------ Toggle chatbot -----------------------------------------------
	$('.profile_div').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
		$('.chatForm').toggle();
		document.getElementById('message').focus();
	});

	$('.close').click(function() {
		$('.profile_div').toggle();
		$('.chatCont').toggle();
		$('.bot_profile').toggle();
    $('.chatForm').toggle();
    $('#guardarChatForm').submit();
	});


	var session = function() {
		// Retrieve the object from storage
		if(sessionStorage.getItem('session')) {
			var retrievedSession = sessionStorage.getItem('session');
		} else {
			// Random Number Generator
			var randomNo = Math.floor((Math.random() * 1000) + 1);
			// get Timestamp
			var timestamp = Date.now();
			// get Day
			var date = new Date();
			var weekday = new Array(7);
			weekday[0] = "Sunday";
			weekday[1] = "Monday";
			weekday[2] = "Tuesday";
			weekday[3] = "Wednesday";
			weekday[4] = "Thursday";
			weekday[5] = "Friday";
			weekday[6] = "Saturday";
			var day = weekday[date.getDay()];
			// Join random number+day+timestamp
			var session_id = randomNo+day+timestamp;
			// Put the object into storage
			sessionStorage.setItem('session', session_id);
			var retrievedSession = sessionStorage.getItem('session');
		}
		return retrievedSession;
		// console.log('session: ', retrievedSession);
	}

	// Call Session init
	var mysession = session();

	/****Metodos originales de chat***/
	$('#message').keyup(function (e) {
		if (e.which === 13) {
		  e.preventDefault()

		  const message = $(this).val()
		  $(this).val('')

		  ws.getSubscription('chatbot').emit('message', {
        username: window.username,
        body: message
      })
      scrollToBottomOfResults();
      showSpinner();
		  return false
		}
	})
	function subscribeToChannel() {
		const chat = ws.subscribe('chatbot')

		chat.on('error', () => {
		  $('.connection-status').removeClass('connected')
		})

		chat.on('message', (message) => {
      setTimeout(function(){

        if(message.username == 'Chatbot'){
        $('.messages').append(`<input type="hidden" name="mensajes[]" value="${message.body}"></input><p class="botResult">${message.body}</p><div class="clearfix"></div>`)
        }else{
        $('.messages').append(`<input type="hidden" name="mensajes[]" value="${message.body}"></input><p class="userEnteredText">${message.body}</p><div class="clearfix"></div>`)
        }
        scrollToBottomOfResults();
		  	hideSpinner();
      }, 500);
		})
	}
	function startChat() {
		ws = adonis.Ws().connect()
		ws.on('open', (datos) => {
      $('.connection-status').addClass('connected')


      let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:3333/saludoInicial', true);

        xhr.onload = function() {
          if (this.status == 200) {
            // console.log(JSON.parse(this.responseText)[1]);
            // var id = JSON.parse(this.responseText)[1]
            // var id = this.responseText;
            // return this.responseText

            $('.messages').append(`
            <p class="botResult">${this.responseText}</p><div class="clearfix"></div>
          `)
          }
        }
        xhr.send()
		  subscribeToChannel()
		})

		ws.on('error', () => {
		  $('.connection-status').removeClass('connected')
		})
  }

      // Llamar con ajax el tiempo automático de saludo, en funcion setTimeout

      // if ($('#chatCont').css('display') == 'none'){
      //   setTimeout(function(){
      //     $('.profile_div').toggle();
      //     $('.chatCont').toggle();
      //     $('.bot_profile').toggle();
      //     $('.chatForm').toggle();
      //     document.getElementById('message').focus();
      //   }, 2000)
      // }
	if (window.username) {
		startChat()
	}
	/**********Fin metodos originales de chat***********/


	//---------------------------------- Scroll to the bottom of the results div -------------------------------
	function scrollToBottomOfResults() {
		var terminalResultsDiv = document.getElementById('result_div');
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
