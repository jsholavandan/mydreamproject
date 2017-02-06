namespace dreamjournal.Services {

  export class InterpretService{
    private InterpretResource;

    public getMeaning(symbol){
      return this.InterpretResource.get({symbol:symbol});
    }

    constructor(private $resource:ng.resource.IResourceService){
        this.InterpretResource = this.$resource('/api/services/Interpret')
    }

  }

  angular.module("dreamjournal").service("interpretService", InterpretService);

}
