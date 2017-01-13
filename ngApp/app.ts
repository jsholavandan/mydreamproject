namespace dreamjournal {

    angular.module('dreamjournal', ['ngMessages', 'ngMaterial', 'ngAnimate', 'ngFlash', 'ngPassword', 'ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: dreamjournal.Controllers.MainController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: dreamjournal.Controllers.AccountController,
                controllerAs: 'controller'
            })
            .state('register', {
              url:'/register',
              templateUrl:'/ngApp/views/register.html',
              controller:dreamjournal.Controllers.AccountController,
              controllerAs:'controller'
            })
            .state("mainPage", {
              url: '/mainPage',
              templateUrl: '/ngApp/views/mainPage.html',
              controller: dreamjournal.Controllers.MainPageController,
              controllerAs: 'controller'
            })
            .state('addDream', {
              url:'/addDream',
              templateUrl: '/ngApp/views/addDream.html',
              controller: dreamjournal.Controllers.AddDreamController,
              controllerAs: 'controller'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/home');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });



}
