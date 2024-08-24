import trashIcon from '../assets/icons/trash.svg';
import rotateIcon from '../assets/icons/rotate.svg';

export function updateUI(destination) {
    const destinations = document.querySelector('.destinations-wrapper');
    const container = document.createElement('div');
    container.id = destination.id;
    container.classList.add('card-container');
  
    const deleteButton = createCardButton(trashIcon, 'delete-button', 'Trash Icon');
    container.appendChild(deleteButton);

    const rotateButton = createCardButton(rotateIcon, 'rotate-button', 'Rotate Icon');
    container.appendChild(rotateButton);
  
    const card1 = createCard1(destination);
    const card2 = createCard2(destination.weather);
  
    container.append(card1, card2);
    destinations.appendChild(container);
}

function createCard1(destination) {
    const card1 = createElementWithClass('div', 'card1');
    card1.classList.add('top');
    card1.classList.add('card');
  
    const image = createElementWithClass('img', 'card1-image');
    image.alt = `${destination.name}, ${destination.countryName}`;
    image.src = destination.image;
  
    const h2 = createElementWithClass('h2', 'card1-title');
    h2.innerText = `${destination.name}, ${destination.countryName}`;
  
    card1.append(image, h2);
  
    return card1;
  }
  
  function createCard2(weather) {
    const card2 = createElementWithClass('div', 'card2');
    card2.classList.add('card');
  
    const weatherContainer = createWeatherContainer(weather);
    card2.appendChild(weatherContainer);
  
    return card2;
  }

function createWeatherContainer(weather) {
    const weatherContainer = createElementWithClass('div', 'weather-container');
    const h3 = createElementWithClass('h3', 'weather-container-title');
    h3.innerText = 'Weather Information';
    weatherContainer.appendChild(h3);
  
    const weatherDaysContainer = createElementWithClass('div', 'weather-days-container');
  
    weather.forEach(day => {
      weatherDaysContainer.appendChild(createWeatherDay(day));
    });
  
    weatherContainer.appendChild(weatherDaysContainer);
  
    return weatherContainer;
}

function createWeatherDay(day) {
    const weatherDay = createElementWithClass('div', 'weather-day-container');
  
    const temperature = createElementWithClass('p', 'weather-day-temp');
    temperature.innerText = `${day.day_temp} - ${day.night_temp} °C`;
  
    const description = createElementWithClass('p', 'weather-day-description');
    description.innerText = day.description;
  
    const date = createElementWithClass('p', 'weather-day-date');
    date.innerText = day.date;
  
    const image = createElementWithClass('img', 'weather-day-icon');
    image.alt = 'weather-day-icon';
    image.src = day.icon;
  
    weatherDay.append(date, temperature, description, image);
  
    return weatherDay;
}

function createCardButton(icon, className, alt) {
    const button = createElementWithClass('button', className);
    button.classList.add('card-button')
    const image = document.createElement('img');
    image.alt = alt;
    image.src = icon;
    button.appendChild(image);
    return button;
}
  
function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}

