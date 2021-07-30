import React, {Component} from 'react';
import Weather from "./Weather";
import WeatherDetailsCard from "./WeatherDetailsCard";
import { Accordion, Card, CardContent, Icon } from 'semantic-ui-react';

export default class CityCard extends Component {
    state = {activeIndex: {}}

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        index in activeIndex ? delete activeIndex[index] : activeIndex[index] = 1
        this.setState({activeIndex: activeIndex})
    }

    capitalizeFirstLetter (string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    render() {
        const {weatherData, city} = this.props
        const todayWeather = weatherData.daily[0]
        return (
            <Card fluid>
                <CardContent>
                    <Card.Header><Icon name='map marker alternate'/>{city}</Card.Header>
                    <WeatherDetailsCard weatherData={todayWeather} capitalizeFirstLetter={this.capitalizeFirstLetter}/>
                </CardContent>
                <CardContent>
                    <h3>Weather Forecast</h3>
                    <Accordion>
                        {weatherData.daily.slice(1).map((value, index) => {
                            return <Weather
                                key={index}
                                weatherData={value}
                                activeIndex={this.state.activeIndex}
                                index={index}
                                handleClick={this.handleClick}
                                capitalizeFirstLetter={this.capitalizeFirstLetter}/>
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        )
    }
}