import React, { Component } from 'react';
import {Search} from 'semantic-ui-react';
import APIManager from "./../network/APIManager";
import debounce from 'lodash.debounce';

export default class CitySearch extends Component {
    state = {
        results: [],
    }

    apiManager = new APIManager()

    constructor(props) {
        super(props);
        this.fetchCitiesDebounce = debounce(this.fetchCitiesDebounce.bind(this), 1000);
    }

    parseResults(data) {
        let results = []
        if (data === undefined) return results
        for (let i = 0; i < data.address.length; i++) {
            results.push({
                title: data.address[i],
                lat: data.latitude[i],
                long: data.longitude[i]
            })
        }
        this.setState({results: results})
    }

    fetchCitiesDebounce(value){
        this.fetchCities(value)
    }

    fetchCities(value) {
        if (value === '' || value === undefined) {
            return
        }
        this.apiManager.fetchCities(value)
            .then(data => {
                this.parseResults(data.data.dal.getSunV3LocationSearchUrlConfig[`language:en-US;locationType:locale;query:${value}`].data.location)
            })
    }

    handleResultSelect = (e, {result}) => this.props.onCitySearchSelect(result)

    handleSearchChange = (e, {value}) => {
        this.fetchCitiesDebounce(value)
    }

    render() {
        return (
            <Search
                fluid
                placeholder="Enter city or ZIP..."
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.results}
            />
        )
    }
}



