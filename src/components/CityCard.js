import React, {Component} from 'react';
import Weather from "./Weather";
import WeatherDetailsCard from "./WeatherDetailsCard";
import { Accordion, Card, CardContent, Icon } from 'semantic-ui-react';

export default class CityCard extends Component {
    state = {activeIndex: {}}

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        if (index in activeIndex) {
            delete activeIndex[index]
        } else activeIndex[index] = 1
        this.setState({activeIndex: activeIndex})
    }

    render() {
        const {weatherData, city} = this.props
        const todayWeather = weatherData.daily[0]
        return (
            <Card fluid>
                <CardContent>
                    <Card.Header><Icon name='map marker alternate'/>{city}</Card.Header>
                    <h5>Now</h5>
                    <WeatherDetailsCard weatherData={todayWeather} />
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
                                handleClick={this.handleClick} />
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        )
    }
}