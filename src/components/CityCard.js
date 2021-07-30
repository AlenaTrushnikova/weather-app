import React, {Component} from 'react';
import Weather from "./Weather";
import {Accordion, Card, CardContent, Icon} from 'semantic-ui-react'

export default class CityCard extends Component {
    state = {activeIndex: -1}

    handleClick = (e, titleProps) => {
        const {index} = titleProps
        const {activeIndex} = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({activeIndex: newIndex})
    }

    render() {
        const {weatherData, city} = this.props
        return (
            <Card fluid>
                <CardContent>
                    <Card.Header><Icon name='map marker alternate'/>{city}</Card.Header>
                    <Card centered>
                        <Card.Header>Today {Math.round(weatherData.current.temp)} &deg;C</Card.Header>
                        <div>
                            <div>Clear Sky. High 30C, low 15C.</div>
                            <div>Winds 15 m/s. Humidity 51%</div>
                        </div>
                    </Card>
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
                                handleClick={this.handleClick}/>
                        })}
                    </Accordion>
                </CardContent>
            </Card>
        )
    }
}