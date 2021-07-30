import {Card, Grid} from 'semantic-ui-react';

const WeatherDetailsCard = ({ weatherData, capitalizeFirstLetter }) => {
    return (
        <Card centered>
            <p style={{ fontWeight: 'bold' }}>
                {Math.round(weatherData.temp.day) } &deg;C
            </p>
            <p style={{ fontStyle: 'italic' }}>
                {capitalizeFirstLetter(weatherData.weather[0].description)}
            </p>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <p>
                            Low {Math.round(weatherData.temp.min)}
                            &deg;C
                        </p>
                        <p>
                            High {Math.round(weatherData.temp.max)}
                            &deg;C
                        </p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>
                            Wind {weatherData.wind_speed}
                            m/s
                        </p>
                        <p>
                            Humidity {weatherData.humidity}
                            %
                        </p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Card>
    );
};

export default WeatherDetailsCard;
