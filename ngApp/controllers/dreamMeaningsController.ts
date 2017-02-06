namespace dreamjournal.Controllers {
    export class DreamMeaningsController{
      public dreamMeaning;

      constructor(private $state:ng.ui.IStateService,
                  private interpretService:dreamjournal.Services.InterpretService,
                  private $stateParams:ng.ui.IStateParamsService,
                  private Flash){
          let symbol = this.$stateParams['symbol'];
          console.log(symbol);
          this.interpretService.getMeaning(symbol).$promise.then((meaning) => {
            this.dreamMeaning = meaning;
          }).catch((err) => {
            this.Flash.create('danger', 'Sorry, no results found.');
          });
      }
    }
    angular.module('dreamjournal').controller("DreamMeaningsController", DreamMeaningsController);
}
