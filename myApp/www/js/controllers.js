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
    
//    var alarmTime = new Date();
//alarmTime.setMinutes(alarmTime.getMinutes() + 1);
//    $cordovaLocalNotification.add({
//        id: "1234",
////        date: alarmTime,
//        message: "This is a message",
//        title: "This is a title",
//        autoCancel: true,
//        sound: null
//    }).then(function () {
//        console.log("The notification has been set");
//    });
    $scope.add = function() {
        var alarmTime = new Date();
        alarmTime.setMinutes(alarmTime.getMinutes() + 1);
        $cordovaLocalNotification.add({
            id: "1234",
            date: alarmTime,
            message: "Cura Pela Natureza",
            title: "Temos um novo post para você",
            autoCancel: true,
            sound: null,
            icon: "img/icon.png"
        }).then(function () {
            console.log("The notification has been set");
        });
    };
 
    $scope.isScheduled = function() {
        $cordovaLocalNotification.isScheduled("1234").then(function(isScheduled) {
            alert("Notification 1234 Scheduled: " + isScheduled);
        });
    }
    
    $scope.carregado = true;
    $scope.atualizarLista = function(){
        momentoAtual = new Date() 
        $scope.atualizado = momentoAtual.getHours() + ":" + momentoAtual.getMinutes();
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
