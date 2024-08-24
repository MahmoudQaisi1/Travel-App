import { updateUI } from "./updateUI";
export async function getAllDestinations(){
    try{
        const response = await fetch('http://localhost:8000/getAllDestinations');
        const data = await response.json();
        Object.values(data).forEach( value =>{
            updateUI(value);
        })
    }catch(error){
        console.log(error);
    }
}