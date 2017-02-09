namespace dreamjournal.Controllers {
    export class TokenController{

      public setToken(token){
          this.$window.localStorage.setItem("token", JSON.stringify(token));
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

      private urlBase64Decode(str: string) {
         var output = str.replace(/-/g, '+').replace(/_/g, '/');
          switch (output.length % 4) {
              case 0: { break; }
              case 2: { output += '=='; break; }
              case 3: { output += '='; break; }
              default: {
                  throw 'Illegal base64url string!';
              }
          }
          return decodeURIComponent(this.$window.atob(output));
      }

      public decodeToken(token: string) {
            var parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('JWT must have 3 parts');
            }
            var decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }
            return JSON.parse(decoded);
        }

      constructor(private $rootScope: ng.IRootScopeService,
                  private $state:ng.ui.IStateService,
                  private $stateParams:ng.ui.IStateParamsService,
                  private $window:ng.IWindowService){
          let token = this.$stateParams['token'];
          console.log(token);
          this.setToken(token);
          let decodedStr = this.decodeToken(token);
          let username  = decodedStr.email;
          console.log(username);
          this.$rootScope.currentUser = this.isLoggedIn();
          this.$rootScope.username = username;
          this.$rootScope.$broadcast("userLoggedIn");
          this.$state.go('mainPage');
      }
    }
    angular.module("dreamjournal").controller("TokenController", TokenController);
}
