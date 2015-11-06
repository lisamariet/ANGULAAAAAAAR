var Services;
(function (Services) {
    var TestService = (function () {
        function TestService() {
            this.time = null;
            this.timeChangedObservers = [];
        }
        TestService.prototype.setTime = function (newTime) {
            this.time = newTime;
            this.notifyTimeChanged();
        };
        TestService.prototype.onTimeChanged = function (newObserverCallback) {
            this.timeChangedObservers.push(newObserverCallback);
        };
        ;
        TestService.prototype.notifyTimeChanged = function () {
            angular.forEach(this.timeChangedObservers, function (callback) {
                callback();
            });
        };
        ;
        return TestService;
    })();
    Services.TestService = TestService;
    angular.module('lm').service('testService', TestService);
})(Services || (Services = {}));
var Controllers;
(function (Controllers) {
    var TestController = (function () {
        function TestController(svc, $http) {
            this.svc = svc;
            this.date = null;
            var self = this;
            setInterval(function () {
                self.svc.setTime(new Date());
            }, 100);
        }
        return TestController;
    })();
    TestController.$inject = ['testService', '$http'];
    angular.module('lm').controller('testController', TestController);
    var Test2 = (function () {
        function Test2($scope, svc) {
            this.$scope = $scope;
            this.svc = svc;
            this.date = null;
            var self = this;
            svc.onTimeChanged(function () {
                self.date = self.svc.time;
                self.$scope.$apply();
            });
        }
        return Test2;
    })();
    Test2.$inject = ['$scope', 'testService'];
    angular.module('lm').controller('test2Controller', Test2);
})(Controllers || (Controllers = {}));
