import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl';
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import 'mapbox-gl/dist/mapbox-gl.css'

const accessToken = 'pk.eyJ1IjoibnRkdW9jIiwiYSI6ImNqdWNpZnh5dzBmcjE0NHBkc3YxejhvM3IifQ.OZq4smDBLCr6XJD7hS0mGg';

const directions = new Directions({
  accessToken: accessToken,
  unit: 'metric',
  profile: 'mapbox/driving-traffic',
  congestion: true,
});
const Mapbox = new ReactMapboxGl({
  accessToken: accessToken,
  zoom: 16,
  style: ''
});

class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: {}
    }
  }

  onStyleLoad = (map) => {
    const {currentCoordinate} = this.props.mapReducer;
    const {branchSelected} = this.props.searchProductNameReducer;
    directions.setOrigin([currentCoordinate.longitude, currentCoordinate.latitude]);
    directions.setDestination([branchSelected.longitude, branchSelected.latitude]);
    map.addControl(directions, 'top-left');
    this.setState({map: map});
  }

  render() {
    const {currentCoordinate} = this.props.mapReducer;
    const {branchSelected} = this.props.searchProductNameReducer;
    return (
      <div>
        <Mapbox
          style="mapbox://styles/mapbox/streets-v11"
          center={[106.646128, 10.803436]}
          zoom={[14]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onStyleLoad={this.onStyleLoad.bind(this)}
        >
          {this.state.map &&
          <Layer type="circle" paint={{
            'circle-color': "#0b15bf",
            'circle-stroke-width': 8,
            'circle-stroke-color': '#fff',
            'circle-stroke-opacity': 0.4,
            "circle-radius": {
              "stops": [
                [0, 0],
                [16, 40]
              ],
              "base": 2
            },
            "circle-opacity": 0.7,
          }}
                 map={this.state.map}>
            <Feature coordinates={[currentCoordinate.longitude, currentCoordinate.latitude]} map={this.state.map}/>
          </Layer>
          }
        </Mapbox>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mapReducer: state.mapReducer,
  searchProductNameReducer: state.searchProductNameReducer
});


export default connect(
  mapStateToProps,
)(MapComponent);