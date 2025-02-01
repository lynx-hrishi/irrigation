function fetchValue() {
    fetch('/read-esp8266')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // console.log('Data received:', data); // Debugging
            let myJson = data
            let myObj = myJson.data

            // slicing the sible line values recieved from esp8266 and assigning it to their labels
            let moistureSensor = myObj.slice(19,21)
            let humidityValue = myObj.slice(40,44)
            let temperatureValue = myObj.slice(61,65)
            let rainSensor = myObj.slice(79,84)
            
            console.log(myObj)

            if (myObj) {
                document.getElementById('moisture-value').textContent = moistureSensor;
                document.getElementById('temperature-value').textContent = temperatureValue;
                document.getElementById('humidity-value').textContent = humidityValue;
                document.getElementById('rain-status').textContent = rainSensor;
            } else {
                document.getElementById('reading-heading').textContent = "Error: No value received";
            }
        })
        .catch(err => console.error('Error fetching value:', err));
}

// Fetch the value every second
setInterval(fetchValue, 1000);
// while (true){
//     fetchValue();
// }