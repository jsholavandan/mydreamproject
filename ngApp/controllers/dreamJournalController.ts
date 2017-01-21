namespace dreamjournal.Controllers {

  export class DreamJournalController{
    public dreams;
    public totalItems;
    public currentPage;
    public itemsPerPage = 10;

    public editDream(id){
      this.$state.go('editDream',{id:id});
    }

    public showDream(id){
      this.$state.go('showDream', {id:id});
    }

    constructor(private dreamService: dreamjournal.Services.DreamService,
                private $rootScope:ng.IRootScopeService,
                private $state:ng.ui.IStateService){
      this.dreamService.listDreams(this.$rootScope.username).$promise.then((dreams) => {
        this.dreams = dreams;
        this.totalItems = dreams.length;
        this.currentPage = 1;
      });

    }

  }
  angular.module("dreamjournal").controller("DreamJournalController", DreamJournalController);
}
