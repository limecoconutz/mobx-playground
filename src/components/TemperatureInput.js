import React, {Component} from "react";
import { observer } from "mobx-react-lite";
import { render } from "@testing-library/react";
import { makeObservable, action } from "mobx";
import Temperature from './utils/Temperature';

class TemperatureInput extends React.Component{
  input = '';
  constructor(props){
    super(props);
    makeObservable(this, {
      handleChange: action,
      handleSubmit: action
    }
    )
  }
  handleChange =  (e) => {
    console.log('in handleChange');
    this.input = e.target.value;
    console.log(this.input);
  }
      handleSubmit =  () => {
    this.props.temperatures.push(new Temperature(this.input))
    this.input='';
  }
  render() {
    return(
      <li>
        Destination
        <input onChange={this.handleChange} value={this.input}/>
        <button onClick={this.handleSubmit}>Add</button>
      </li>
    )
  }
}

export default TemperatureInput;