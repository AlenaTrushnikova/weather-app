import './App.css';
import React, {Component} from "react";
import CityCard from './components/CityCard';
import CitySearch from "./components/CitySearch";
import APIManager from "./network/APIManager";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.apiManager = new APIManager()

        this.state = {
            city: '',
            currentCoordinates: {
                lat: Number.MAX_SAFE_INTEGER,
                long: Number.MAX_SAFE_INTEGER
            },
            data: [],
            isLoading: true,
            error: false
        }
    };

    fetchWeather = (coordinates) => {
        this.setState({
            isLoading: true,
            error: false
        })
        this.apiManager.fetchWeather(coordinates)
            .then(result => {
                this.setState({
                    data: result.data,
                    isLoading: false
                })
            })
            .catch((error) => {
                this.setState({
                    data: undefined,
                    isLoading: false,
                    error: true
                })
            });
    };

    fetchUserCurrentCity = (currentCoordinates) => {
        this.apiManager.fetchUserCurrentCity(currentCoordinates)
            .then(result => {
                this.setState({city: result.data[0].name})
            })
            .catch((error) => {
                this.setState({city: `${currentCoordinates['lat']}; ${currentCoordinates['long']}`})
            });
    };
    positionError;

    fetchUserLocation = (currentCoordinates) => {
        if (currentCoordinates['lat'] === Number.MAX_SAFE_INTEGER
            || currentCoordinates['long'] === Number.MAX_SAFE_INTEGER) {

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.setState({
                        currentCoordinates: {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        }
                    },)
                    this.fetchUserCurrentCity(this.state.currentCoordinates)
                    this.fetchWeather(this.state.currentCoordinates)
                }, this.positionError = () => {
                    this.setState({isLoading: false})
                });
        };
    };

    componentDidMount() {
        this.fetchUserLocation(this.state.currentCoordinates)
    };

    onCitySearchSelect = (result) => {
        this.setState({
                city: result.title,
                currentCoordinates: {
                    lat: result.lat,
                    long: result.long,
                }
            }
        );
        this.fetchWeather({
            lat: result.lat,
            long: result.long,
        });
    };

    render() {
        let content
        if (this.state.isLoading) {
            content = (<div className="ui active centered inline loader" style={{marginTop: 10}}></div>)
        } else if (this.state.data.length !== 0) {
            content = (<CityCard weatherData={this.state.data} city={this.state.city}/>)
        } else {
            content = (<div></div>)
        }
        return (
            <div className="App">
                <CitySearch onCitySearchSelect={this.onCitySearchSelect}/>
                {content}
            </div>
        )
    };
};
