import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyComponent from './components/MyComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MyComponent/>
      </div>
    );
  }
}

export default App;
