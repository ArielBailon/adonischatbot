  (function() {

    document.body.innerHTML += `<link href="https://chat.tawsa.com/assets/css/chat_iframe.css" rel="stylesheet" />
    <iframe id="iframe_chat_tawsa" src="https://chat.tawsa.com/popup_chat/1/2" class="expanded-height" style="z-index: 9999999999; background-color: transparent; border: none; width: auto; height: auto; position: fixed; right: 15px; bottom: 0px;" allowfullscreen> </iframe>`;


    $("#iframe_chat_tawsa").load(function () {
        console.log(document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".profile_div"));
    });

    /*document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".profile_div").addEventListener('click', function(event) {
      //document.getElementById('iframe_chat_tawsa').setAttribute('class', 'collapsed-height');
      document.getElementById('iframe_chat_tawsa').setAttribute('class', 'expanded-height');
    });
    document.getElementById('iframe_chat_tawsa').contentWindow.document.querySelector(".close").addEventListener('click', function(event) {
      document.getElementById('iframe_chat_tawsa').setAttribute('class', 'collapsed-height');
      //document.getElementById('iframe_chat_tawsa').setAttribute('class', 'expanded-height');
    });*/
    //alert("a5");

  })();
