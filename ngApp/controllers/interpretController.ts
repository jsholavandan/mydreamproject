namespace dreamjournal.Controllers {
    export class InterpretController{
      public symbol;

      public interpretDream(){
        this.$state.go('optionsPage.interpret.meanings',{symbol:this.symbol});
      }

      constructor(private $state:ng.ui.IStateService){

      }

    }
    angular.module("dreamjournal").controller("InterpretController", InterpretController);
}
