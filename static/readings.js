function fetchValue() {
    // fetchValue.count = (fetchValue.count || 0) + 1;
    // console.log(fetchValue.count);
    fetch('/api/data')
        .then(response => {
            if (!response.ok) {
                // document.getElementById('circle').style.color = 'red';
                // document.getElementById('connection').textContent = "Not Connected";
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            // let notConnected = data.connect;
            // if(notConnected == 'Not Connected'){
            //     console.log(fetchValue.count);
            // }
            
            if (fetchValue.count == 4){
                document.getElementById('circle').style.color = 'red';
                document.getElementById('connection').textContent = "Not Connected";
            }
            
            if (data[0].waterLevel <= 0){
            document.getElementById('water-value').textContent = 0 + " %";
            }
            else if(data[0]. waterLevel >= 100){
                document.getElementById('water-value').textContent = 100 + " %";
            }
            else{
                document.getElementById('water-value').textContent = data[0].waterLevel + " %";
            }
            document.getElementById('temperature-value').textContent = data[0].temperature + " °C";
            document.getElementById('humidity-value').textContent = data[0].humidity;
            let moistureValue = data[0].moisture;
            if(moistureValue === 0){
                document.getElementById('moisture-value').textContent = "Soil is WET";
                document.getElementById('pump-status').textContent = 'Pump is OFF';
            }
            else{
                document.getElementById('moisture-value').textContent = "Soil is DRY";
                document.getElementById('pump-status').textContent = 'Pump is ON';
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
                fetchValue.count = 0;
                console.log("Default Status: " + fetchValue.count);
            }
        })
        .catch(err => {
            console.error('Error fetching value:', err);
            fetchValue.count = (fetchValue.count || 0) + 1;
            console.log("Error count: " + fetchValue.count);
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


function getRelayValue() {
    var status = null;
    const checkbox = document.getElementById('myCheckbox');
    if (checkbox.checked) {
        // console.log(checkbox.value);  // Outputs: "IrrigationEnabled"
        status = {"status" : checkbox.value};
        console.log(status);
    } else {
        // console.log('Checkbox is unchecked');
        status = { "status" : "off" };
        console.log(status);
    }

    fetch('/api/control_pump', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(status)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// mh04ly9697

document.getElementById('myCheckbox').addEventListener('change', (e) => {
    e.stopPropagation();
    getRelayValue();
    console.log('Yes Button is clicked');
})

// Fetch the value every second
setInterval(fetchValue, 1000);
// setInterval(getRelayValue, 500);