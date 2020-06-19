var address1 = "1600 Amphitheatre Pkwy, Mountain View, CA 94043";

var map;

function initialize() {
        
    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address1 + "&key=AIzaSyCNTqY8YLLPTLLEL4RHISF8IHShThD3QQs",
        method: "GET"
    }).then(function(latLongData) {

        // Converts address to latitude & longitude
        var latitude = latLongData.results[0].geometry.location.lat;
        var longitude = latLongData.results[0].geometry.location.lng;

        console.log(latitude);
        console.log(longitude);



        function initMap() {
            var cali = {lat: latitude, lng: longitude };
        
            // Loads map to United States upon first load
            map = new google.maps.Map(document.getElementById("map"), {
                center: cali,
                zoom: 6
            });
        
            // Pins a marker on Kansas based on lat/lng in line 7
            var marker = new google.maps.Marker({position: cali, map: map});
        
            // Example loop from API documentation
            // Loop through the results array and place a marker for each set of coordinates.
            // window.eqfeed_callback = function(results) {
            // for (var i = 0; i < results.features.length; i++) {
            //     var coords = results.features[i].geometry.coordinates;
            //     var latLng = new google.maps.LatLng(coords[1],coords[0]);
            //     var marker = new google.maps.Marker({
            //         position: latLng,
            //         map: map
            //     });
            // }
            // }
        }
        initMap();
    })
}