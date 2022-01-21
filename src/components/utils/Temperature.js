import {observable, computed, action, transaction, useStrict, extendObservable, asMap, makeObservable} from 'mobx';
import {observer} from 'mobx-react';

const APPID = '8be446efe97a03677517586c85bd547d';

class Temperature {
  id= Math.random();
  unit='C';
  temperatureCelsius=25;
  location = 'Amsterdam, NL';
  loading = true;

  constructor(location) {
    this.location = location;
    this.fetch();
    makeObservable(this, {
      fetch: action,
      temperatureKelvin: computed,
      temperatureFahrenheit: computed,
      temperature: computed,
      setUnit: action,
      setCelsius: action,
      setTemperatureAndUnit: action('update temp and unit'),
      inc: action('increment degrees')
    })
  }

 fetch() {
    window
      .fetch(`https://api.openweathermap.org/data/2.5/weather?appid=${APPID}&q=${this.location}` )
      .then(res =>res.json()
            .then(action(json => {
            this.temperatureCelsius = json.main.temp - 273.15;
            this.loading = false;
          })
        ))
      .catch(err =>console.log("This city is not in this api, try again."));
  }

  get temperatureKelvin() {
    console.log('calculating Kelvin');
    return this.temperatureCelsius * (9/5) +32;
  }
  
  get temperatureFahrenheit() {
    console.log('calculating Fahrenheit');
    return this.temperatureCelsius + 273.15;
  }
  
  get temperature() {
    console.log('calculating temperature');
    switch (this.unit) {
      case 'K': return `${this.temperatureKelvin } ºK`
      case 'C': return `${this.temperatureCelsius } ºC`
      case 'F': return `${this.temperatureFahrenheit } ºF`
    }
  }
  
  setUnit (newUnit) {
    this.unit = newUnit;
  }

  setCelsius(degrees) {
    this.temperatureCelsius = degrees;
  }
  setTemperatureAndUnit(degrees, unit) {
    this.setCelsius(degrees);
    this.setUnit(unit);
  }
  
  inc() {
    this.setCelsius(this.temperatureCelsius +1 );
  }
}

const temps = observable([]);

export default temps;


/* WORKS WITH OBJECT ISO CLASS:
 const t = observable({
  unit: 'C',
  temperatureCelsius: 25,
  temperatureKelvin: computed(() =>{
    console.log('calculating Kelvin');
    return this.temperatureCelsius * (9/5) +32;
  }),
    temperatureFahrenheit: computed(() =>{
    console.log('calculating Fahrenheit');
    return this.temperatureCelsius + 273.15;
  }),
  temperature: computed(()=>{
     console.log('calculating temperature');
    switch (this.unit) {
      case 'K': return `${this.temperatureKelvin } ºK`
      case 'C': return `${this.temperatureCelsius } ºC`
      case 'F': return `${this.temperatureFahrenheit } ºF`
    }
  })
}) */