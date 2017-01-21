namespace dreamjournal.Controllers {

  export class EditDreamController{
    public dream;
    public emoteString;
    public popup = {
      opened:false
    };
    public configObj = {
      "fade": true,
      "alwaysOn": false,
      "neverOn": false,
      "fill": true,
      "fillColor": "#ffffff",
      "fillOpacity": 0.4,
      "stroke": true,
      "strokeColor": "#4d0ec0",
      "strokeOpacity": 1,
      "strokeWidth": 1,
      "shadow": true,
      "shadowColor": "#000000",
      "shadowOpacity": 0.8,
      "shadowRadius": 10
    };
    public open(){
      this.popup.opened = true;
    }

    public addEmotion(str){
      let index = this.dream.emotions.indexOf(str);
      console.log(index);
      if(index === -1){
        this.dream.emotions.push(str);
      }else{
        this.dream.emotions.splice(index, 1);
      }
      this.emoteString = this.dream.emotions.join(' , ');
    }

    public editDream(){
      console.log("here");
      this.dreamService.saveDream(this.dream).then((editDream) => {
        this.Flash.create("success", "Dream edited successfully.");
      }).catch((err) => {
        console.log("error occured");
        this.Flash.create('danger', 'Error occured. Please try again.');
      });
    }

    public closeDialog(flash){
      if(flash.type === 'success'){
        this.$state.go("dreamJournal");
      }
    }

    constructor(private dreamService:dreamjournal.Services.DreamService,
                private $stateParams:ng.ui.IStateParamsService,
                private $state:ng.ui.IStateService,
                private Flash){
      let dreamId = this.$stateParams['id'];
      this.dreamService.getDream(dreamId).$promise.then((dream) => {
        this.dream = dream;
        this.emoteString = dream.emotions.join(' , ');
        let dateObj = new Date(dream.dreamDate);
        this.dream.dreamDate = dateObj;
      });

    }
  }
  angular.module('dreamjournal').controller("EditDreamController", EditDreamController);
}
