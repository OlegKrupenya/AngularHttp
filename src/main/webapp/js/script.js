var module = angular.module('formExample', ['ngResource']).config(function ($httpProvider) {
// Remove the default AngularJS X-Request-With header
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
// Set DO NOT TRACK for all Get requests
    $httpProvider.defaults.headers.post['DNT'] = '1';
}).controller('AddUserController', ['$scope', '$http', '$q', 'Project',
    function ($scope, $http, $q, Project) {
        $scope.message = '';
        $scope.addUser = function () {
            // TODO for the reader: actually save user to database...
            $scope.message = 'Thanks, ' + $scope.user.first + ', we added you!';
        };
        $scope.doGet = function () {
            $http.get('rest/hello/get', {
                cache: true,
                params: {id: '5'}
            }).success(function (data, status, headers, config) {
                alert(data);
            }).error(function (data, status, headers, config) {
                alert(status);
            });
        };
        $scope.doPost = function () {
            var postData = {text: 'long blob of text'};
            var config = {params: {id: '7'}};
            $http.post('rest/hello/post', postData, config
            ).success(function (data, status, headers, config) {
                    alert(data);
                }).error(function (data, status, headers, config) {
                    alert(status);
                });
        };
        $scope.useQ = function () {
            var deferred = $q.defer();
            var postData = {text: 'long blob of text'};
            var config = {params: {id: '7'}};
            $http.post('rest/hello/post', postData, config
            ).success(function (data, status, headers, config) {
                    deferred.resolve('handling: ' + data);
                }).error(function (data, status, headers, config) {
                    alert(status);
                });
            var test = function (data) {
                alert(data);
            };
            deferred.promise.then(test);
        };

        $scope.getProjectById = function () {
            var project = Project.get({projectId: 12345}, function () {
                alert('Starting of update');
                project.projectName = "Updated";
                var res = Project.save(project, function () {
                    alert("Starting to update " + res.projectName);
                    res.projectDescription = "New";
                    var updated = Project.update({projectId:12345}, res, function () {
                        alert("After PUT :" + updated.projectDescription);
                        alert("Starting to delete " + updated.projectName);
                        var deleted = Project.delete({id:12345}, function() {
                            alert('deleted ');
                        });
                    });
                });
            });
        };
    }]);

module.factory('Project', ['$resource', function ($resource) {
    return $resource('rest/hello/project/:id', {id: '@projectId'}, {
        update: {
            method: 'PUT'
        }
    });
}]);

module.directive('ngbkFocus', function () {
    return {
        link: function (scope, element, attrs, controller) {
            element[0].focus();
        }
    };
}); 