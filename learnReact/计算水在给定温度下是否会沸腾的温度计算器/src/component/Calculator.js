import React from 'react'
import TemperatureInput from './TemperatureInput '
import BoilingVerdict from './BoilingVerdict'

// 转换函数
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    // 统一管理数据
    this.state = {
      celsius: '',
      temperature: ''
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }
  // 将父组件的更新函数传递给子组件，使得子组件可以修改到props中的值
  handleCelsiusChange(temperature) {
    this.setState({
      scale: 'c',
      temperature: temperature
    })
  }
  handleFahrenheitChange(temperature) {
    this.setState({
      scale: 'f',
      temperature: temperature
    })
  }
  
  render() {
    const {temperature, scale} = this.state;
    // 转换温度
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput 
          scale="c" 
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />

        <TemperatureInput 
          scale="f" 
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />

        <BoilingVerdict 
          celsius={celsius} />
      </div>
    )
  }
}
export default Calculator