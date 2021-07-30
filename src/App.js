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
    }

    fetchWeather(coordinates) {
        this.setState({
            isLoading: true,
            error: false
        })
        let that = this
        this.apiManager.fetchWeather(coordinates)
            .then(result => {
                that.setState({
                    data: result.data,
                    isLoading: false
                })
            })
            .catch((error) => {
                that.setState({
                    data: undefined,
                    isLoading: false,
                    error: true
                })
            });
    }

    fetchUserCurrentCity(currentCoordinates) {
        let that = this
        this.apiManager.fetchUserCurrentCity(currentCoordinates)
            .then(result => {
                that.setState({city: result.data[0].name})
            })
            .catch((error) => {
                that.setState({city: `${currentCoordinates['lat']}; ${currentCoordinates['long']}`})
            });
    }

    fetchUserLocation(currentCoordinates) {
        let that = this
        if (currentCoordinates['lat'] === Number.MAX_SAFE_INTEGER
            || currentCoordinates['long'] === Number.MAX_SAFE_INTEGER) {

            navigator.geolocation.getCurrentPosition(function (position) {
                that.setState({
                    currentCoordinates: {
                        lat: position.coords.latitude,
                        long: position.coords.longitude
                    }
                },)
                that.fetchUserCurrentCity(that.state.currentCoordinates)
                that.fetchWeather(that.state.currentCoordinates)
            }, function (positionError) {
                that.setState({isLoading: false})
            });
        }
    }

    componentDidMount() {
        this.fetchUserLocation(this.state.currentCoordinates)
    }

    onCitySearchSelect = (result) => {
        this.setState({
                city: result.title,
                currentCoordinates: {
                    lat: result.lat,
                    long: result.long
                }
            }
        )
        this.fetchWeather({
            lat: result.lat,
            long: result.long
        })
    }

    render() {
        let content
        if (this.state.isLoading) {
            content = (<div className="ui active centered inline loader" style = {{marginTop:10}}></div>)
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
    }
}