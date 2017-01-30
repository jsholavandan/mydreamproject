namespace dreamjournal.Controllers {
    export class DreamCalendarController{
      public dreams;
      public options = {
        customClass: this.getDayClass.bind(this)
      }
      public dt = null;

      public getDayClass (data){
        let mode = data.mode;
        let date = data.date;
         if(mode === 'day'){
           if(this.dreams !== undefined){
             let dayToCheck = this.moment(date).format('LL');
             for(let i=0;i<this.dreams.length;i++){
               var newDate = this.moment(this.dreams[i].dreamDate).format('LL');
               if(dayToCheck === newDate ){
                 return 'range';
               }
             }
           }
         }
         return '';
      }

      public showTheDream(){
        if(this.dreams !== undefined){
          let id = 0;
          let dateToCheck = this.moment(this.dt).format('LL');
          for(let i=0;i<this.dreams.length;i++){
            let date = this.moment(this.dreams[i].dreamDate).format('LL');
            if(date === dateToCheck){
              id = this.dreams[i]._id;
              console.log(id);
              break;
            }
          }
          if(id !== 0){
            this.$state.go('showDream',{id:id});
          }
        }
      }


      constructor(private searchService: dreamjournal.Services.SearchService,
                  private $rootScope:ng.IRootScopeService,
                  private moment,
                  private $scope:ng.IScope,
                  private $state:ng.ui.IStateService){
        if(this.$rootScope.currentUser === false){
          this.$state.go('home');
        }
        this.searchService.listUserDreams(this.$rootScope.username).$promise.then((dreams)=>{
          this.dreams = dreams;
          this.dt = this.moment().add(1,'days');
          this.$scope.$watch(() => {return this.dt}, (newVal, oldVal) => {
            this.showTheDream();
          });
        }).catch((err) => {

        });
      }
    }
    angular.module('dreamjournal').controller("DreamCalendarController", DreamCalendarController);
}
