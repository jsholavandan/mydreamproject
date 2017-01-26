namespace dreamjournal.Services {
    export  class SearchService{
      private TextSearchResource;
      private SearchDreamsResource;

      public searchDreams(username, searchTxt){
        return this.TextSearchResource.query({username:username, searchTxt:searchTxt});
      }

      public listUserDreams(username){
        return this.SearchDreamsResource.query({username:username});
      }

      constructor(private $resource:ng.resource.IResourceService){
        this.TextSearchResource = this.$resource('/api/searchText');
        this.SearchDreamsResource = this.$resource('/api/searchText/userDreams');
      }
    }

    angular.module('dreamjournal').service("searchService", SearchService);
}
