async function weatherbitRequest(coordinates, startDate, endDate, apiKey){
    try{
        const url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${apiKey}&lat=${coordinates.lat}&lon=${coordinates.lng}&days=7`;
        const response = await fetch(url);
        const data = await response.json();
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        const neededDays = data.data.filter(item => {
            return new Date(item.valid_date) >= startDate && new Date(item.valid_date) <= endDate;
        }).map(item =>{
            return{
                date:item.valid_date,
                day_temp:item.high_temp,
                night_temp:item.low_temp,
                description:item.weather.description,
                icon:`https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`,
            }
        });
        return neededDays;
    }catch(error){
        throw new Error('Weatherbit API request failed: ' + error.message);
    }
}

module.exports = weatherbitRequest;