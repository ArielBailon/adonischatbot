agregarScriptEnIframe();
agregarBtnEnIframe();
function agregarScriptEnIframe(){
    let scriptNuevo = document.createElement('script');
    scriptNuevo.setAttribute('src','https://chat.tawsa.com/assets/chat_instalacion/script_iframe.js');
    document.getElementById('iframe1').contentWindow.document.body.appendChild(scriptNuevo);
}


function agregarBtnEnIframe(){
  let scriptNuevo = document.createElement('button');
  scriptNuevo.setAttribute('id','btn1');
  scriptNuevo.setAttribute('onclick','alerta("hola mundo denteo")');
  scriptNuevo.setAttribute('style', 'width: 50%;height: 50%;');
  document.getElementById('iframe1').contentWindow.document.body.appendChild(scriptNuevo);
}

document.getElementById('boton').addEventListener('click',function(){
    //document.getElementById('iframe1').contentWindow.alerta('Esta alerta del iframe se llamó desde afuera del iframe');
    alerta('Esta alerta del iframe se llamó desde afuera del iframe');
});
