import React, { Component } from 'react';
import './Map.css';

class Map extends Component {

   constructor(props) {
     super(props);
     this.agencies = [];
     this.markers = [];
     this.addresses = {};
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

    if (this.props.addressA || this.props.addressB) {

      let infoWindow;

      this.bounds = new google.maps.LatLngBounds();

      for (let id in this.props) {

        if (this.props[id]) {
          if (this.addresses[id]) this.addresses[id].setMap(null);

          this.addresses[id] = new google.maps.Marker({
            map: this.map,
            title: this.props[id].formatted_address,
            animation: google.maps.Animation.DROP,
            position: this.props[id].geometry.location
          });

          this[`info${id}`] = new google.maps.InfoWindow({
            content: this.props[id].formatted_address
          });

          this.addresses[id].addListener('mouseover', (ev) => {
            this[`info${id}`].open(this.map, this.addresses[id]);
          });

          this.addresses[id].addListener('mouseout', (ev) => {
            this[`info${id}`].close();
          });

          this.bounds.extend(this.addresses[id].position);
          this.map.fitBounds(this.bounds);
        }

      }

    }

  }

  searchNearby(address) {
    return new Promise((resolve, reject) => {
      this.places.nearbySearch({
        location: address.position,
        radius: 16093.4,
        type: ['real_estate_agency']
      }, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      });
    });
  }

  runSearch() {

    const promises = [
      this.searchNearby(this.addresses.addressA),
      this.searchNearby(this.addresses.addressB)
    ];

    Promise.all(promises).then(data => {
      this.agencies = data[0].concat(data[1]);
      this.markers = this.agencies.map(agency => {
        return new google.maps.Marker({
          map: this.map,
          position: agency.geometry.location
        });
      });
    });
    
  }

  render() {
    return (
      <div className="Map" ref={(div) => { this.container = div; }}>
      </div>
    );
  }
}

export default Map;
