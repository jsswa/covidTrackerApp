import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';
import image2 from './images/image2.jpg'

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.image} src={image2} alt="COVID-19" />
          <CountryPicker handleCountryChange={this.handleCountryChange} />
        </div>
        <div className={styles.main}>
          <Cards data={data} />
          <Chart data={data} country={country} />
        </div> 
      </div>
    );
  }
}

export default App;