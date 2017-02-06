var dreamjournal;
(function (dreamjournal) {
    angular.module('dreamjournal', ['angularMoment', 'ngMapHilight', 'ngMessages', 'googlechart', 'ngMaterial', 'ngAnimate', 'ngFlash', 'ngPassword', 'ui.router', 'ngResource', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
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
            url: '/register',
            templateUrl: '/ngApp/views/register.html',
            controller: dreamjournal.Controllers.AccountController,
            controllerAs: 'controller'
        })
            .state("mainPage", {
            url: '/mainPage',
            templateUrl: '/ngApp/views/mainPage.html',
            controller: dreamjournal.Controllers.MainPageController,
            controllerAs: 'controller'
        })
            .state('addDream', {
            url: '/addDream',
            templateUrl: '/ngApp/views/addDream.html',
            controller: dreamjournal.Controllers.AddDreamController,
            controllerAs: 'controller'
        })
            .state('dreamJournal', {
            url: '/dreamJournal',
            templateUrl: '/ngApp/views/dreamJournal.html',
            controller: dreamjournal.Controllers.DreamJournalController,
            controllerAs: 'controller'
        })
            .state('editDream', {
            url: '/editDream/:id',
            templateUrl: '/ngApp/views/editDream.html',
            controller: dreamjournal.Controllers.EditDreamController,
            controllerAs: "controller"
        })
            .state('showDream', {
            url: '/showDream/:id',
            templateUrl: '/ngApp/views/dream.html',
            controller: dreamjournal.Controllers.ShowDreamController,
            controllerAs: 'controller'
        })
            .state('searchTxtDreams', {
            url: '/searchTxtDreams/:txt',
            templateUrl: '/ngApp/views/searchDreams.html',
            controller: dreamjournal.Controllers.SearchTextController,
            controllerAs: 'controller'
        })
            .state('dreamGraphs', {
            url: '/dreamGraphs',
            templateUrl: '/ngApp/views/dreamGraphs.html',
            controller: dreamjournal.Controllers.DreamGraphController,
            controllerAs: 'controller'
        })
            .state('dreamCalendar', {
            url: '/dreamCalendar',
            templateUrl: '/ngApp/views/dreamCalendar.html',
            controller: dreamjournal.Controllers.DreamCalendarController,
            controllerAs: 'controller'
        })
            .state('dreamProfile', {
            url: '/dreamProfile',
            templateUrl: '/ngApp/views/dreamSettings.html',
            controller: dreamjournal.Controllers.DreamProfileController,
            controllerAs: 'controller'
        })
            .state('searchPublic', {
            url: '/searchPublic/:txt',
            templateUrl: '/ngApp/views/searchPublicDreams.html',
            controller: dreamjournal.Controllers.SearchTextController,
            controllerAs: 'controller'
        })
            .state('interpret', {
            url: '/interpret',
            templateUrl: '/ngApp/views/interpret.html',
            controller: dreamjournal.Controllers.InterpretController,
            controllerAs: "controller"
        })
            .state('interpret.meanings', {
            url: '/dreamMeanings/:symbol',
            templateUrl: '/ngApp/views/dreamMeanings.html',
            controller: dreamjournal.Controllers.DreamMeaningsController,
            controllerAs: 'controller'
        });
        $urlRouterProvider.otherwise('/home');
        $locationProvider.html5Mode(true);
    });
})(dreamjournal || (dreamjournal = {}));
