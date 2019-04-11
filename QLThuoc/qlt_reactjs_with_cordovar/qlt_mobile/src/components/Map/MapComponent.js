import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactMapboxGl, {Layer, Feature} from "react-mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

const Map = ReactMapboxGl({
  accessToken: accessToken
});
const directions =new Directions({
  accessToken: accessToken,
  unit: 'metric',
  profile: 'mapbox/cycling',
  congestion: true,
});
class MapComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      map: {}
    }
  }
  componentWillMount() {
  }
  onStyleLoad = (map) => {
    const {currentCoordinate} = this.props.mapReducer;
    const {branchSelected} = this.props.searchProductNameReducer;
    directions.setOrigin([currentCoordinate.longitude, currentCoordinate.latitude]);
    directions.getDestination([branchSelected.longitude, branchSelected.latitude]);
    map.addControl(directions, 'top-left');
    this.setState({
      map: map
    });
    console.log(this.state.map);
  };

  render() {
    const {currentCoordinate} = this.props.mapReducer;
    if (currentCoordinate.longitude)
      return (
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={[currentCoordinate.longitude, currentCoordinate.latitude]}
          zoom={[14]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onStyleLoad={this.onStyleLoad}
        >
          <Layer
            type="circle"
            paint={{
            'circle-color': "#1a1aff",
            'circle-stroke-width': 8,
            'circle-stroke-color': '#fff',
            'circle-stroke-opacity': 0.9,
            "circle-radius": {
              "stops": [
                [0, 0],
                [16, 40]
              ],
              "base": 2
            },
            "circle-opacity": 0.5,
          }}>
            <Feature coordinates={[currentCoordinate.longitude, currentCoordinate.latitude]}/>
          </Layer>
        </Map>
      );
    else return null;
  }
}

const mapStateToProps = (state) => ({
  mapReducer: state.mapReducer,
  searchProductNameReducer: state.searchProductNameReducer
});
export default connect(
  mapStateToProps,
)(MapComponent);