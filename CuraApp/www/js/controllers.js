function openExternal(elem) {
    window.open(elem.href, "_system");
    return false; // Prevent execution of the default onClick handler 
}

function handleOpenURL(url) {
    // Open in external browser
    window.open(url, "_system");
    return false;
}

angular.module('starter.controllers', [])
    
.controller('AgendaController', function($scope, $http, $cordovaLocalNotification,$ionicFilterBar, $ionicModal) {
    
    /***** MODAL DE INFORMAÇÕES DA CARRINHO ******/
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/busca.html', {
        scope: $scope
    }).then(function(modal) {
      $scope.modalCarrinho = modal;
    });
    // Triggered in the login modal to close it
    $scope.fecharCarrinho = function() {
                console.log("aaa");
        $scope.modalCarrinho.hide();
        return false;
    };
    $scope.showFilterBar = function () {
        $scope.modalCarrinho.show();
    };
    // Open the login modal
    $scope.abrirCarrinho = function() {
        $scope.modalCarrinho.show();
    };
    $scope.busca = {};
    $scope.doBuscar = function(){ 
        if($scope.busca.texto != undefined && $scope.busca.texto.length > 2){
            // Open in external browser
            window.open("http://www.curapelanatureza.com.br/search/node/" + (($scope.busca.texto != undefined && $scope.busca.texto != "") ? $scope.busca.texto : ""), "_system");
        }else{
            alert("É necessário digicar uma palavra com ao menos 3 letras");
        }
        return false;
    }
    /***** FIM MODAL DE INFORMAÇÕES DA CARRINHO ******/
    
    $scope.carregado = true;
    $scope.openExternalTeste = function(element){
        handleOpenURL(element)
    }
    
    var horaUltimoPost = "12:23";
    $scope.atualizarLista = function(){
        momentoAtual = new Date() 
        minutos = parseInt(momentoAtual.getMinutes()) >= 10 ?  momentoAtual.getMinutes() : "0" +  momentoAtual.getMinutes();
		
        $scope.atualizado = momentoAtual.getHours() + ":" + minutos;
        $http({
          url: 'http://www.curapelanatureza.com.br/ultimas-mobile?v='+$scope.atualizado,
          method: "GET",
          headers: {
                'Content-Type': 'application/json' // Note the appropriate header
          }
        }).success(function(data, status) {
                var obj = data;
                // Passando a not�cia
                $scope.listaNode = obj;
                $scope.carregado = false;
                arr = Array.from(obj);
                for( var i in obj ) {
                    if (obj.hasOwnProperty(i)){
//                        horaUltimoPost =obj[i][0].hora;
                        break;
                    }
                }
          }).error(function(data, status) {});
    }
    // Irá abrir o link no navegador
    $scope.GotoLink = function (url) {
        console.log(url);
        window.open(url,'_system');
    }
    // Atualizando a lista
    $scope.atualizarLista();
    // Iniciando
    $scope.navTitle='<img class="title-image title-center" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
    // Agendando próxima execução
    $scope.add = function() {
        // Iniciando as notificaçoes
        setTimeout(function(){
            var horaAtual = "";
            $http({
                url: 'http://www.curapelanatureza.com.br/ultimas-mobile?v='+$scope.atualizado,
                method: "GET",
                headers: {
                      'Content-Type': 'application/json' // Note the appropriate header
                }
            }).success(function(data, status) {
                var obj = data;
                arr = Array.from(obj);
                for( var i in obj ) {
                    if (obj.hasOwnProperty(i)){
                        horaAtual =obj[i][0].hora;
                        break;
                    }
                }
                // Caso a ultima hora seja diferente que a atual
                if(horaUltimoPost != horaAtual){
                    horaUltimoPost = horaAtual;
                    $scope.adicionarNotificacao();
                }else{
                            console.log("está certo");
                }
            }).error(function(data, status) {});
            // Mandento a execução
            $scope.add();
        }, 60000);
    };
    // Iniciando as notificaçoes
    $scope.add();
    // Método que irá adicionar notificação sempre que tiver uma nova
    $scope.adicionarNotificacao = function(){
        var alarmTime = new Date();
            var proximaNotificacao = alarmTime.getMinutes();
            alarmTime.setMinutes(proximaNotificacao);
            // Agendando a notificação
            $cordovaLocalNotification.add({
                id: "1234",
                date: alarmTime,
                message: "Cura Pela Natureza",
                title: "Temos um novo post para você",
                autoCancel: true,
                sound: null,
                icon: "img/icon.png"
            }).then(function () {
                $scope.atualizarLista();
            });
    };
})

