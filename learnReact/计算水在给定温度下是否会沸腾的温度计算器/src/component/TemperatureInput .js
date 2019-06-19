import React, { Component } from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
}
class TemperatureInput  extends Component {
  constructor(props) {
    super(props);
    // 在构造器中给函数绑定this指向，或者直接使用箭头函数
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }
  render() {
    // 在render函数中绑定state或props中的值
    const {temperature, scale} = this.props;
    return (
      <fieldset>
        <legend>>Enter temperature in {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

export default TemperatureInput;