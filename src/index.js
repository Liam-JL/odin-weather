//---Entities----
async function weatherCaller(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=4V24X88E3HZECB9ZLF5WJXLXH&contentType=json`);
    const weatherData = await response.json();
    return weatherData;
}

//---Features---
//Expects weatherData json object from weatherCaller
function parseWeatherData(data) {
    const address = data.address;
    const temp = data.currentConditions.temp;
    const conditions = data.currentConditions.conditions;

    return [address, temp, conditions];
}

//---Widgets---//
function locationDisplay() {

}

function weatherGifDisplay() {

}

function weatherInfoDisplay() {
//User should be able to change temp between C and F

}

function locationInputForm() {

}

//---Pages---//

//--App Controller--//

