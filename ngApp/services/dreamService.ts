namespace dreamjournal.Services {
  export class DreamService{
    private DreamResource;
    private PublicDreamsResource;

    public listDreams(username){
      return this.DreamResource.query({username:username});
    }

    public getDream(id){
      return this.DreamResource.get({id:id});
    }

    public saveDream(dreamObj){
      return this.DreamResource.save({id:dreamObj._id}, dreamObj).$promise;
    }

    public listPublicDreams(){      
      return this.PublicDreamsResource.query();
    }

    constructor(private $resource:ng.resource.IResourceService){
      this.DreamResource = this.$resource('/api/dreams/:id');
      this.PublicDreamsResource = this.$resource('/api/dreams/publicDreams');
    }
  }
  angular.module("dreamjournal").service('dreamService', DreamService);
}
