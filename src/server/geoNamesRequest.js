async function geoNamesRequest(location, geoNamesUsername){
    try{
        const url = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geoNamesUsername}`;
        const response = await fetch(url);
        const data = await response.json();
        return {
            coordinates:{
                lng:data.geonames[0].lng, 
                lat:data.geonames[0].lat
            },
            name:data.geonames[0].name,
            countryName: data.geonames[0].countryName
        };

    }catch(e){
        throw new Error('GeoNames API request failed: ' + error.message);
    }
}

module.exports = geoNamesRequest;