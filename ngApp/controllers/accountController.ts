namespace dreamjournal.Controllers {

    export class AccountController{
        public userInfo = {};
        public user;

        public setToken(data){
            this.$window.localStorage.setItem("token", JSON.stringify(data.token));
        }

        public getToken(){
            return this.$window.localStorage.getItem('token');
        }

        public isLoggedIn(){
          let token = this.getToken();
          if(token){
            let payLoad = JSON.parse(this.$window.atob(token.split('.')[1]));
            return payLoad;
          }else{
            return false;
          }
        }

        public login(){
          this.accountService.loginUser(this.userInfo).then((data) => {
            this.setToken(data);
            this.$rootScope.currentUser = this.isLoggedIn();
            this.$rootScope.username = this.userInfo.username;
            this.$rootScope.$broadcast("userLoggedIn");
            this.$state.go('mainPage');
          }).catch((err) => {
            this.Flash.create("danger","Error occured. Please try again.");
          });
        }

        public signUp(){
          this.accountService.registerUser(this.user).then((data) => {
            this.Flash.create("success", "Registered. Please login.");
          }).catch((err) => {
            this.Flash.create('danger', "Error occured. Please try again");
          });
        }

        public closeDialog(){
          this.$state.go('login');
        }

      constructor(private accountService: dreamjournal.Services.AccountService,
                  private $state:ng.ui.IStateService,
                  private Flash,
                  private $window:ng.IWindowService,
                  private $rootScope:ng.IRootScopeService){

      }
    }
}
