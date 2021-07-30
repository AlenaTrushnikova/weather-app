import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react'
import moment from 'moment';

function displayWeekDay(date) {
    return moment.unix(date).format('ddd').toUpperCase()
}

function displayMonthDate(date) {
    let monthDate = moment.unix(date).format('D')
    return (monthDate.toString().length < 2) ? "0" + monthDate : monthDate
}

const Weather = ({weatherData, activeIndex, index, handleClick}) => {
    return [
        <Accordion.Title
            key={index+'title'}
            active={activeIndex === index}
            index={index}
            onClick={handleClick}>
            {displayWeekDay(weatherData.dt)} {displayMonthDate(weatherData.dt)}
            <Icon name='dropdown'/>
        </Accordion.Title>,
        <Accordion.Content
            key={index+'content'}
            active={activeIndex === index}>
            <p style={{fontWeight: 'bold'}}>{Math.round(weatherData.temp.day)} &deg;C</p>
            <p style={{fontStyle: 'italic'}}>{weatherData.weather[0].description}</p>
            <p>Low {Math.round(weatherData.temp.min)} &deg;C</p>
            <p>High {Math.round(weatherData.temp.max)} &deg;C</p>
            <p>Wind {weatherData.wind_speed} m/s</p>
            <p>Humidity {weatherData.humidity} %</p>
        </Accordion.Content>
    ]
}

export default Weather;