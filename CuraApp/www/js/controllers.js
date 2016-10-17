function openExternal(elem) {
    console.log(elem.href);
    window.open(elem.href, "_system");
    return false; // Prevent execution of the default onClick handler 
}

function handleOpenURL(url) {
	console.log(url)
    // Open in external browser
	window.open('http://google.com','_system','location=yes');
	return false;
}

angular.module('starter.controllers', [])
    
.controller('AgendaController', function($scope, $http, $cordovaLocalNotification) {
    
    $scope.carregado = true;
    $scope.atualizarLista = function(){
        momentoAtual = new Date() 
		minutos = parseInt(momentoAtual.getMinutes()) > 10 ?  momentoAtual.getMinutes() : "0" +  momentoAtual.getMinutes();
		
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
          }).error(function(data, status) {
                console.log(data || "Request failed");
        });
    }
	
	
    $scope.GotoLink = function (url) {
        console.log(url);
        window.open(url,'_system');
    }
    
    $scope.atualizarLista();
	
    $scope.navTitle='<img class="title-image title-center" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
    
    
    // Agendando próxima execução
    $scope.add = function() {
        var alarmTime = new Date();
        var proximaNotificacao = alarmTime.getMinutes() + 1;
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
            console.log("Próxima notificação em: " + proximaNotificacao);
            // Iniciando as notificaçoes
            setTimeout(function(){
				console.log("execução em 2 minutos")
				// Iniciando as notificaçoes
				$scope.add();
			}, 120000);
        });
    };
    // Iniciando a notificação em 1 segundo
	setTimeout(function(){
		// Iniciando as notificaçoes
		$scope.add();
	}, 1000);
    
})

.controller('FotosController', function($scope, $http) {
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
})
.controller('AlbunesController', function($scope, $stateParams, Locales) {
})
.controller('FavoritosController', function($scope, $http) {
    
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
                itemAtual.url = arrUrl[4];
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
        
})

.controller('AjustesController', function($scope) {
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
        $scope.settings = {
            enviarNotificaciones: true
        };
});
