//sass main file
import './style/style.scss'


//Assets
import errorIcon from './assets/icons/error.svg'

//event-listeners
import { submitHandler } from './js/submitHandler';
import { destinationsEventListener } from './js/cardButtonsFunctions';
import { getAllDestinations } from './js/getAllDestinations';

(function (){
    const errorElements = document.querySelectorAll('.error-icon');
    errorElements.forEach((element)=>{
        element.src = errorIcon;
    })
    document.getElementById('form').addEventListener('submit', submitHandler);
    document.querySelector('.destinations-wrapper').addEventListener('click',destinationsEventListener);
    document.addEventListener('DOMContentLoaded', () => {
        getAllDestinations();
    });
})()