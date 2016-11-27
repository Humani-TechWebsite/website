angular.module('join').component('join', {
    templateUrl: 'join/join.template.html',

    controller: ['$firebaseObject', function joinController($firebaseObject) {
        var self = this;
        self.email = "";
        self.showError = false;
        self.joinRequestsRef = firebase.database().ref().child("join-requests");
        self.gatechRegExp = new RegExp("(.+)@gatech.edu");
        // console.log(self.gatechRegExp.test("dbanerji3@gatech.edu"));
        self.joinRequest = function () {
            if (self.gatechRegExp.test(self.email)) {
                var time = Date.now();
                var requestRef = self.joinRequestsRef.child(time);
                var requestObj = $firebaseObject(requestRef);
                requestObj.$value = self.email;
                requestObj.$save();
                self.email = "";
                self.showError = false;
            } else {
                self.showError = true;
            }
        }
    }]
});