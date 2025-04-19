function fetchValue(){
    fetch('/api/data')
    .then(response => {
        if (!response.ok){
            throw new error("Network Connectoin Failed!!!")
        }
        return response.json()
    })
    .then(data => {
        let valueOfEsp = data.map(item =>
            // console.log(item) 
            `<h1>Value is : ${item.id}</h1>`
        ).join('');
        document.getElementById('value').innerHTML = valueOfEsp;
    })
    .catch(error => {
        console.log(error);
    })
}

setInterval(fetchValue, 1000)