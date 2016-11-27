angular.module('events').component('events', {
    templateUrl: 'events/events.template.html',

    controller: ['$firebaseObject', '$firebaseArray', function eventsController($firebaseObject, $firebaseArray) {
        var self = this;
        self.eventListRef = firebase.database().ref().child("event-list");
        self.eventList = $firebaseArray(self.eventListRef);
    }]
});