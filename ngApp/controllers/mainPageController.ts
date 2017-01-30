namespace dreamjournal.Controllers {

  export class MainPageController{
    public selectedDiv;
    public imgClass;

    public setDiv(str){
      this.selectedDiv = str;
    }

    public addDream(){
      this.$state.go('addDream');
    }

    public dreamJournal(){
      this.$state.go('dreamJournal');
    }

    public dreamGraphs(){
      this.$state.go('dreamGraphs');
    }

    public dreamCalendar(){
      this.$state.go('dreamCalendar');
    }

    public dreamProfile(){
      this.$state.go('dreamProfile');
    }

    constructor(private $state:ng.ui.IStateService,
                private $rootScope:ng.IRootScopeService){
        if(this.$rootScope.currentUser === false){
          this.$state.go('home');
        }
    }
  }

}
