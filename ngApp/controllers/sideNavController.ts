namespace dreamjournal.Controllers {
    export class SideNavController{

      public myAccount(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.mainPage");
      }

      public addDream(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.addDream");
      }

      public dreamCalendar(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.dreamCalendar");
      }

      public dreamJournal(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.dreamJournal");
      }

      public dreamGraphs(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.dreamGraphs");
      }

      public dreamMeaning(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.interpret");
      }

      public settings(){
        this.$rootScope.fromHome = false;
        this.$state.go("optionsPage.dreamProfile");
      }

      constructor(private $state:ng.ui.IStateService,
                  private $rootScope:ng.IRootScopeService){

      }
    }
    angular.module("dreamjournal").controller("SideNavController", SideNavController);
}
