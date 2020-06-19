var locationAPIKey = "";
var states = ["arizona", "california", "delaware", "florida", "massachusetts", "nevada", "new-jersey", "new-york", "pennsylvania", "texas", "utah", "washington"]; //an array of states. Add 


var queryURL = `https://covid-19-testing.github.io/locations/${state}/complete.json`;

$.ajax({
    url: queryURL
    method: "GET"
})

// var settings = {
//     "url": queryURL
//     "method": "GET",
//     "timeout": 0,
//   };
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });

  //for loop for the states. Drop down menu with states.