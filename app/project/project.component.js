angular.module('project').component('project', {
    templateUrl: 'project/project.template.html',

    controller: ['$routeParams' ,'$firebaseObject', '$firebaseArray', function projectController($routeParams, $firebaseObject, $firebaseArray) {
        var self = this;
        self.project = $routeParams.name;
        self.projectRef = firebase.database().ref().child("project-data/"+self.project);
    }]
});