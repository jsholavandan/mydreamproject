namespace dreamjournal.Controllers {

    export class ShowDreamController{
      public dream;
      public emoteString;
      public typeString;
      private previousUrl;
      public comment ={
        commentTitle:'',
        text:''
      };

      public addComment(){
        if(this.$rootScope.currentUser === false){
          this.Flash.create('danger', "Please login to post comments.");
          return false;
        }
        if(this.comment.commentTitle === '' || this.comment.text === ''){
          this.Flash.create('danger', "Fill in all the fields before submitting.");
          return false;
        }
        this.comment.username = this.$rootScope.username;
        this.dream.comments.push(this.comment);
        this.dreamService.saveDream(this.dream).then((res)=>{
          this.Flash.create('success', "Comment added successfully.");
        }).catch((err) => {
          this.Flash.create('danger', "Error occured. Please try again.");
        });
      }

      public close(){
        console.log(this.previousUrl);
        if(this.previousUrl === 'calendar'){
          this.$state.go("optionsPage.dreamCalendar");
        }else if(this.previousUrl === 'journal'){
          this.$state.go("optionsPage.dreamJournal");
        }else{
          this.$state.go('home');
        }
      }

      constructor(private dreamService: dreamjournal.Services.DreamService,
                  private $stateParams: ng.ui.IStateParamsService,
                  private $state: ng.ui.IStateService,
                  private Flash,
                  private $rootScope: ng.IRootScopeService,
                  private $location:ng.ILocationService){
            let dreamId = this.$stateParams['id'];
            this.previousUrl = this.$stateParams['prev'];
            this.dreamService.getDream(dreamId).$promise.then((dream) => {
              this.dream = dream;
              this.emoteString = dream.emotions.join(' , ');
              this.typeString = (dream.nightmare? 'Nightmare , ' : '') + (dream.lucid ? 'Lucid , ' : '') + (dream.recurring ? 'Recurring , ' : '');
            }).catch((err) => {
              console.log(err);
            });

      }
    }
    angular.module('dreamjournal').controller('ShowDreamController', ShowDreamController);
}
