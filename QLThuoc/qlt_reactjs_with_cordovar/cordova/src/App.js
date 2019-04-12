import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';

const token= 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';
mapboxgl.accessToken = token;


class App extends Component {
  componentDidMount() {
    // const { , lat, zoom } = this.state;?
    const directions = new Directions({
      accessToken: token,
      unit: 'metric',
      profile: 'mapbox/driving-traffic',
      congestion: true,
    });
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [106.63503660, 10.85268900],
      zoom: 14,
    });
    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    map.addControl(directions, 'top-left');
  }
  render() {
    return (
      <div>
        <div ref={el => this.mapContainer = el} className="absolute top right left bottom"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
          }} />
      </div>
    );
  }
}

export default App;
