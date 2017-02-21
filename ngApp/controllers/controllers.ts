namespace dreamjournal.Controllers {

    export class MainController {
      public searchTxt;
      public dreams;
      public totalItems;
      public currentPage;
      public itemsPerPage = 5;

        public home(){
          this.$rootScope.fromHome = true;
          this.$state.go('home');
        }
        public login(){
          this.$rootScope.fromHome = false;
          this.$state.go('login');
        }

        public register(){
          this.$rootScope.fromHome = false;
          this.$state.go('register');
        }

        public mainPage(){
          this.$rootScope.fromHome = false;
          this.$state.go('optionsPage.mainPage');
        }

        public logout(){
          this.$rootScope.currentUser = false;
          this.$rootScope.username = null;
          this.$window.localStorage.removeItem('token');
          this.$rootScope.fromHome = true;
          this.$state.go('home');
        }

        public search(){
          if(typeof this.$rootScope.fromHome === 'undefined' || this.$rootScope.fromHome === true){
            this.$state.go('searchPublic',{txt: this.searchTxt});
          }else{
            console.log(this.searchTxt);
            this.$state.go('optionsPage.searchTxtDreams', {txt: this.searchTxt});
          }
        }

        public showDream(id){
          this.$state.go('showDream', {id:id, prev:'home'});
        }


        constructor(private $state: ng.ui.IStateService,
                    private $window: ng.IWindowService,
                    private $rootScope:ng.IRootScopeService,
                    private dreamService: dreamjournal.Services.DreamService,
                    private Flash){
            if(typeof this.$rootScope.currentUser === 'undefined'){
              this.$rootScope.currentUser = false;
            }            
            this.dreamService.listPublicDreams().$promise.then((dreams) => {
              this.dreams = dreams;
              this.totalItems = dreams.length;
              this.currentPage = 1;
              if(dreams.length === 0){
                this.Flash.create('info', "No public dreams available.")
              }
            });
        }
    }

    angular.module('dreamjournal').controller('MainController', MainController);

}
