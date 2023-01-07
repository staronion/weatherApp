
//https://api.open-meteo.com/v1/meteofrance?latitude=52.52&longitude=13.41&hourly=temperature_2m
//https://api.open-meteo.com/v1/meteofrance?latitude=48.8046592&longitude=2.392064&hourly=temperature_2m&hourly=precipitation&hourly=cloudcover

//https://api.open-meteo.com/v1/meteofrance?latitude=52.52&longitude=13.41&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode&current_weather=true&timezone=Europe%2FLondon


let temperatureDOM = document.querySelector('.card-temperature');
//let wind = document.querySelector('./wind');
let timezoneDOM = document.querySelector('.card-timezone');

let timeDOM = document.querySelector('.card-time');

//let weathercodeDOM = document.querySelector('.card-wmo');

let weatherIconeElement = document.querySelector('.weather-icon');

let tmpdescDOM = document.querySelector('.card-desc');

let setRainSnow = true;
let setCloud = true;

window.addEventListener('load', ()=>{


    let long;
    let lat;



    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(position => {

            //console.log(position);

            long = position.coords.longitude;
            lat = position.coords.latitude;


            //let api = `https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;

            //const api = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m&hourly=relativehumidity_2m&hourly=windspeed_10m`;

            const api = `https://api.open-meteo.com/v1/meteofrance?latitude=${lat}&longitude=${long}&hourly=temperature_2m,relativehumidity_2m,precipitation,weathercode,cloudcover,windspeed_10m&daily=weathercode&current_weather=true&timezone=Europe%2FLondon`;
            console.log("api : "+api);

            fetch(api)
                .then(response =>{

                    return response.json();

                    }).then(data =>{
                        console.log(data);


                        console.log("timezone : "+data.timezone);
                        console.log("type of timezone : "+ typeof data.timezone);






                        timezoneDOM.textContent = data.timezone;

                        const {time, temperature, weathercode}  = data.current_weather;

                        //console.log('weathercode : ', weathercode);

                        var [dateTmp, heure] = time.split('T');



                        renderWeatherIcon(weathercode);






                        timeDOM.textContent = dateTmp + ' ' + heure;
                        temperatureDOM.textContent = temperature+'°';
                       // tmpdescDOM.textContent = windspeed;


            });

        });



    }else{
        h1.textContent = "Please enable geolocation";
    }
});

function renderWeatherIcon(code){

    if (code == 0){
        weatherIconeElement.src = './icons/sun.png';
        tmpdescDOM.textContent = 'Clear sky';
    }

    if (code >= 1 && code <=3){
        weatherIconeElement.src = './icons/partial_cloudy.png';
        tmpdescDOM.textContent = 'Mainly clear, partly cloudy, and overcast';
    }


    if (code == 45 || code == 48){
        weatherIconeElement.src = './icons/fog.png';
        tmpdescDOM.textContent = 'Fog and depositing rime fog';
    }


    if (code == 51 || code == 53 || code == 55){
        weatherIconeElement.src = './icons/fog.png';
        tmpdescDOM.textContent = 'Drizzle: Light, moderate, and dense intensity';
    }

    if (code == 56 || code == 57){
        weatherIconeElement.src = './icons/fog.png';
        tmpdescDOM.textContent = 'Freezing Drizzle: Light and dense intensity';
    }
    if (code == 61 || code == 63 || code == 65){
        weatherIconeElement.src = './icons/rain.png';
        tmpdescDOM.textContent = 'Rain: Slight, moderate and heavy intensity';
    }
    if (code == 66 || code == 67){
        weatherIconeElement.src = './icons/rain.png';
        tmpdescDOM.textContent = 'Freezing Rain: Light and heavy intensity';
    }
    if (code == 71 || code == 73 || code == 75){
        weatherIconeElement.src = './icons/snow.png';
        tmpdescDOM.textContent = 'Snow fall: Slight, moderate, and heavy intensity';
    }
    if (code == 76 || code == 77){
        weatherIconeElement.src = './icons/snow.png';
        tmpdescDOM.textContent = 'Snow grains';
    }
    if (code >= 81 && code <= 83){
        weatherIconeElement.src = './icons/rain.png';
        tmpdescDOM.textContent = 'Rain showers: Slight, moderate, and violent';
    }
    if (code == 85 || code == 86){
        weatherIconeElement.src = './icons/snow.png';
        tmpdescDOM.textContent = 'Snow showers slight and heavy';
    }

    if (code == 95){
        weatherIconeElement.src = './icons/thunderstorm.png';
        tmpdescDOM.textContent = 'Thunderstorm: Slight or moderate';
    }

    if (code == 96 || code == 99){
        weatherIconeElement.src = './icons/thunderstorm.png';
        tmpdescDOM.textContent = 'Thunderstorm with slight and heavy hail';
    }

}