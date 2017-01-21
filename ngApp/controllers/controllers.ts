namespace dreamjournal.Controllers {

    export class MainController {

        public home(){
          this.$state.go('home');
        }
        public login(){
          this.$state.go('login');
        }

        public register(){
          this.$state.go('register');
        }

        public mainPage(){
          this.$state.go('mainPage');
        }

        public logout(){
          this.$rootScope.currentUser = false;
          this.$rootScope.username = null;
          this.$window.localStorage.removeItem('token');
          this.$state.go('home');
        }


        constructor(private $state: ng.ui.IStateService,
                    private $window: ng.IWindowService,
                    private $rootScope:ng.IRootScopeService){

                    this.$rootScope.currentUser = false;
        }
    }

    angular.module('dreamjournal').controller('MainController', MainController);


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
