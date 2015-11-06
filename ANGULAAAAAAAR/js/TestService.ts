


module Services {
    export class TestService {

        time: Date = null;

        setTime(newTime: Date) {
            this.time = newTime;
            this.notifyTimeChanged();
        }


        timeChangedObservers = [];

        onTimeChanged(newObserverCallback) {
            this.timeChangedObservers.push(newObserverCallback);
        };

        notifyTimeChanged() {
            angular.forEach(this.timeChangedObservers, function (callback) {
                callback();
            });
        };
    }
    angular.module('lm').service('testService', TestService);
}

module Controllers {

    class TestController {
        constructor(private svc: Services.TestService, $http: ng.IHttpService) {
            var self = this;
            setInterval(function () {
                self.svc.setTime(new Date());
            }, 100);


        }
        date: Date = null;

    }

    TestController.$inject = ['testService', '$http'];
    angular.module('lm').controller('testController', TestController);



    class Test2 {
        constructor(private $scope: ng.IScope, private svc: Services.TestService) {
            var self = this;


            svc.onTimeChanged(function () {
                self.date = self.svc.time;
                self.$scope.$apply();
            });
        }
        date: Date = null;
    }

    Test2.$inject = ['$scope', 'testService'];
    angular.module('lm').controller('test2Controller', Test2);
}

