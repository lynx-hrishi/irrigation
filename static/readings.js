function fetchValue() {
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            let notConnected = data.connect;
            if(notConnected == 'Not Connected'){
                document.getElementById('circle').style.color = 'red';
                document.getElementById('connection').textContent = "Not Connected";
            }
            document.getElementById('water-value').textContent = data[0].waterLevel + " %";
            document.getElementById('temperature-value').textContent = data[0].temperature + " °C";
            document.getElementById('humidity-value').textContent = data[0].humidity;
            let moistureValue = data[0].moisture;
            if(moistureValue === 0){
                document.getElementById('moisture-value').textContent = "Soil is WET";
            }
            else{
                document.getElementById('moisture-value').textContent = "Soil is DRY";
            };
            
            let rainValue = data[0].rain;
            if(rainValue === 1){
                document.getElementById('rain-status').textContent = "It's Not Raining";
            }
            else{
            document.getElementById('rain-status').textContent = "It's Raining";
            }

            if(data[0].connect == 'connected'){
                document.getElementById('circle').style.color = 'rgb(52, 255, 42)';
                document.getElementById('connection').textContent = "Connected";
            }

            // if (myObj) {
            //     // document.getElementById('moisture-value').textContent = moistureSensor;
            //     document.getElementById('temperature-value').textContent = temperatureValue;
            //     document.getElementById('humidity-value').textContent = humidityValue;
            //     document.getElementById('water-value').textContent = waterValue;
                
            //     if (myObj.includes('"Motor On"')){
            //         document.getElementById('pump-status').textContent = "Motor is ON";
            //     }
            //     else{
            //         document.getElementById('pump-status').textContent = "Motor is OFF";
            //     }

            //     if (rainSensor.includes("0")){
            //         document.getElementById('rain-status').textContent = "It's Raining";
            //     }
            //     else{
            //         document.getElementById('rain-status').textContent = "It's not raining";
            //     }

            //     if (myObj.includes("dry")){
            //         document.getElementById('moisture-value').textContent = 'Soil is DRY';
            //     }
            //     else{
            //         document.getElementById('moisture-value').textContent = 'Soil is WET';
            //     }

            //     if (myObj.includes("connected")){
            //         document.getElementById('circle').style.color = 'rgb(52, 255, 42)';
            //         document.getElementById('connection').textContent = "Connected";
            //     }
            //     else{
            //         document.getElementById('circle').style.color = 'red';
            //         document.getElementById('connection').textContent = "Not Connected";
            //     }
 
                
            // }
            // else {
            //     document.getElementById('reading-heading').textContent = "Error: No value received";
            // }
        })
        .catch(err => {
            console.error('Error fetching value:', err)
            // document.getElementById('circle').style.color = 'red';
            // document.getElementById('connection').textContent = "Not Connected";
        });

        // function myFunction(x) {
        //     if (x.matches) { // If media query matches
        //       document.getElementById('reading-heading').innerHTML = 'The readings are <br> as follows...';
        //       document.getElementById('reading-heading').style.width = "32%";
        //     //   document.getElementById('reading-div').style.top = '100%'
        //     //   document.getElementById('read-head-div').style.paddingTop = '20px'
        //     } 
        //     else {
        //         document.getElementById('reading-heading').innerHTML = 'The readings are as follows...';
        //         document.getElementById('reading-heading').style.width = "48%";
        //     }
        //   }
          
        //   // Create a MediaQueryList object
        //   var x = window.matchMedia("(max-width: 1300px)")
          
        //   // Call listener function at run time
        //   myFunction(x);
}

// Fetch the value every second
setInterval(fetchValue, 1000);
// while (true){
//     fetchValue();
// }