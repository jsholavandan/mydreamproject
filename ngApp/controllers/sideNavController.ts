namespace dreamjournal.Controllers {
    export class SideNavController{

      public myAccount(){
        this.$state.go("optionsPage.mainPage");
      }

      public addDream(){
        this.$state.go("optionsPage.addDream");
      }

      public dreamCalendar(){
        this.$state.go("optionsPage.dreamCalendar");
      }

      public dreamJournal(){
        this.$state.go("optionsPage.dreamJournal");
      }

      public dreamGraphs(){
        this.$state.go("optionsPage.dreamGraphs");
      }

      public dreamMeaning(){
        this.$state.go("optionsPage.dreamMeanings");
      }

      public settings(){
        this.$state.go("optionsPage.dreamProfile");
      }

      constructor(private $state:ng.ui.IStateService){

      }
    }
    angular.module("dreamjournal").controller("SideNavController", SideNavController);
}
