//Not using  var states. Instead getting value directly from user selection.

// var states = ["arizona", "california", "delaware", "florida", "massachusetts", "nevada", "new-jersey", "new-york", "pennsylvania", "texas", "utah", "washington"]; //an array of states. Add 

    //changed function name
function getLocation() {
    var stateSelection = $("#stateSelection").val();
    console.log($("#stateSelection"));
    console.log(document.getElementById("stateSelection"));

    //moved queryURL into function.
    var queryURL = "https://covid-19-testing.github.io/locations/" + stateSelection + "/complete.json";
    // console.log($("#stateSelection").value);

    //empties state location every time new state is selected.
    $("#appendLocations").empty()

    // Google Maps API - generates map on state selected from drop down
    var map;
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + stateSelection + "&key=AIzaSyCNTqY8YLLPTLLEL4RHISF8IHShThD3QQs",
        method: "GET"
    }).then(function(latLongData) {

        // Converts state to latitude & longitude
        var latitude = latLongData.results[0].geometry.location.lat;
        var longitude = latLongData.results[0].geometry.location.lng;
        var stateLatLng = {lat: latitude, lng: longitude };

        map = new google.maps.Map(document.getElementById("map"), {
            center: stateLatLng,
            zoom: 6
        });
    })

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (statesData) {
        console.log(statesData);
        console.log(statesData.length);
        // EXTRACT CODE INTO VARIABLES HERE

        for (var i = 0; i < statesData.length; i++) {
            console.log("Gathering data");
            //Create elements
            var div = $("<div>").attr("class", "uk-card uk-card-hover uk-animation-slide-bottom uk-card-default uk-card-body uk-width-1-1");
            var pTag = $("<p>").attr("class", "uk-card-title");
            var pTag2 = $("<p>");
            var pTag3 = $("<p>");
            var pTag4 = $("<p>");
            //Gather info
            var locName = statesData[i].alternate_name;
            var street = statesData[i].physical_address[0].address_1;
            var city = statesData[i].physical_address[0].city;
            var postalCode = statesData[i].physical_address[0].postal_code;
            var state = statesData[i].physical_address[0].state_province;
            var address = street + ", " + city + ", " + state + ", " + postalCode;
            var phone = statesData[i].phones[0].number;
            var openHour = [];
            var buildTimes = "";

            // Google Maps API - drops markers on test locations
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCNTqY8YLLPTLLEL4RHISF8IHShThD3QQs",
                method: "GET"
            }).then(function(latLongData) {
        
                // Converts address to latitude & longitude
                var latitude = latLongData.results[0].geometry.location.lat;
                var longitude = latLongData.results[0].geometry.location.lng;
                var testLocation = {lat: latitude, lng: longitude };
                console.log(latitude);
                console.log(longitude);
        
                var marker = new google.maps.Marker({
                    position: testLocation, 
                    map: map,
                    animation: google.maps.Animation.DROP});
            })

            // Build an array of objects for hours of operations
            for (var x = 0; x < statesData[i].regular_schedule.length; x++) {
                openHour.push({ times: "", day: "" });
                openHour[x].times = statesData[i].regular_schedule[x].opens_at + "-" + statesData[i].regular_schedule[x].closes_at;
                openHour[x].day = statesData[i].regular_schedule[x].weekday;
                // console.log("Retrieving schedule");
            }
            //Fill created p tag and append to  div item
            pTag.html(locName);
            pTag2.html("Address: " + address);
            pTag4.html(phone);

            // //Since the days come in integers we must switch them to days
            // console.log(openHour.length);
            for (var x = 0; x < openHour.length; x++) {
                if (openHour[x].day == 1) {
                    openHour[x].day = "Mon. | ";
                }
                else if (openHour[x].day == 2) {
                    openHour[x].day = "Tues. | "
                }
                else if (openHour[x].day == 3) {
                    openHour[x].day = "Wed. | ";
                }
                else if (openHour[x].day == 4) {
                    openHour[x].day = "Thurs. | ";
                }
                else if (openHour[x].day == 5) {
                    openHour[x].day = "Fri. | ";
                }
                else if (openHour[x].day == 6) {
                    openHour[x].day = "Sat. | ";
                }
                else if (openHour[x].day == 7) {
                    openHour[x].day = "Sun. | ";
                }
                // console.log(openHour[x].day);
            }
            // //Loops through State Data to get hour of operation times and days
            for (var x = 0; x < openHour.length; x++) {
                buildTimes += openHour[x].times + " " + openHour[x].day + "\n";
                // console.log(x + "building time");
            }
            if (buildTimes == "") {
                buildTimes = "Hours Not Available";
            }
            pTag3.html("Hours: " + buildTimes);
            // //Append Loc, Address, Phone & Hours
            div.append(pTag, pTag2, pTag4, pTag3);
            // div.append(pTag4);
            //Append list item to page
            $("#appendLocations").append(div);
            // console.log("Appended");
        }
    });
}