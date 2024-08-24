export async function getDestination(location, startDate, endDate){
    try{
        const response = await fetch('http://localhost:8000/addDestination',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: location,
                startDate: startDate,
                endDate: endDate
            })
        })

        const data = await response.json();
        return data;
    }catch(e){
        throw e; 
    }   
}