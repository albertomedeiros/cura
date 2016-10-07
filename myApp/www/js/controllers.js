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
    
.controller('AgendaController', function($scope, $http) {
	
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
			// Passando a notícia
			$scope.listaNode = obj;
			
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
            // Passando a notícia
            $scope.listaSecoes = obj;
          }).error(function(data, status) {
            console.log(data || "Request failed");
        });
})

.controller('AlbunesController', function($scope, $stateParams, Locales) {
	
	

})

.controller('FavoritosController', function($scope, $http) {
    
    $scope.navTitle='<img class="title-image" style="height: 27px;margin-top: 8px;" src="img/logo.png" />';
	
	$http({
	  url: 'https://www.googleapis.com/youtube/v3/activities?part=snippet&channelId=UCYSslASzgHQ_F_vuTsmmi-g&fields=items&key=AIzaSyAw1iMzPYy--o1pxJkVaxRb6W8zJvYPN94',
	  method: "GET",
	  headers: {
		'Content-Type': 'application/json' // Note the appropriate header
	  }
	}).success(function(data, status) {
		var obj = data;
		// Passando a notícia
		$scope.listaYoutube = obj;
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
