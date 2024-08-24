async function pixabayRequest(query, apiKey){
    try{
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&editors_choice=true&order=popular&per_page=3`;
        const response = await fetch(url);
        const data = await response.json();
        return data.hits[0].webformatURL;
    }catch(error){
        throw new Error('Pixabay API request failed: ' + error.message);
    }
}

module.exports = pixabayRequest;