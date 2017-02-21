namespace dreamjournal.Controllers {
    export class SearchTextController{
      public dreams;
      public totalItems;
      public currentPage;
      public itemsPerPage = 10;

      public closeDialog(flash){
        if(flash.type === 'info' || flash.type === 'danger'){
          this.$state.go('optionsPage.mainPage');
        }
      }

      public editDream(id){
        this.$state.go('editDream',{id:id});
      }

      public showDream(id){
        this.$state.go('showDream', {id:id});
      }



      constructor(private $stateParams:ng.ui.IStateParamsService,
                  private searchService: dreamjournal.Services.SearchService,
                  private $rootScope: ng.IRootScopeService,
                  private Flash,
                  private $state:ng.ui.IStateService){
          let srchTxt = this.$stateParams['txt'];
          console.log(srchTxt);
          if(typeof this.$rootScope.fromHome === 'undefined' || this.$rootScope.fromHome === true){
            this.searchService.searchPublicDreams(srchTxt).$promise.then((dreams) => {
              this.dreams = dreams;
              this.totalItems = dreams.length;
              this.currentPage = 1;
              if(dreams.length === 0){
                this.Flash.create('info', "Sorry, no results found.")
              }
            }).catch((err) => {
              console.log(err);
              this.Flash.create('danger', 'Error occured. Please try again');
            });
          }else if(this.$rootScope.username !== false){
            this.searchService.searchDreams(this.$rootScope.username, srchTxt).$promise.then((dreams) => {
              this.dreams = dreams;
              this.totalItems = dreams.length;
              this.currentPage = 1;
              if(dreams.length === 0){
                this.Flash.create('info', "Sorry, no results found.")
              }
            }).catch((err) => {
              console.log(err);
              this.Flash.create('danger', 'Error occured. Please try again');
            });
          }
      }
    }
    angular.module("dreamjournal").controller("SearchTextController", SearchTextController);
}
