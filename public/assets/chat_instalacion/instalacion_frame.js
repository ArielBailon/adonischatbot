var body = document.getElementsByTagName('body');
document.body.innerHTML +='<iframe id="iframe_prueba" sandbox="allow-scripts allow-same-origin"  src="about:blank" style="z-index: 1999999;background-color: transparent;border: none;width: 300px;height: 86px;max-width: 360px;position: fixed;right: 15px;bottom: 0px;"></iframe>';

var x = document.getElementById("iframe_prueba");
var y = (x.contentWindow || x.contentDocument);
if (y.document)y = y.document;
y.head.innerHTML = `<link rel="stylesheet" href="https://chat.tawsa.com/assets/css/chat.css"><script>function iFrameFunction(){alert("Hola mundo");}</script>`;
y.body.innerHTML  = `<div class="chat-box"><chat><div class="chatCont" id="chatCont">
                <div class="bot_profile">
                <img src="https://chat.tawsa.com/assets/img/bot2.svg" class="bot_p_img">
                <div class="close">
                <i class="fa fa-times" aria-hidden="true"></i>
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
                <div class="profile_div" onclick="iFrameFunction();">
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
                </div><!--profile_div end--></chat></div>`;

/*<script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script>
<script type="text/javascript" src="https://unpkg.com/@adonisjs/websocket-client@1.0.9/dist/Ws.browser.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.26.0/polyfill.min.js"></script>
<script type="text/javascript" src="https://chat.tawsa.com/assets/chat_instalacion/5e615c30542bea3118de7b99/5e615cd6542bea3118de7b91.js" > </script>*/

//y.body.innerHTML = `<script type="text/javascript" src="https://chat.tawsa.com/assets/chat_instalacion/5e615c30542bea3118de7b99/5e615cd6542bea3118de7b9a.js" > </script>`;
