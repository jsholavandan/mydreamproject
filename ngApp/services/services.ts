namespace dreamjournal.Services {

  export class AccountService{
    private LoginResource;
    private SignUpResource;
    private UserResource;

    public loginUser(userInfo){
      return this.LoginResource.save(userInfo).$promise;
    }

    public registerUser(userObj){
      return this.SignUpResource.save(userObj).$promise;
    }

    public getUser(username){
      return this.UserResource.query({username:username});
    }

    public EditUser(user){
      return this.UserResource.save({id:user._id}, user).$promise;
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.LoginResource = this.$resource('/userRoutes/api/Login/Local');
      this.SignUpResource = this.$resource('/userRoutes/api/Register');
      this.UserResource = this.$resource('/userRoutes/api/:id');
    }
  }

  angular.module('dreamjournal').service("accountService", AccountService);

}
