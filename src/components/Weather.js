import React from 'react';
import { Accordion, Icon } from 'semantic-ui-react';
import WeatherDetailsCard from './WeatherDetailsCard';
import DateFormatter from "../utils/DateFormatter";

const Weather = ({ weatherData, activeIndex, index, handleClick }) => {
    return [
        <Accordion.Title key={`${index}title`}
                         active={index in activeIndex}
                         index={index}
                         onClick={handleClick}>
            {DateFormatter.displayWeekDay(weatherData.dt)} {DateFormatter.displayMonthDate(weatherData.dt)}
            <Icon name='dropdown' />
        </Accordion.Title>,
        <Accordion.Content key={`${index}content`}
                           active={index in activeIndex}>
            <WeatherDetailsCard weatherData={weatherData} />
        </Accordion.Content>
    ];
};

export default Weather;
