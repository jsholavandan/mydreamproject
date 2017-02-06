namespace dreamjournal.Controllers {
    export class AddDreamController{
      public newDream = {
        emotions:[],
        comments:[],
        username:'',
        dreamDate: new Date()
      };

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
        "strokeWidth": 4,
        "shadow": true,
        "shadowColor": "#000000",
        "shadowOpacity": 0.8,
        "shadowRadius": 10
      };

      public open(){
        this.popup.opened = true;
      }

      public addEmotion(str){
        let index = this.newDream.emotions.indexOf(str);
      //  console.log(index);
        if(index === -1){
          this.newDream.emotions.push(str);
        }else{
          this.newDream.emotions.splice(index, 1);
        }
        this.emoteString = this.newDream.emotions.join(' , ');
      }

      public addDream(){
        this.newDream.username = this.$rootScope.username;
        console.log(this.newDream);

       this.dreamService.saveDream(this.newDream).then((res) =>{
          this.Flash.create('success', 'Dream added successfully.');
        }).catch((err) => {
          this.Flash.create('danger','Error occured. Please try again.');
        });
      }

      public closeDialog(flash){
        if(flash.type === 'success'){
          this.$state.go("mainPage");
        }
      }



      constructor(private dreamService: dreamjournal.Services.DreamService,
                  private $rootScope:ng.IRootScopeService,
                  private Flash,
                  private $state:ng.ui.IStateService){
            if(this.$rootScope.currentUser === false){
              this.$state.go('home');
            }

      }
    }
    angular.module('dreamjournal').controller('AddDreamController', AddDreamController);
}
