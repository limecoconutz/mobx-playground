import logo from './logo.svg';
import './App.css';
import {observer} from 'mobx-react';

const App = observer(({temperature}) => (
    <div className="App">
      {
        Array.from(temperature.keys(), city=>
        <div key={city}>
          {city}: {temperature.get(city).temperature} <br/>
        </div>
        )
      }
    </div>
  ));

export default App;
