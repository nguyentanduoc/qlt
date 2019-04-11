import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import FormSearch from "./components/FormSearch/FormSearch";
import Map from './components/Map/MapComponent'
import { BrowserRouter as Router, Route } from "react-router-dom";
import {setCurrentCoordinate} from './redux/action/mapAction';
import {connect} from "react-redux";

class App extends Component {
  componentWillMount() {
    this.getLocation();
  }
  getLocation() {
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.props.onSetCurrentCoordinate({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, () => {
        this.setState({latitude: 'err-latitude', longitude: 'err-longitude'})
      })
    }
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={FormSearch} />
        <Route path="/map/" component={Map} />
      </Router>
    );
  }
}
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  onSetCurrentCoordinate: (coordinate) => dispatch(setCurrentCoordinate(coordinate))
});
export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
