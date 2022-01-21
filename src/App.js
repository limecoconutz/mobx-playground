import './App.css';
import { action } from 'mobx';
import {observer} from 'mobx-react';
import React from 'react';
import TemperatureInput from './components/TemperatureInput';

const TView = observer(({temperature})=>{
  const onTemperatureClick = action(()=>temperature.inc());
  return <button onClick={onTemperatureClick}>{temperature.location}:{temperature.temperature}</button>

  }
)

const App = observer(({temperatures}) => (
    <ul>
      <TemperatureInput temperatures={temperatures}/>
      {temperatures.map(t => <TView key={t.id} temperature={t}/>)}
    </ul>
  ));

export default App;
