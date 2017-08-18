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

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.addressA !== this.props.addressA ||
      nextProps.addressB !== this.props.addressB
    ) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate() {

    let infoWindow,

    props = {
      addressA: this.props.addressA,
      addressB: this.props.addressB
    }
    console.log(props);
    this.bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
    this.agencies = [];

    for (let id in props) {

      if (props[id]) {
        if (this.addresses[id]) this.addresses[id].setMap(null);

        this.addresses[id] = new google.maps.Marker({
          map: this.map,
          title: props[id].formatted_address,
          animation: google.maps.Animation.DROP,
          position: props[id].geometry.location
        });

        this[`info${id}`] = new google.maps.InfoWindow({
          content: props[id].formatted_address
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

  searchNearby(address) {
    return new Promise((resolve, reject) => {
      this.places.nearbySearch({
        location: address.position,
        radius: 16093.4,
        type: ['real_estate_agency']
      }, (results, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          results.forEach(result => {
            result.sumDistance = 0;
            for (let address in this.addresses) {
              result.sumDistance += google.maps
                                          .geometry
                                          .spherical
                                          .computeDistanceBetween(
                                            this.addresses[address].position,
                                            result.geometry.location
                                          );
            }
          });
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
      this.markers = this.agencies.map((agency, index) => {
        this.bounds.extend(agency.geometry.location);
        let infoWindow = new google.maps.InfoWindow({
          content: agency.name
        });
        let marker = new google.maps.Marker({
          map: this.map,
          icon: '/home.png',
          position: agency.geometry.location
        });
        marker.addListener('mouseover', ev => {
          infoWindow.open(this.map, marker);
        });
        marker.addListener('mouseout', ev => {
          infoWindow.close();
        });
        return marker;
      });
      this.map.fitBounds(this.bounds);
      this.props.broadcastResults(this.agencies);
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
