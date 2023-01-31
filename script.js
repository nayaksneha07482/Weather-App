document.querySelector("#weather").style.visibility = "hidden";


document.querySelector("#btn").addEventListener("click", () => {
    document.querySelector("#weather").style.display = "block";
    document.querySelector("#map").style.display = "block";
    document.querySelectorAll("#cards").forEach(item => {
        item.style.display = "none";
    });

    var city = document.querySelector("#inp").value;

    function getMap() {
        document.querySelector("#gmap_canvas").src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    getMap();

    async function getWeather() {
        try {
            let key = "9889d1c207146349f199645bad7f13c6";
            let fetched = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)

            let data = await fetched.json();
            console.log(data);
            populate(data);
        }
        catch (err) {
            console.log('err:', err);
        }
    }
    getWeather();

    function populate(data) {

        document.querySelector("#weather").style.visibility = "visible";
        document.querySelector("#today").style.borderBottom = "3px solid rgb(96, 89, 114)";

        document.querySelector("#city").textContent = data.name + ", " + data.sys.country;
        document.querySelector("#date").textContent = "As of: " + new Date().toLocaleTimeString();
        document.querySelector("#temp").textContent = data.main.temp + "°";
        document.querySelector("#bigIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector("#smallDeg").textContent = data.main.temp_max + "°C";
        document.querySelector("#bigDeg").textContent = data.main.temp_min + "°C";
        document.querySelector("#hum").textContent = data.main.humidity + "%";
        document.querySelector("#pre").textContent = data.main.pressure + " pa";
        document.querySelector("#gust").textContent = data.wind.gust + " kmph";
        document.querySelector("#speed").textContent = data.wind.speed + " kmph";
    }
});


// Seven day forecast


document.querySelector("#seven").addEventListener("click", () => {
    document.querySelector("#seven").style.borderBottom = "3px solid rgb(96, 89, 114)";
    document.querySelector("#today").style.borderBottom = "none";
    document.querySelector("#weather").style.display = "none";
    document.querySelector("#map").style.display = "none";

    var city = document.querySelector("#inp").value;

    async function getWeeklyWeather() {
        try {
            let key = "9889d1c207146349f199645bad7f13c6";
            let fetched = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${key}&units=metric`);

            let data = await fetched.json();
            let dataArr = data.list;
            console.log(dataArr);
            weekly(dataArr);
        }
        catch (err) {
            console.log('err:', err);
        }
    }
    getWeeklyWeather();

    function weekly(dataArr) {
        dataArr.map(item => {
            let cardDiv = document.createElement("div");
            cardDiv.setAttribute("id", "cards")

            let date = document.createElement("p");
            date.textContent = item.dt_txt.split(" ").shift();

            let imgDiv = document.createElement("div");
            let image = document.createElement("img");
            image.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

            let tempDiv = document.createElement("div");
            let minTemp = document.createElement("p");
            minTemp.textContent = "Min: " + item.main.temp_min + "°";

            let maxTemp = document.createElement("p");
            maxTemp.textContent = "Max: " + item.main.temp_max + "°";

            let clouds = document.createElement("p");
            clouds.textContent = item.weather[0].description;
            clouds.setAttribute("id", "clouds")
            imgDiv.append(image);
            tempDiv.append(minTemp, maxTemp);
            cardDiv.append(date, imgDiv, tempDiv, clouds);
            document.querySelector("#container").append(cardDiv);
        });
    }
});



// Today's button


document.querySelector("#today").addEventListener("click", () => {
    document.querySelector("#weather").style.display = "block";
    document.querySelector("#map").style.display = "block";
    document.querySelectorAll("#cards").forEach(item => {
        item.style.display = "none";
    });
    document.querySelector("#seven").style.borderBottom = "none";

    var city = document.querySelector("#inp").value;

    function getMap() {
        document.querySelector("#gmap_canvas").src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
    }
    getMap();

    async function getWeather() {
        try {
            let key = "9889d1c207146349f199645bad7f13c6";
            let fetched = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)

            let data = await fetched.json();
            console.log(data);
            populate(data);
        }
        catch (err) {
            console.log('err:', err);
        }
    }
    getWeather();

    function populate(data) {

        document.querySelector("#weather").style.visibility = "visible";
        document.querySelector("#today").style.borderBottom = "3px solid rgb(96, 89, 114)";

        document.querySelector("#city").textContent = data.name + ", " + data.sys.country;
        document.querySelector("#date").textContent = "As of: " + new Date().toLocaleTimeString();
        document.querySelector("#temp").textContent = data.main.temp + "°";
        document.querySelector("#smallDeg").textContent = data.main.temp_max + "°C";
        document.querySelector("#bigDeg").textContent = data.main.temp_min + "°C";
        document.querySelector("#hum").textContent = data.main.humidity + "%";
        document.querySelector("#pre").textContent = data.main.pressure + " pa";
        document.querySelector("#gust").textContent = data.wind.gust + " kmph";
        document.querySelector("#speed").textContent = data.wind.speed + " kmph";
    }
});