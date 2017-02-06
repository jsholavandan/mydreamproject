namespace dreamjournal.Controllers {
    export class DreamMeaningsController{
      public dreamMeaning;
      public loading:boolean;

      constructor(private $state:ng.ui.IStateService,
                  private interpretService:dreamjournal.Services.InterpretService,
                  private $stateParams:ng.ui.IStateParamsService,
                  private Flash){
          this.loading = false;
          let symbol = this.$stateParams['symbol'];
          console.log(symbol);
          this.interpretService.getMeaning(symbol).$promise.then((meaning) => {
            this.dreamMeaning = meaning;
            //console.log(meaning);
          }).catch((err) => {
            this.Flash.create('danger', 'Sorry, no results found.');
          }).finally(() =>{
            this.loading = true;
          });
      }
    }
    angular.module('dreamjournal').controller("DreamMeaningsController", DreamMeaningsController);
}
