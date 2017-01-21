namespace dreamjournal.Services {

  export class AccountService{
    private LoginResource;
    private SignUpResource;

    public loginUser(userInfo){      
      return this.LoginResource.save(userInfo).$promise;
    }

    public registerUser(userObj){
      return this.SignUpResource.save(userObj).$promise;
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
    }
  }

  angular.module('dreamjournal').service("accountService", AccountService);

}
