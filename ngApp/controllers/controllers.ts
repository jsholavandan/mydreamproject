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

        constructor(private $state: ng.ui.IStateService){

        }
    }

    angular.module('dreamjournal').controller('MainController', MainController);


    export class AboutController {
        public message = 'Hello from the about page!';
    }

}
