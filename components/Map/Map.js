import React, { Component } from 'react';
import './Map.css';

class Map extends Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.container, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  render() {
    return (
      <div className="Map"
        ref={(div) => { this.container = div; }} >
      </div>
    )
  }
}

export default Map;
