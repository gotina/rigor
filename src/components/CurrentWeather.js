import React from 'react';
import { Card, Image, Spinner } from 'react-bootstrap';

const CurrentWeather = React.memo(function CurrentWeather(props) {
  const imperialUnit = '°F';
  
  if (!props.weather) {
    return (
      <Card>
        <Card.Body>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <Card.Text>Loading current weather conditions...</Card.Text>
        </Card.Body>
      </Card>
    )
  }

  return (
    <Card>
        <Card.Header>
          <h3>{ props.weather.name }, { props.weather.sys.country }</h3>
          {(new Date(props.weather.dt*1000)).toLocaleTimeString()}
        </Card.Header>
        <Card.Body>
          <React.Fragment>
            <h4 className="primary">{ props.weather.weather[0].main }</h4>
            <div>{ props.weather.weather[0].description }</div>
            <Image src={`https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} />
            <div>
              <span className="small muted">H: { Math.round(props.weather.main.temp_max) }{imperialUnit} </span>
              <span className="small muted">L: { Math.round(props.weather.main.temp_min) }{imperialUnit} </span>
            </div>
            <h2 className="primary mb-0">
              { Math.round(props.weather.main.temp) }{imperialUnit}
            </h2>
            <small>(feels like { Math.round(props.weather.main.feels_like) }{imperialUnit})</small>
          </React.Fragment>
        </Card.Body>
        <Card.Footer>
            <div className='small text-left'>
              <div>Wind: { props.weather.wind.speed } mph</div>
              <div>Pressure: { props.weather.main.pressure } hpa</div>
              <div>Humidity: { props.weather.main.humidity }%</div>
              <div>Sunrise: { (new Date(props.weather.sys.sunrise*1000)).toLocaleTimeString() }</div>
              <div>Sunset: { (new Date(props.weather.sys.sunset*1000)).toLocaleTimeString() }</div>
            </div>
        </Card.Footer>
    </Card>
  );
});

export default CurrentWeather;
