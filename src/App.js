import React from 'react';

import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import CurrentWeather from './components/CurrentWeather';
import FiveDayForecast from './components/FiveDayForecast';
import HistorySelector from './components/HistorySelector';
import './App.css';

const OWMKEY = '8c3e7fd0f6ec033c8ecf4379bb4cce9d';
const OGKEY = '105d83d3523543558902f454f58714c6';

const InitialState = {
  weather: null,
  forecast: null,
  city: '',
}

class App extends React.Component {
  state = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')) : InitialState;

  componentDidMount() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
    }
  }

  success = (position) => {
    this.fetchData(position.coords.latitude, position.coords.longitude);    
  }

  fetchData = (lat, lon) => {
    Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${OWMKEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&&units=imperial&APPID=${OWMKEY}`),
    ])
    .then(async([weather, forecast]) => {
      const current = await weather.json();
      const future = await forecast.json();
      return [current, future]
    })   
    .then((response) => {
      this.setState({ weather: response[0] });
      this.setState({ forecast: response[1] })
    })
    .then((response) => {
      if (this.state.city !== '') {
        localStorage.setItem(`wapp-${this.state.city}`, JSON.stringify(this.state));
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  error = () => {
    alert('Unable to retrieve your location');
  }

  handleChange = (event) => {
    this.setState({city: event.target.value});
  }

  handleSubmit = (event) => {
    if (localStorage.getItem(`wapp-${this.state.city}`)) {
      this.setState(JSON.parse(localStorage.getItem(`wapp-${this.state.city}`)));
    } else {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.city}&key=${OGKEY}`)
      .then(response => response.json())
      .then(
        (data) => {
          this.fetchData(data.results[0].geometry.lat, data.results[0].geometry.lng);
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
    }
    event.preventDefault();
  }

  handleSelect = (event) => {
    this.setState(JSON.parse(localStorage.getItem(`wapp-${event.target.innerText}`)));
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col sm={4}>
              <Form onSubmit={this.handleSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control type="text" value={this.state.city} onChange={this.handleChange} placeholder="Search by City" />
                  <InputGroup.Append>
                  <Button variant="primary" type="submit">Search</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            </Col>
            <Col sm={8}><HistorySelector handleSelect={this.handleSelect} city={this.state.city}/></Col>
          </Row>
          <Row>
            <Col sm={4}><CurrentWeather OWMKey={OWMKEY} weather={this.state.weather} /></Col>
            <Col sm={8}><FiveDayForecast OWMKey={OWMKEY} forecast={this.state.forecast}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
