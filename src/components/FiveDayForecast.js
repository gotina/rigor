import React from 'react';
import { Card, Spinner } from 'react-bootstrap';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CurrentWeather = React.memo(function CurrentWeather(props) {
  const ticks = [];

  if (!props.forecast) {
      return (
        <Card>
          <Card.Body>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
            <Card.Text>Loading weather forecast...</Card.Text>
          </Card.Body>
        </Card>
      )
  }

  const getTemps = (data) => {
    const tempArray = [];

    for (const property in data) {
      tempArray.push(data[property].main.temp);
    }

    return tempArray;
  }

  const getDates = (data) => {
    const dates = [];

    data.forEach((property, index) => {
      if ((property.dt_txt).includes("0:00:00")) {
        ticks.push(index);
      }

      dates.push(property.dt_txt);
    });

    return dates;
  }

  const options = {
    chart: {
      type: 'spline'
    },
    title: {
      text: props.forecast.city.name
    },
    subtitle: {
      text: 'Hourly 5 Day Forecast'
    },
    xAxis: {
      categories: getDates(props.forecast.list),
      tickPositions: ticks,
      labels: {
        align: 'left',
        x: 3,
        y: 16,
        formatter: function () {
          return Highcharts.dateFormat('%b %e', new Date(this.value));
        }
      },
      gridLineWidth: 1,
    },
    yAxis: {
      title: {
        text: 'Temperature'
      },
      labels: {
        formatter: function () {
            return this.value + '°';
        }
      },
      gridLineWidth: 0
    },
    tooltip: {
      useHTML: true,
      style: {
        height: "100px"
      },
      formatter: function() {
        let result = props.forecast.list.filter(obj => {
            return obj.dt_txt === this.x
        })

        const path = `https://openweathermap.org/img/wn/${result[0].weather[0].icon}@2x.png`;
        const img = `<img src = "${path}" height="60px" />`;

        return (
          '<center>' +
            '<b>' + (new Date(this.x)).toLocaleString() + '</b><br />' +
            img + '<b><span style="font-size: 20px">' + Math.round(this.y) + '°F</span></b><br />' +
            result[0].weather[0].main + 
            ' (' + result[0].weather[0].description + ') <br />' +
            'Feels like ' + Math.round(result[0].main.feels_like) + '°F' +
          '</center>'
        );
      }
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: false
        }
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'Temperature',
      data: getTemps(props.forecast.list)
    }],
    credits: {
      enabled: false
    }
  }
    
  return (
  <Card>
      <Card.Body>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
      </Card.Body>
  </Card>
  );
});

export default CurrentWeather;
