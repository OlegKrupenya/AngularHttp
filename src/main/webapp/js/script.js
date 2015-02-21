var module = angular.module('formExample', ['ngResource', 'ngSanitize']).config(function ($httpProvider) {
// Remove the default AngularJS X-Request-With header
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
// Set DO NOT TRACK for all Get requests
    $httpProvider.defaults.headers.post['DNT'] = '1';
}).controller('AddUserController', ['$scope', '$http', '$q', 'Project', 'greeter',
    function ($scope, $http, $q, Project, greeter) {
        $scope.message = '';
        $scope.title = 'Click me to expand';
        $scope.contents = 'Text with links: http://angularjs.org/ & mailto:us@there.org';
        $scope.text = 'Hi there folks, I am the content that was hidden but is now shown.';
        $scope.expanders = [
            {
                title: 'Click me to expand',
                text: 'Hi there folks, I am the content that was hidden but is now shown.'
            },
            {
                title: 'Click this',
                text: 'I am even better text than you have seen previously'
            },
            {
                title: 'No, click me!',
                text: 'I am text that should be seen before seeing other texts'
            }
        ];
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
                    var updated = Project.update({projectId: 12345}, res, function () {
                        alert("After PUT :" + updated.projectDescription);
                        alert("Starting to delete " + updated.projectName);
                        var deleted = Project.delete({id: 12345}, function () {
                            alert('deleted ');
                        });
                    });
                });
            });
        };

        $scope.greeting = greeter.greet('Test');
    }]);


function Greeter(salutation) {
    this.greet = function (name) {
        return salutation + ' ' + name;
    };
}
/*
module.service('greeter', function() {
    this.greet = function (name) {
        var salutation = '';
        return salutation + ' ' + name;
    };
});*/
/*
module.factory('greeter', function() {
    return new Greeter('Hello');
});*/

module.provider('greeter', function() {
    var salutation = 'Hello';
    this.setSalutation = function(s) {
        salutation = s;
    }
    function Greeter(a) {
        this.greet = function(a) {
            return salutation + ' ' + a;
        }
    }
    this.$get = function() {
        return new Greeter();
    };
});

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

module.directive('hello', function () {
    return {
        restrict: 'E',
        template: '<div>Hi there</div>'
    };
});
/*
 module.directive('expander', function(){
 return {
 restrict: 'EA',
 replace: true,
 transclude: true,
 scope: { title:'&expanderTitle' },
 template: '<div>' +
 '<div class="title" ng-click="toggle()">{{title}}</div>' +
 '<div class="body" ng-show="showMe" ng-transclude></div>' +
 '</div>',
 link: function(scope, element, attrs) {
 scope.showMe = false;
 scope.toggle = function toggle() {
 scope.showMe = !scope.showMe;
 }
 }
 }
 });
 */
module.directive('accordion', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: function () {
            var expanders = [];
            this.gotOpened = function (selectedExpander) {
                angular.forEach(expanders, function (expander) {
                    if (selectedExpander != expander) {
                        expander.showMe = false;
                    }
                });
            }
            this.addExpander = function (expander) {
                expanders.push(expander);
            }
        }
    }
});


module.directive('expander', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: '^?accordion',
        scope: {title: '=expanderTitle'},
        template: '<div>' +
        '<div class="title" ng-click="toggle()">{{title}}</div>' +
        '<div class="body" ng-show="showMe" ng-transclude></div>' +
        '</div>',
        link: function (scope, element, attrs, accordionController) {
            scope.showMe = false;
            accordionController.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                accordionController.gotOpened(scope);
            }
        }
    }
});