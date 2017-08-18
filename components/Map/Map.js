import React, { Component } from 'react';
import './Map.css';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    this.map = new google.maps.Map(this.container, {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    this.bounds = new google.maps.LatLngBounds();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.map.setCenter(pos);
      }, () => {
        console.log(this.map.getCenter());
      });
    } else {
      console.log('no geolocation');
    }

  }

  componentDidUpdate() {

    this.bounds = new google.maps.LatLngBounds();

    const {addressA, addressB} = this.props;

    if (addressA) {

      if (this.markerA) this.markerA.setMap(null);

      this.markerA = new google.maps.Marker({
        map: this.map,
        title: addressA.formatted_address,
        position: addressA.geometry.location
      });

      this.bounds.extend(this.markerA.position);
      this.map.fitBounds(this.bounds);
    }

    if (addressB) {

      if (this.markerB) this.markerB.setMap(null);

      this.markerB = new google.maps.Marker({
        map: this.map,
        title: addressB.formatted_address,
        position: addressB.geometry.location
      });

      this.bounds.extend(this.markerB.position);
      this.map.fitBounds(this.bounds);
    }

  }

  render() {
    return (
      <div className="Map"
        ref={(div) => { this.container = div; }} >
      </div>
    );
  }
}

export default Map;
