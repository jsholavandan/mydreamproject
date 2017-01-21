namespace dreamjournal.Controllers {

    export class ShowDreamController{
      public dream;
      public emoteString;
      public typeString;

      constructor(private dreamService: dreamjournal.Services.DreamService,
                  private $stateParams: ng.ui.IStateParamsService,
                  private $state: ng.ui.IStateService){
            let dreamId = this.$stateParams['id'];
            this.dreamService.getDream(dreamId).$promise.then((dream) => {
              this.dream = dream;
              this.emoteString = dream.emotions.join(' , ');
              this.typeString = (dream.nightmare? 'Nightmare , ' : '') + (dream.lucid ? 'Lucid , ' : '') + (dream.recurring ? 'Recurring , ' : '');
            });

      }
    }
    angular.module('dreamjournal').controller('ShowDreamController', ShowDreamController);
}
