namespace dreamjournal.Controllers {

  export class DreamJournalController{
    public dreams;
    public totalItems;
    public currentPage;
    public itemsPerPage = 10;

    public editDream(id){
      this.$state.go('optionsPage.editDream',{id:id});
    }

    public showDream(id){
  /*    if(this.$rootScope.currentUser === false){
        this.$state.go('showDream', {id:id, prev:'home'});
      }else{  */
        this.$state.go('optionsPage.showDream', {id:id, prev:'journal'});
  //    }
    }

    public closeDialog(flash){

    }

    constructor(private dreamService: dreamjournal.Services.DreamService,
                private $rootScope:ng.IRootScopeService,
                private $state:ng.ui.IStateService){

      if(this.$rootScope.currentUser === false){
        this.$state.go('home');
      }
      this.dreamService.listDreams(this.$rootScope.username).$promise.then((dreams) => {
        this.dreams = dreams;
        this.totalItems = dreams.length;
        this.currentPage = 1;
      });

    }

  }
  angular.module("dreamjournal").controller("DreamJournalController", DreamJournalController);
}
