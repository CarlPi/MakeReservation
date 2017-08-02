/**
 * Created by ErkaPi on 2/1/17.
 */
var myApp= angular.module('myApp', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : "home.html",
            controller : "homeCtrl"
        })
       /* .when('/about', {
            templateUrl : "about.html"
        })
        .when('/contact', {
            templateUrl : "contact.html"
        })
        .when('/signUn', {
            templateUrl : "signUn.html"
        })
        .when('/customerSignIn', {
            templateUrl : "customerSignIn.html"
        })
        .when('/managerSignIn', {
            templateUrl : "managerSignIn.html"
        })
        .when('/signIn', {
            templateUrl : "signIn.html"
        })*/
        .when('/booking', {
            templateUrl : "booking.html",
            controller : "bookingCtrl"
        })
        .when('/edit', {
            templateUrl : "edit.html",
            controller : "editCtrl"
        });
})

.controller('homeCtrl', function(){})

.controller('bookingCtrl', function($http, $scope){
    $http.post('/booking', {}).success(function() {
        console.log('Yes')
    });
    $scope.createBooking = function() {
        $http.post('/booking', $scope.reservation).success(function(data) {
            $scope.reservation = {};
            alert('You have successfully made a reservation! Please remember your confirmation code!');
            $scope.cCode= data._id;
            console.log($scope.cCode)
        })

    };
})

.controller('editCtrl', function($http, $scope){
    $scope.confirm = {};
    $scope.reservation = {};
    $scope.editBooking = function() {
        $http.post('/editBooking', $scope.confirm).success(function(data){
            console.log(data);
            // if (data.length == 0) {
            //     alert('Reservation does not exist! Please check your confirmation code!');
            // }
            // else {
                $scope.reservation.firstName = data[0].first_name;
                $scope.reservation.contactInfo = data[0].contact_info;
                $scope.reservation.date = new Date(data[0].date);
                $scope.reservation.time = new Date(data[0].time);
                $scope.reservation.partySize = Number(data[0].party_size);
            // }
        })
    };
    $scope.changeBooking = function() {
        $scope.reservation.cCode = $scope.confirm.editCCode;
        alert('Changes saved!');
        $http.post('/changeBooking', $scope.reservation).success(function(/*data*/){
            // alert('Changes saved!');
            // console.log($scope.reservation);
            // console.log(data);
        })
    };
    $scope.deleteBooking = function() {
        $scope.reservation.cCode = $scope.confirm.editCCode;
        alert('Reservation deleted!');
        $http.post('/deleteBooking', $scope.reservation) . success(function(/*data*/){
            // alert('Reservation deleted!');
            // console.log(data);
        })

    };
})


