import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import FormSearch from "./components/FormSearch/FormSearch";

class App extends Component {
  render() {
    return (
      <div>
        <FormSearch/>
      </div>
    );
  }
}

export default App;
