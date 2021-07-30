import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import moment from 'moment';
import WeatherDetailsCard from './WeatherDetailsCard';

function displayWeekDay(date) {
    return moment.unix(date).format('ddd').toUpperCase();
}

function displayMonthDate(date) {
    const monthDate = moment.unix(date).format('D');
    return (monthDate.toString().length < 2) ? `0${monthDate}` : monthDate;
}

const Weather = ({ weatherData, activeIndex, index, handleClick, capitalizeFirstLetter }) => {
    return [
        <Accordion.Title key={`${index}title`}
                         active={index in activeIndex}
                         index={index}
                         onClick={handleClick}>
            {displayWeekDay(weatherData.dt)} {displayMonthDate(weatherData.dt)}
            <Icon name='dropdown' />
        </Accordion.Title>,
        <Accordion.Content key={`${index}content`}
                           active={index in activeIndex}>
            <WeatherDetailsCard weatherData={weatherData}
                                capitalizeFirstLetter={capitalizeFirstLetter} />
        </Accordion.Content>
    ];
};

export default Weather;
