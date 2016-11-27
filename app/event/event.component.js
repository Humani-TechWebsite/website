angular.module('event').component('event', {
    templateUrl: 'event/event.template.html',

    controller: ['$route', '$routeParams' ,'$firebaseObject', '$firebaseArray', function eventController($route, $routeParams, $firebaseObject, $firebaseArray) {
        var self = this;
        self.event = $routeParams.name;
        self.formattedEventName =self.event.replace(" ", "%20");
        self.eventRef = firebase.database().ref().child("event-data/Binary Ball");
        self.commentsEnabledRef = firebase.database().ref().child("comments-enabled");
        self.commentsEnabled = $firebaseObject(self.commentsEnabledRef);
        console.log(self.eventRef);
        self.descriptionRef = (self.eventRef.child("description"));
        self.description = $firebaseObject(self.descriptionRef);
        self.imageRef = (self.eventRef.child("image-url"));
        self.image = $firebaseObject(self.imageRef);
        self.likesRef = (self.eventRef.child("likes"));
        self.likes = $firebaseObject(self.likesRef);
        self.likes.$loaded()
            .then(function(data) {
                if (data.$value == null) {
                    self.likes.$value = 0;
                    self.likes.$save();
                }
            })
            .catch(function(error) {
                console.error("Error:", error);
            });

        self.pushLike = function () {
            self.likes.$value = self.likes.$value + 1;
            self.likes.$save();
        };

        self.comment = "";
        self.commenter = "";

        self.commentsRef = (self.eventRef.child("comments"));

        self.pushComment = function () {
            var key = Date.now();
            if (self.comment && self.comment != "" && self.commenter && self.commenter != "") {
                var commentObj = $firebaseObject(self.commentsRef.child(key));
                commentObj.comment = self.comment;
                commentObj.commenter = self.commenter;
                commentObj.$save();
                self.comment = "";
                self.commenter = "";
            }
        };

        self.comments = $firebaseArray(self.commentsRef);
    }]
});