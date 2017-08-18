import React, { Component } from 'react';
import './Map.css';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    this.map = new google.maps.Map(this.container, {
      center: {lat: 30.2729, lng: -97.7444},
      zoom: 8
    });

    this.bounds = new google.maps.LatLngBounds();

    this.places = new google.maps.places.PlacesService(this.map);


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
      this.map.setCenter({
        lat: 30.2729,
        lng: -97.7444
      });
    }

  }

  componentDidUpdate() {

    let infoWindow;

    if (this.props.addressA || this.props.addressB) {
      this.bounds = new google.maps.LatLngBounds();
    }

    for (let id in this.props) {

      if (this.props[id]) {
        if (this[id]) this[id].setMap(null);

        this[id] = new google.maps.Marker({
          map: this.map,
          title: this.props[id].formatted_address,
          position: this.props[id].geometry.location
        });

        this[`info${id}`] = new google.maps.InfoWindow({
          content: this.props[id].formatted_address
        });

        this[id].addListener('mouseover', (ev) => {
          this[`info${id}`].open(this.map, this[id]);
        });

        this[id].addListener('mouseout', (ev) => {
          this[`info${id}`].close();
        });

        this.bounds.extend(this[id].position);
        this.map.fitBounds(this.bounds);
      }

    }

    this.places.nearbySearch({
      location: this.map.getCenter(),
      radius: 16093.4,
      type: ['real_estate_agency']
    }, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        console.log(results);
      }
    });

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
