var dreamjournal;
(function (dreamjournal) {
    var Services;
    (function (Services) {
        var SearchService = (function () {
            function SearchService($resource) {
                this.$resource = $resource;
                this.TextSearchResource = this.$resource('/api/searchText');
                this.PublicSearchResource = this.$resource('/api/searchText/searchPublic');
                this.SearchDreamsResource = this.$resource('/api/searchText/userDreams');
            }
            SearchService.prototype.searchPublicDreams = function (searchTxt) {
                return this.PublicSearchResource.query({ searchTxt: searchTxt });
            };
            SearchService.prototype.searchDreams = function (username, searchTxt) {
                return this.TextSearchResource.query({ username: username, searchTxt: searchTxt });
            };
            SearchService.prototype.listUserDreams = function (username) {
                return this.SearchDreamsResource.query({ username: username });
            };
            return SearchService;
        }());
        Services.SearchService = SearchService;
        angular.module('dreamjournal').service("searchService", SearchService);
    })(Services = dreamjournal.Services || (dreamjournal.Services = {}));
})(dreamjournal || (dreamjournal = {}));
