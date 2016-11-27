angular.module('contact').component('contact', {
    templateUrl: 'contact/contact.template.html',

    controller: ['$firebaseObject', function contactController($firebaseObject) {
        var self = this;
        self.email = "";
        self.phone = "";
        self.name = "";
        self.organizationName = "";
        self.requestText = "";
        self.showError = false;
        self.humaniTechEmailRef = firebase.database().ref().child("humani-tech-email");
        self.humaniTechEmailObj = $firebaseObject(self.humaniTechEmailRef);
        self.contactRequestsRef = firebase.database().ref().child("contact-requests");
        self.gatechRegExp = new RegExp("(.+)@gatech.edu");
        // console.log(self.gatechRegExp.test("dbanerji3@gatech.edu"));
        self.contactRequest = function () {
            if (self.email.length > 0 && self.requestText.length > 0) {
                var time = Date.now();
                var requestRef = self.contactRequestsRef.child(time);
                var requestObj = $firebaseObject(requestRef);
                requestObj.email = self.email;
                requestObj.phone = self.phone;
                requestObj.name = self.name;
                requestObj.organizationName = self.organizationName;
                requestObj.request = self.requestText;
                requestObj.$save();
                self.email = "";
                self.phone = "";
                self.name = "";
                self.organizationName = "";
                self.requestText = "";
                self.showError = false;
            } else {
                self.showError = true;
            }
        }    }]
});