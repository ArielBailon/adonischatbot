(function() {
  const Widget = Object.create({
      create(chatId) {
          const wdg = document.createElement("div");
          wdg.classList.add("chat-box");
          wdg.innerHTML = `
          <chat><div class="chatCont" id="chatCont">
          <div class="bot_profile">
          <img src="https://chat.tawsa.com/assets/img/bot2.svg" class="bot_p_img">
          <div class="close">
          <!--<i class="fa fa-times" aria-hidden="true"></i>-->
          X
          </div>
          </div><!--bot_profile end-->
          <form id="guardarChatForm" class="resultDiv messages" action="#" method="POST" >
          <div id="result_div"></div>
          </form>
          <div class="chatForm" id="chat-div">
          <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
          </div>
          <input type="text" id="message" autocomplete="off" placeholder="Escribe un mensaje" class="form-control bot-txt" autofocus="1/">
          </div>
          </div><!--chatCont end-->
          <div class="profile_div" id="profile_div">
          <div class="row">
          <div class="col-hgt">
          <img src="https://chat.tawsa.com/assets/img/bot2.svg" class="img-circle img-profile">
          </div><!--col-hgt end-->
          <div class="col-hgt">
          <div class="chat-txt">
          Escribe ahora!
          </div>
          </div><!--col-hgt end-->
          </div><!--row end-->
          </div><!--profile_div end--></chat>`;
          // Load your chat data into UI
          // console.log(wdg);
          return wdg;
      }
  });

  document.body.innerHTML += `<link href="https://chat.tawsa.com/assets/css/chat_iframe.css" rel="stylesheet" />
  <iframe id="iframe_chat_tawsa" class="collapsed-height" style="z-index: 9999999999; background-color: transparent; border: none; width: auto; height: auto; position: fixed; right: 15px; bottom: 0px;" allowfullscreen> </iframe>`;

  const myWidgetInstance = Widget.create("Prueba de chat-12345");
  const id = `chat-${ Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) }`;
  let elementId = document.createElement('div');
  elementId.setAttribute('id', id);
  elementId.appendChild(myWidgetInstance);
  document.getElementById('iframe_chat_tawsa').contentWindow.document.body.appendChild(elementId);

  let script4 = document.createElement('script');
  script4.setAttribute('type', 'text/javascript');
  script4.setAttribute('src', 'https://code.jquery.com/jquery-3.4.1.js');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.body.appendChild(script4);

  let script1 = document.createElement('script');
  script1.setAttribute('type','text/javascript');
  script1.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.body.appendChild(script1);

  let link1 = document.createElement('link');
  link1.setAttribute('rel', 'stylesheet');
  link1.setAttribute('href','https://chat.tawsa.com/assets/css/chat.css');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.head.appendChild(link1);

  let link2 = document.createElement('link');
  link2.setAttribute('rel', 'stylesheet');
  link2.setAttribute('href','https://chat.tawsa.com/assets/plugins/fontawesome-free/css/all.min.css');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.head.appendChild(link2);

  let script2 = document.createElement('script');
  script2.setAttribute('type', 'text/javascript');
  script2.setAttribute('src','https://unpkg.com/@adonisjs/websocket-client@1.0.9/dist/Ws.browser.js');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.body.appendChild(script2);

  let script3 = document.createElement('script');
  script3.setAttribute('type', 'text/javascript');
  //script3.setAttribute('src','https://chat.tawsa.com/assets/chat_instalacion/script_iframe.js');
  script3.setAttribute('src','https://chat.tawsa.com/assets/chat_instalacion/5e615c30542bea3118de7b99/5e615cd6542bea3118de7b91.js');
  document.getElementById('iframe_chat_tawsa').contentWindow.document.body.appendChild(script3);

  console.log(document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".profile_div"));
  document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".profile_div").addEventListener('click', function(event) {
    //document.getElementById('iframe_chat_tawsa').setAttribute('class', 'collapsed-height');
    document.getElementById('iframe_chat_tawsa').setAttribute('class', 'expanded-height');
  });
  document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".close").addEventListener('click', function(event) {
    document.getElementById('iframe_chat_tawsa').setAttribute('class', 'collapsed-height');
    //document.getElementById('iframe_chat_tawsa').setAttribute('class', 'expanded-height');
  });

})();