.controller('FotosController', function($scope, $http,$ionicFilterBar, $ionicModal) {
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
    $http({
      url: 'http://www.curapelanatureza.com.br/secoes-mobile',
      method: "GET",
      headers: {
        'Content-Type': 'application/json' // Note the appropriate header
      }
    }).success(function(data, status) {
        var obj = data;
        // Passando a not�cia
        $scope.listaSecoes = obj;
      }).error(function(data, status) {
        console.log(data || "Request failed");
    });
    
    $scope.openExternalTeste = function(element){
        handleOpenURL(element)
    }
    
    /***** MODAL DE INFORMAÇÕES DA CARRINHO ******/
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/busca.html', {
        scope: $scope
    }).then(function(modal) {
      $scope.modalCarrinho = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeModalCarrinho = function() {
        $scope.modalCarrinho.hide();
    };
    
    $scope.showFilterBar = function () {
        $scope.modalCarrinho.show();
    };
    // Open the login modal
    $scope.abrirCarrinho = function() {
        $scope.modalCarrinho.show();
    };
    
    $scope.busca = {};
    $scope.doBuscar = function(){
        
        handleOpenURL("http://www.curapelanatureza.com.br/search/node/" + $scope.busca.texto);
    }
    /***** FIM MODAL DE INFORMAÇÕES DA CARRINHO ******/
})
.controller('AlbunesController', function($scope, $stateParams, Locales) {
})
.controller('FavoritosController', function($scope, $http,$ionicFilterBar, $ionicModal) {
    
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
    $scope.carregado = true;
    $http({
      url: 'https://www.googleapis.com/youtube/v3/activities?part=snippet&channelId=UCYSslASzgHQ_F_vuTsmmi-g&fields=items&key=AIzaSyAw1iMzPYy--o1pxJkVaxRb6W8zJvYPN94',
      method: "GET",
      headers: {
            'Content-Type': 'application/json' // Note the appropriate header
      }
    }).success(function(data, status) {
            var obj = data;
            var contador = 0;
            for(contador = 0;  contador < obj.items.length; contador++){
                itemAtual = obj.items[contador];
                arrUrl = itemAtual.snippet.thumbnails.high.url.split("/");
                itemAtual.url = "https://www.youtube.com/watch?v=" + arrUrl[4];
                data = itemAtual.snippet.publishedAt.split("T");;
                arrData = data[0].split("-");
                itemAtual.data = arrData[2] + "/" + arrData[1] + "/" + arrData[0];
                obj.items[contador] = itemAtual;
            }
            // Passando a not�cia
            $scope.listaYoutube = obj;
            $scope.carregado = false;
      }).error(function(data, status) {
            console.log(data || "Request failed");
    });
        
    /***** MODAL DE INFORMAÇÕES DA CARRINHO ******/
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/busca.html', {
        scope: $scope
    }).then(function(modal) {
      $scope.modalCarrinho = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeModalCarrinho = function() {
        $scope.modalCarrinho.hide();
    };
    
    $scope.showFilterBar = function () {
        $scope.modalCarrinho.show();
    };
    // Open the login modal
    $scope.abrirCarrinho = function() {
        $scope.modalCarrinho.show();
    };
    
    $scope.busca = {};
    $scope.doBuscar = function(){
        
        handleOpenURL("http://www.curapelanatureza.com.br/search/node/" + $scope.busca.texto);
    }
    /***** FIM MODAL DE INFORMAÇÕES DA CARRINHO ******/
    $scope.openExternalTeste = function(element){
        handleOpenURL(element)
    }
})

.controller('AjustesController', function($scope) {
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
        $scope.settings = {
            enviarNotificaciones: true
        };
});
