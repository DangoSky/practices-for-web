import React from 'react'
import ReactDOM from 'react-dom'
import Calculator from './component/Calculator.js'

class App extends React.Component {
  render() {
    return (
      <Calculator></Calculator>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
