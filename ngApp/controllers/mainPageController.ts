namespace dreamjournal.Controllers {

  export class MainPageController{
    public selectedDiv;
    public imgClass;

    public setDiv(str){
      this.selectedDiv = str;
    }

    public addDream(){
      this.$state.go('optionsPage.addDream');
    }

    public dreamJournal(){
      this.$state.go('optionsPage.dreamJournal');
    }

    public dreamGraphs(){
      this.$state.go('optionsPage.dreamGraphs');
    }

    public dreamCalendar(){
      this.$state.go('optionsPage.dreamCalendar');
    }

    public dreamProfile(){
      this.$state.go('optionsPage.dreamProfile');
    }

    public dreamInterpretation(){
      console.log("hello");
      this.$state.go('optionsPage.interpret');
    }

    constructor(private $state:ng.ui.IStateService,
                private $rootScope:ng.IRootScopeService){
        if(this.$rootScope.currentUser === false){
          this.$state.go('home');
        }
    }
  }

}
