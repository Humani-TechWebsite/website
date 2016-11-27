angular.module('projects').component('projects', {
    templateUrl: 'projects/projects.template.html',

    controller: ['$firebaseObject', '$firebaseArray', function projectsController($firebaseObject, $firebaseArray) {
        var self = this;
        self.projectListRef = firebase.database().ref().child("project-list");
        self.projectList = $firebaseArray(self.projectListRef);
        // console.log(self.projectList)
    }]
});