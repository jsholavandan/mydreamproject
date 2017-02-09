namespace dreamjournal.Controllers {
  export class DreamProfileController{
    public user;

    public updateProfile(){
      this.accountService.EditUser(this.user).then((user) => {
        this.Flash.create('success', "Changes saved successfully.");
      }).catch((err) => {
        this.Flash.create('danger', 'Error occured. Please try again later.');
      });
    }

    public closeDialog(flash){
      if(flash.type === 'success'){
        this.$state.go("mainPage");
      }
    }

    constructor(private $rootScope: ng.IRootScopeService,
                private accountService: dreamjournal.Services.AccountService,
                private Flash,
                private $state:ng.ui.IStateService){
        if(this.$rootScope.currentUser === false){
          this.$state.go('home');
        }
        this.accountService.getUser(this.$rootScope.username).$promise.then((users) => {          
          for(let i=0;i<users.length;i++){
            this.user = users[i];
          }
        });

    }
  }
  angular.module('dreamjournal').controller('DreamProfileController', DreamProfileController);
}
