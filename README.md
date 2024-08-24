# Travel App

## Introduction

This project is a **Travel App** that allows users to add destinations and view some information about each destination, such as weather forecasts and images. The app fetches data from various APIs, including GeoNames, Weatherbit, and Pixabay, to provide a comprehensive travel planning experience.

## Project Description

The Travel App is designed to help users plan their trips by allowing them to search for destinations and retrieve relevant data such as weather information and images. Users can add and delete destinations, and the app will update dynamically based on user input. It features an intuitive user interface built with modern JavaScript and SCSS and utilizes webpack for module bundling.

### Key Features:

- **Destination Search**: Users can search for destinations and get information like the city, country, weather forecasts, and images.
- **API Integration**: The app integrates with multiple APIs (GeoNames, Weatherbit, and Pixabay) to fetch real-time data.
- **Dynamic UI Updates**: The app dynamically updates the user interface when destinations are added or deleted.
- **Service Worker Support**: Provides offline support by caching assets using a service worker.

## Technologies Used

- **Frontend**: HTML, SCSS, JavaScript
- **Backend**: Node.js, Express
- **APIs**: GeoNames, Weatherbit, Pixabay
- **Build Tools**: Webpack
- **Testing**: Jest

## Getting Started

Follow the steps below to set up and run the Travel App on your local machine.

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the Repository:**

```bash
   git clone https://github.com/MahmoudQaisi1/Travel-App.git
   cd Travel-App
```

2. **Install Dependencies:**

```bash
npm install

```

3. **Set Up Environment Variables:**

Create a .env file in the root directory of your project and add your API keys:

```bash
geo_names_username=YOUR_GEONAMES_USERNAME
weatherbit_API_Key=YOUR_WEATHERBIT_API_KEY
pixabay_API_Key=YOUR_PIXABAY_API_KEY
```
Replace `YOUR_GEONAMES_USERNAME`, `YOUR_WEATHERBIT_API_KEY`, and `YOUR_PIXABAY_API_KEY` with your actual API credentials.

### Running the App
There two modes to run this project:
1. **Development mode**:
In this mode you will be able to run the website, edit the source code and see the changes as they happen without having to re-build the project after every change you make.

 - Start the development server:
```bash
npm run build-dev
```

- Open development sever:

Open your web browser and go to `http://localhost:3000` to start the webpage connected to the development server.

- Start the server:

To be able to communicate with our express server you must start the server in a nwe terminal using the following command:

```bash
npm start
```
2. **Production Mode:**

Production mode enables you to use the website just as if a regular user was suing it. 

- Build the Project:

To build the project for production, run:

```bash
npm run build-prod
```

- Start the Server:

Start the server by running:

```bash
npm start
```
The app will be running on http://localhost:8000.

- Visit the App in Your Browser:

Open your web browser and go to http://localhost:8000 to start using the Travel App.

### Running Tests
This project uses Jest for unit testing. To run the tests, follow these steps:

1. Run Tests:

```bash
npm test
```
2. Test Environment Configuration:

The project uses different test environments for client-side and server-side tests:

- Client-Side Tests: Run in a JSDOM environment.
- Server-Side Tests: Run in a Node environment.

The jest.config.js file is set up to handle these environments separately.

### Additional Notes
- Favicon Setup: The app uses a favicon set up through webpack. Ensure your favicon assets are correctly placed and configured in your webpack configuration file.
- Offline Support: The app includes a service worker for offline support. Ensure your service worker file is correctly registered and placed.

---

By following these instructions, you should be able to set up, run, and test the Travel App on your local machine. Enjoy exploring destinations and planning your trips!