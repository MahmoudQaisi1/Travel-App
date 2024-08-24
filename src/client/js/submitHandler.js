import { validateDates } from "./validateDates";
import { getDestination } from "./getDestination";
import { updateUI } from "./updateUI";


export async function submitHandler(event){
    event.preventDefault();

    const location = document.getElementById('location').value;
    const startDate = new Date(document.getElementById('dep-date').value);
    const endDate = new Date(document.getElementById('ret-date').value);
    
    if(!validateDates(startDate,endDate))
        return;

    try{
        const destination = await getDestination(location,startDate,endDate);
        updateUI(destination);
    }catch(e){
        console.log(e);
    }
    

}



