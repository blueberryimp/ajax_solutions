"use strict";


// PART 1: SHOW A FORTUNE

function replaceFortune(results) { //one parameter 'results'
    $("#fortune-text").html(results);
}   //get ID #fortune-text from index.html and insert it to the variable results

function showFortune(evt) { //event function to show fortune
    $.get('/fortune', replaceFortune);
}   //go to the app route /fortune from server.py to get the fortune
    //call the replaceFortune function 

$('#get-fortune-button').on('click', showFortune);
//get the ID #get-fortune-button from index.html 
//call the showFortune function on click


// PART 2: SHOW WEATHER

function replaceForecast(results) { //one parameter 'results'
    $("#weather-info").html(results.forecast);
} //get ID #weather-info from index.html and insert into results.forecast

function showWeather(evt) {
    evt.preventDefault();
    //pass the data via AJAX and don't perform the default action 
    //that would have occured
    var url = "/weather.json?zipcode=" + $("#zipcode-field").val();
    //go to the app route /weather.json?zipcode= from server.py to get the zip
    //code which is the 'forecast' and go to ID #zipcode-field from index to get 
    //zipcode value 
    $.get(url, replaceForecast);
}   //use the .get method to get the url and call the replaceForecast function

$("#weather-form").on('submit', showWeather);
//get ID weather-form from index and call the showWeather function on submit



// PART 3: ORDER MELONS

function updateMelons(results) {
    if (results.code == "OK") { //if results.code from /order-melons
        //.json app route is equal to 'OK'
        $('#order-status').html("<p>" + results.msg + "</p>");
    }   //go to ID order-status and insert that msg
    else {
        $('#order-status').addClass("order-error");
        //else go to ID order-status from index and add the class order-error
        $('#order-status').html("<p><b>" + results.msg + "</b></p>");
    }   //go to ID order-status in index and insert into results.msg
}

function orderMelons(evt) {
    evt.preventDefault();
    //pass the data via AJAX and don't perform the default action 
    //that would have occured

    var formInputs = {
        "melon_type": $("#melon-type-field").val(),
        "qty": $("#qty-field").val()
    }; //our melon_type variable is the value of the ID of melon-type-field
    $.post("/order-melons.json", formInputs, updateMelons);
}   //use post method to app route /order-melons.json and add the formInputs variable
    //call the updateMelons function 

$("#order-form").on('submit', orderMelons);
//go to order-form ID on index and call orderMelons on submit

