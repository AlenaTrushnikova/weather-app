import * as axios from 'axios';

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const CITIES_URL = 'https://weather.com/api/v1/p/redux-dal';
const USER_GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export default class APIManager {
    fetchWeather = (coordinates) => {
        const client = axios.create({
            baseURL: WEATHER_URL,
        });
        return client.get(`/onecall?lat=${coordinates['lat']}&lon=${coordinates['long']}&exclude=hourly,minutely&units=metric&APPID=${process.env.REACT_APP_API_KEY}`);
    };

    fetchCities = (search) => {
        let data = `[{"name":"getSunV3LocationSearchUrlConfig","params":{"query":"` + search + `","language":"en-US","locationType":"locale"}}]`
        const client = axios.create({
            baseURL: CITIES_URL,
            headers: {'Content-Type': 'application/json'},
        });
        return client.post('', data);
    };

    fetchUserCurrentCity = (currentCoordinates) => {
        const client = axios.create({
            baseURL: USER_GEO_URL,
        });
        return client.get(`/reverse?lat=${currentCoordinates['lat']}&lon=${currentCoordinates['long']}&limit=1&appid=${process.env.REACT_APP_API_KEY}`);
    };
};
