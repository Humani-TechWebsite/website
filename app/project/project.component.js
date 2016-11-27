angular.module('project').component('project', {
    templateUrl: 'project/project.template.html',

    controller: ['$route', '$routeParams' ,'$firebaseObject', '$firebaseArray', function projectController($route, $routeParams, $firebaseObject, $firebaseArray) {
        var self = this;
        self.project = $routeParams.name;
        self.formattedProjectName =self.project.replace(" ", "%20");
        self.projectRef = firebase.database().ref().child("project-data/"+self.project);
        self.commentsEnabledRef = firebase.database().ref().child("comments-enabled");
        self.commentsEnabled = $firebaseObject(self.commentsEnabledRef);
        self.descriptionRef = (self.projectRef.child("description"));
        self.description = $firebaseObject(self.descriptionRef);
        self.imageRef = (self.projectRef.child("image-url"));
        self.image = $firebaseObject(self.imageRef);
        self.likesRef = (self.projectRef.child("likes"));
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

        self.commentsRef = (self.projectRef.child("comments"));

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