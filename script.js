//Locations API
var locationAPIKey = "";
var states = ["arizona", "california", "delaware", "florida", "massachusetts", "nevada", "new-jersey", "new-york", "pennsylvania", "texas", "utah", "washington"]; //an array of states. Add 
var queryURL = "https://covid-19-testing.github.io/locations/"+ states[1] +"/complete.json";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(statesData){
    console.log(statesData);
    console.log(statesData.length);
    /**
     *EXTRACT CODE INTO VARIABLES HERE
                                        */
    for(var i=0; i < statesData.length; i++){
        console.log("Gathering data");
        //Create elements
        var div = $("<div>");
        var pTag = $("<p>");
        var pTag2 = $("<p>");
        var pTag3 = $("<p>");
        var pTag4 = $("<p>").html("----------------------------");
        //Gather info
        var locName = statesData[i].alternate_name;
        var street = statesData[i].physical_address[0].address_1;
        var city = statesData[i].physical_address[0].city;
        var postalCode = statesData[i].physical_address[0].postal_code;
        var state = statesData[i].physical_address[0].state_province;
        var address = street + ", " + city + ", " + state + ", " + postalCode;
        var openHour = [] ;
        var buildTimes = "";
        // Build an array of objects for hours of operations
        for(var x=0; x < statesData[i].regular_schedule.length; x++){
            openHour.push({times: "", day: ""});
            openHour[x].times = statesData[i].regular_schedule[x].opens_at + "-" + statesData[i].regular_schedule[x].closes_at;
            openHour[x].day = statesData[i].regular_schedule[x].weekday;
            console.log("Retrieving schedule");
        }
        //Fill created p tag and append to  div item
        pTag.html("Location: "+ locName);
        div.append(pTag);
        pTag2.html("Address: "+ address);
        div.append(pTag2);
        // //Since the days come in integers we must switch them to days
        console.log(openHour.length);
        for(var x=0; x < openHour.length; x++){
            if(openHour[x].day == 1){
                openHour[x].day = "Mon. | ";
            }
            else if(openHour[x].day == 2){
                openHour[x].day = "Tues. | "
            }
            else if(openHour[x].day == 3){
                openHour[x].day = "Wed. | ";
            }
            else if(openHour[x].day == 4){
                openHour[x].day = "Thurs. | ";
            }
            else if(openHour[x].day == 5){
                openHour[x].day = "Fri. | ";
            }
            else if(openHour[x].day == 6){
                openHour[x].day = "Sat. | ";
            }
            else if(openHour[x].day == 7){
                openHour[x].day = "Sun. | ";
            }
            console.log(openHour[x].day);
        }
        // //Loops through State Data to get hour of operation times and days
        for(var x=0; x < openHour.length; x++){
            buildTimes += openHour[x].times + " " + openHour[x].day +"\n"; 
            console.log(x + "building time");
        }
        if(buildTimes == ""){
            buildTimes = "Hours Not Available";
        }
        pTag3.html("Hours: " + buildTimes);
        // //Append Hours
        div.append(pTag3);
        div.append(pTag4);
        //Append list item to page
        $("#appendLocations").append(div);
        console.log("Appended");
    }
    
});