import React, { Component } from 'react'

import {Cards,Chart, CountryPicker} from './Components'
import styles from './App.module.css'
import { fetchData } from './api'

import coronaImage from './images/image.png'

export class App extends Component {
    state = {
        data: {},
        coountry:'' 
    }
    async componentDidMount() {
        const fetchedData = await fetchData();

        this.setState({data : fetchedData})
    }

    handleCountryChange = async (country) => {

        const fetchedData = await fetchData(country)
        
        this.setState({ data: fetchedData, country:country})    
    }

    render() {
        const { data, country } = this.state;
        return (
            <div className={styles.container} >
                <img className={styles.img} src={coronaImage} alt="COVID-19"/>
                <Cards data={ data }/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App
