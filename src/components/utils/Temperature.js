import {observable, computed, action, transaction, asMap, makeObservable} from 'mobx';

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

class Temperature {
  id= Math.random();
  unit='C';
  temperatureCelsius=25;
  constructor(unit, temperatureCelsius) {
    makeObservable(this, {
      unit: observable,
      temperatureCelsius: observable,
      temperatureKelvin: computed,
      temperatureFahrenheit: computed,
      temperature: computed,
      setUnit: action, 
      setCelsius: action,
      setTemperatureAndUnit: action('update temperature and unit')
    })
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
}

const temps = observable.map({
  "Amsterdam": new Temperature(),
  "Rome": new Temperature()
})

export default temps;