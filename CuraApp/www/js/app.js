/* Autor: Luis Bahamonde */

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'jett.ionic.filter.bar', 'ion-gallery', 'jett.ionic.scroll.sista', 'ngIOS9UIWebViewPatch', 'ion-affix'])

.run(function ($ionicPlatform, $rootScope) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            //StatusBar.styleDefault();
            StatusBar.styleLightContent();
        }
        // Caso seja IOS
        if (device.platform === "iOS") {
            window.plugin.notification.local.promptForPermission();
        }
    });
}).config(function ($stateProvider, $urlRouterProvider, $ionicFilterBarConfigProvider, $ionicConfigProvider) {

    $ionicFilterBarConfigProvider.theme('light');
    $ionicFilterBarConfigProvider.clear('ion-close');
    $ionicFilterBarConfigProvider.search('ion-search');
    $ionicFilterBarConfigProvider.backdrop(true);
    $ionicFilterBarConfigProvider.transition('vertical');
    $ionicFilterBarConfigProvider.placeholder('Buscar...');
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('Volar');
    $stateProvider.state('tab', {
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