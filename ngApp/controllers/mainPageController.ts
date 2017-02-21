namespace dreamjournal.Controllers {

  export class MainPageController{
    public selectedDiv;
    public imgClass;

    public setDiv(str){
      this.selectedDiv = str;
    }

    public addDream(){
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.addDream');
    }

    public dreamJournal(){
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.dreamJournal');
    }

    public dreamGraphs(){
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.dreamGraphs');
    }

    public dreamCalendar(){
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.dreamCalendar');
    }

    public dreamProfile(){
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.dreamProfile');
    }

    public dreamInterpretation(){
      console.log("hello");
      this.$rootScope.fromHome = false;
      this.$state.go('optionsPage.interpret');
    }

    constructor(private $state:ng.ui.IStateService,
                private $rootScope:ng.IRootScopeService){
        if(this.$rootScope.currentUser === false){
          this.$rootScope.fromHome = true;
          this.$state.go('home');
        }
    }
  }

}
