// Coordinates
let lat, longi;

let loc = () => {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${longi}&zoom=18&addressdetails=1`)
    .then(data => data = data.json())
    .then(data => {
        location_heading = document.getElementById("location");
        location_heading.innerHTML = `${data.address.state}, ${data.address.town}`;
    })
    .catch(err => console.log(err));
}

// Update the DOM
let change = (t,w) => {
    temp_heading = document.getElementById("temp");
    type_heading = document.getElementById("type");
    
    t = t - 273.15;
    t = Math.round(t);
    temp_heading.innerHTML = t;
    type_heading.innerHTML = w[0].main;
}

// Retrieve user coordinates
let obtain = () => {
    navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        longi = position.coords.longitude;
        lat = lat.toFixed(4);
        longi = longi.toFixed(4);

        loc();
        
        // Consume the API
        let apikey = "1b03107903aa41c9654fefe8a6775b7a";
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${longi}&appid=${apikey}`)
            .then(response => response = response.json())
            .then(data => change(data.main.temp, data.weather))
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