/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic', 'ngCordova','starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix'])

.run(function($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function() {

    /*setTimeout(function () {
        navigator.splashscreen.hide();
    }, 2000);*/

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
        //StatusBar.styleDefault();
        StatusBar.styleLightContent();
    }
    
    // Configura a notificação, altere o senderID
    var push = PushNotification.init({
      "android": {"senderID": "246895777276", icon : "icon"},
      "ios": {"alert": "true", "badge": "true", "sound": "true"},
      "windows": {}
    });

    // veja a explicação seguir
    push.on('registration', function(data) {
       console.log(data.registrationId);
    });

    // O que fazer quando clicar em uma notificação
    push.on('notification', function(data) {
      alert('Notificação acionada, agora deve-se implementar a navegação no app de acordo com os dados: ' + JSON.stringify(data));
    });

    // erro caso não possa registrar (veja a explicação seguir)
    push.on('error', function(e) {
      alert('registration error: ' + e.message);
    });

  });
  /*
var push = PushNotification.init({ "android": {"senderID": "924412518063", icon : "icon"},

        "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );



   /*

   Este é o evento que será chamado assim que o GCM responder a requisição

   com o id do dispositivo.

   É neste método que devendo mandar o id e armazenar em nosso servidor para enviarmos

   notificações posteriormente

   

   push.on('registration', function(data) {

       console.log(data);

       alert(data.registrationId);

   });



    // Este é o evento no qual implementando o comportamento do nosso app

    // quando o usuário clicar na notificação

    push.on('notification', function(data) {

       alert('Notificação acionada, agora deve-se implementar a navegação no app de acordo com os dados: ' + JSON.stringify(data));

   });



   push.on('error', function(e) {

       alert('registration error: ' + e.message);

   });
   */
})

.config(function($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {

        $ionicFilterBarConfigProvider.theme('light');
        $ionicFilterBarConfigProvider.clear('ion-close');
        $ionicFilterBarConfigProvider.search('ion-search');
        $ionicFilterBarConfigProvider.backdrop(true);
        $ionicFilterBarConfigProvider.transition('vertical');
        $ionicFilterBarConfigProvider.placeholder('Search...');

        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text('');



    $stateProvider

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  .state('tab.agenda', {
    url: '/agenda',
    views: {
      'tab-agenda': {
        templateUrl: 'templates/tab-agenda.html',
        controller: 'AgendaController'
      }
    }
  })
  .state('tab.fotos', {
      url: '/fotos',
      views: {
        'tab-fotos': {
          templateUrl: 'templates/tab-fotos.html',
          controller: 'FotosController'
        }
      }
    })
    .state('tab.fotos-detail', {
      url: '/fotos/:fotosId',
      views: {
        'tab-fotos': {
          templateUrl: 'templates/fotos-detail.html',
          controller: 'AlbunesController'
        }
      }
    })
    .state('tab.favoritos', {
        url: '/favoritos',
        views: {
            'tab-favoritos': {
                templateUrl: 'templates/tab-love.html',
                controller: 'FavoritosController'
            }
        }
    })
  .state('tab.account', {
        url: '/account',
        views: {
            'tab-account': {
                templateUrl: 'templates/tab-account.html',
                controller: 'AjustesController'
            }
        }
  });

  /*Si ninguno de los siguientes estados esta activo reenviar a /tab/agenda */
  $urlRouterProvider.otherwise('/tab/agenda');

});