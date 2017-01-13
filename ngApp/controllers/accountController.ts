namespace dreamjournal.Controllers {

    export class AccountController{
        public userInfo;
        public user;

        public login(){
          this.accountService.loginUser(this.userInfo).then((data) => {
            this.$state.go('mainPage');
          }).catch((err) => {

          });
        }

        public signUp(){
          this.accountService.registerUser(this.user).then((data) => {

          });
        }

      constructor(private accountService: dreamjournal.Services.AccountService,
                  private $state:ng.ui.IStateService){

      }
    }
}
