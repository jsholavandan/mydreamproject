namespace dreamjournal.Services {
    export  class SearchService{
      private TextSearchResource;
      private SearchDreamsResource;
      private PublicSearchResource;

      public searchPublicDreams(searchTxt){
        return this.PublicSearchResource.query({searchTxt:searchTxt});
      }

      public searchDreams(username, searchTxt){
        return this.TextSearchResource.query({username:username, searchTxt:searchTxt});
      }

      public listUserDreams(username){
        return this.SearchDreamsResource.query({username:username});
      }

      constructor(private $resource:ng.resource.IResourceService){
        this.TextSearchResource = this.$resource('/api/searchText');
        this.PublicSearchResource = this.$resource('/api/searchText/searchPublic');
        this.SearchDreamsResource = this.$resource('/api/searchText/userDreams');
      }
    }

    angular.module('dreamjournal').service("searchService", SearchService);
}
