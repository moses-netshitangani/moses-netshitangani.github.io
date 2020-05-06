// Coordinates
let lat, longi;

// Update the DOM
let change = (t,w,d) => {
    temp_heading = document.getElementById("temp");
    type_heading = document.getElementById("type");
    location_heading = document.getElementById("location");
    location_heading.innerHTML = d;
    t = t - 273.15;
    t = Math.round(t);
    temp_heading.innerHTML = t;
    type_heading.innerHTML = w[0].description;
    console.log(d);
}

// Retrieve user coordinates
let obtain = () => {
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        longi = position.coords.longitude;
        // alert(`lat: ${lat}, long: ${longi}`);
        lat = lat.toFixed(4);
        longi = longi.toFixed(4);
        
        // Consume the API
        let apikey = "1b03107903aa41c9654fefe8a6775b7a";
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${apikey}`)
            .then(response => response = response.json())
            .then(data => change(data.main.temp, data.weather, data.name))
            .catch(err => console.log(err));
    },
    err => {
        alert("Please refresh page and ensure that your browser has permission to access the device location.");
    },
    {   
        enableHighAccuracy: true,
    }
    );
}

obtain();