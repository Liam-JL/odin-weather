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

async function processLocationInfo(location) {
    const weatherData = await weatherCaller(location);
    const locationInfo = parseWeatherData(weatherData);
    console.log(locationInfo);
    return locationInfo;
}

function appendWidget(widget, parent) {
    parent.append(widget);
}

function renderLocation(location) {
    const locationDisplay = document.querySelector("[data-location-display]");
    capitalizedLocation = location.charAt(0).toUpperCase() + location.slice(1);
    locationDisplay.textContent = capitalizedLocation;
}

//---Widgets---//
function locationDisplay() {
    const locationDisplaySection = document.createElement("section");
    locationDisplaySection.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
        <span data-location-display class="location-display"></span>
    `;
    locationDisplaySection.className = "location-display-section";
    return locationDisplaySection;
}

function appMain() {
    const appMain = document.createElement("main");
    appMain.className = "app-main";
    return appMain;
}

function weatherGifDisplay() {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `
        <img src="" alt="" class="gif-container__img">
    `
    imgDiv.classList = "gif-container";
    return imgDiv;
}

function weatherInfoDisplay() {
//User should be able to change temp between C and F
    const weatherInfoWrapper = document.createElement("div");
    weatherInfoWrapper.innerHTML = `
        <span class="info-wrapper__conditions">Conditions</span>
        <span class="info-wrapper__temp" data-scale="c">20 &#xb0</span>
        <!-- celsius -->
        <button class="info-wrapper__btn info-wrapper__btn--c">&#x2103</button> 
        <!-- fahrenheit -->
        <button class="info-wrapper__btn info-wrapper__btn--f">&#x2109</button>
    `
    weatherInfoWrapper.className = "info-wrapper"
    return weatherInfoWrapper;
}

function locationInputForm() {
    const locationInputSection = document.createElement("section");
    locationInputSection.innerHTML = `
        <form class="location-input-form">
            <span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q146 0 255.5 91.5T872-559h-82q-19-73-68.5-130.5T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h80v120h-40L168-552q-3 18-5.5 36t-2.5 36q0 131 92 225t228 95v80Zm364-20L716-228q-21 12-45 20t-51 8q-75 0-127.5-52.5T440-380q0-75 52.5-127.5T620-560q75 0 127.5 52.5T800-380q0 27-8 51t-20 45l128 128-56 56ZM620-280q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Z"/></svg></span>
            <input type="text" placeholder="location" class="input-form__input-field">
            <button>Search</button>
        </form>
    `;
    locationInputSection.className = "location-input-section";

    const locationInputForm = locationInputSection.querySelector(".location-input-form");
    locationInputForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const inputField = locationInputSection.querySelector(".input-form__input-field");
        const userInput = inputField.value; //need some form validation
        const locationInfo = await processLocationInfo(userInput);
        renderLocation(locationInfo[0]);
    })

    return locationInputSection;
}

//---Pages---//
//Main Page
const app = document.getElementById("app");
const main = appMain();
appendWidget(locationDisplay(), app);
appendWidget(weatherGifDisplay(), main);
appendWidget(weatherInfoDisplay(), main);
appendWidget(main, app);
appendWidget(locationInputForm(), app);

//--App Controller--//

