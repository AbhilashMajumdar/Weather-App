
const weatherApi = {
    key: "f0f2d734931b4ae3d5e97636e805d35c",
    baseurl: "https://api.openweathermap.org/data/2.5/weather"
}


let inputbox = document.getElementById("inputbox");
let btn = document.getElementById("btn");
let city;

inputbox.addEventListener('change', () =>{
    btn.addEventListener('click', ()=>{
        city = inputbox.value;
        let w = document.querySelector(".weatherbody");
        w.style.display = "block";
        getWeatherinfo(city);
    });
});

function getWeatherinfo(city)
{
    fetch(`${weatherApi.baseurl}?q=${city}&units=metric&appid=${weatherApi.key}`)
    .then(weather =>{
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather)
{
    console.log(weather);

    let mintemp = document.getElementById("mintempdeg");
    mintemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C `;
    
    let maxtemp = document.getElementById("maxtempdeg");
    maxtemp.innerHTML = `${Math.ceil(weather.main.temp_max)}&deg;C `;

    let temp = document.getElementById("temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}&deg;C `;

    let humidity = document.getElementById("humiditylevel");
    humidity.innerHTML = `${weather.main.humidity}% `;

    let pressure = document.getElementById("pressurelevel");
    pressure.innerText = `${weather.main.pressure}`;

    let wind = document.getElementById("windlevel");
    wind.innerText = `${weather.wind.speed}`;

    let status = document.getElementById("status");
    status.innerText = `${weather.weather[0].main}`;

    let place = document.getElementById("place");
    place.innerText = `${weather.name} , ${weather.sys.country}`;

    let feel = document.getElementById("feel");
    feel.innerHTML = `Feels like ${Math.round(weather.main.feels_like)}&deg;C`;

    // Weather Status 
    let ws = status.textContent;
    const img = document.getElementById("img");

    img.classList.remove("fa-smog");
    img.classList.remove("fa-cloud-rain");
    img.classList.remove("fa-cloud");
    img.classList.remove("fa-cloud-showers-heavy");
    img.classList.remove("fa-cloud-sun");
   
    if(ws == "Haze" || ws == "Mist")
    {
        img.classList.toggle("fa-smog");
    }
    else if(ws == "Rain")
    {
        img.classList.toggle("fa-cloud-rain");
    }
    else if(ws == "Clouds")
    {
        img.classList.toggle("fa-cloud");
    }
    else if(ws == "Drizzle")
    {
        img.classList.toggle("fa-cloud-showers-heavy");
    }
    else if(ws == "Clear")
    {
        img.classList.toggle("fa-cloud-sun");
    }

    let time = document.getElementById("time");
    let h, m, s;

    let d = new Date();
    h=d.getHours();
    m=d.getMinutes();
    s=d.getSeconds();
    let ampm="AM";

    if(h>=12)
        {
            h=h-12;
            ampm = "PM";
        }

        if(h<10)
        {
            if(m<10)
            {
                if(s<10)
                {
                    time.innerHTML = (`0${h}:0${m}:0${s} ${ampm}`);
                }
                else
                {
                    time.innerHTML = (`0${h}:0${m}:${s} ${ampm}`);
                }
            }
            else
            {
                if(s<10)
                {
                    time.innerHTML = (`0${h}:${m}:0${s} ${ampm}`);
                }
                else
                {
                    time.innerHTML = (`0${h}:${m}:${s} ${ampm}`);
                }
            }
        }
        else
        {
            if(m<10)
            {
                if(s<10)
                {
                    time.innerHTML = (`${h}:0${m}:0${s} ${ampm}`);
                }
                else
                {
                    time.innerHTML = (`${h}:0${m}:${s} ${ampm}`);
                }
            }
            else
            {
                if(s<10)
                {
                    time.innerHTML = (`${h}:${m}:0${s} ${ampm}`);
                }
                else
                {
                    time.innerHTML = (`${h}:${m}:${s} ${ampm}`);
                }
            }
        }


    // Year, Month, Day 
    const getDateTime = (unixTimeStamp) => {
        const ms = unixTimeStamp * 1000;
        const dateobject = new Date(ms);
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        const humanDateFormat = dateobject.toLocaleDateString("en-US", options);
        return humanDateFormat;
    }

    let date = document.getElementById("date");
    let dt = weather.dt;
    
    date.innerText = getDateTime(dt);


    
    // sunset 
    const getSunsetTime = (unixTimeStamp) => {
        const ms = unixTimeStamp * 1000;
        const dateobject = new Date(ms);
        let h=dateobject.getHours();
        let m=dateobject.getMinutes();
        // console.log(h);
        let ampm = "AM";
        if(h>=12)
        {
            h=h-12;
            ampm = "PM";
        }

        if(h<10)
        {
            if(m<10)
            {
                return (`0${h}:0${m} ${ampm}`);
            }
            else
            {
                return (`0${h}:${m} ${ampm}`);
            }
        }
        else
        {
            if(m<10)
            {
                return (`${h}:0${m} ${ampm}`);
            }
            else
            {
                return (`${h}:${m} ${ampm}`);
            }
        }
    };

    const sunsetdt = weather.sys.sunset;
    const sunsettime = document.getElementById("sunsettime");
    sunsettime.innerText = getSunsetTime(sunsetdt);



    // sunrise 
    const getSunriseTime = (unixTimeStamp) => {
        const ms = unixTimeStamp * 1000;
        const dateobject = new Date(ms);
        let h=dateobject.getHours();
        let m=dateobject.getMinutes();
        let ampm = "AM";
        if(h>=12)
        {
            h=h-12;
            ampm = "PM";
        }

        if(h<10)
        {
            if(m<10)
            {
                return (`0${h}:0${m} ${ampm}`);
            }
            else
            {
                return (`0${h}:${m} ${ampm}`);
            }
        }
        else
        {
            if(m<10)
            {
                return (`${h}:0${m} ${ampm}`);
            }
            else
            {
                return (`${h}:${m} ${ampm}`);
            }
        }
    };

    const sunrisedt = weather.sys.sunrise;
    const sunrisetime = document.getElementById("sunrisetime");
    sunrisetime.innerText = getSunsetTime(sunrisedt);
}









