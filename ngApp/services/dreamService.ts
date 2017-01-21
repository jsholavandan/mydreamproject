namespace dreamjournal.Services {
  export class DreamService{
    private DreamResource;

    public listDreams(username){
      return this.DreamResource.query({username:username});
    }

    public getDream(id){
      return this.DreamResource.get({id:id});
    }

    public saveDream(dreamObj){
      return this.DreamResource.save({id:dreamObj._id}, dreamObj).$promise;
    }    

    constructor(private $resource:ng.resource.IResourceService){
      this.DreamResource = this.$resource('/api/dreams/:id');
    }
  }
  angular.module("dreamjournal").service('dreamService', DreamService);
}
