import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

  componentDidMount() {

    const _this = this;

    this.addressA = null;
    this.addressB = null;

    this.inputA = new google.maps.places.Autocomplete(this.inputA, {
      types: ['address']
    });

    this.inputB = new google.maps.places.Autocomplete(this.inputB, {
      types: ['address']
    });

    this.inputA.addListener('place_changed', function() {
      _this.updateAddress({
        id: 'addressA',
        place: this.getPlace()
      })
      _this.props.updateAddress(_this.addressA, _this.addressB);
    });

    this.inputB.addListener('place_changed', function() {

      _this.updateAddress({
        id: 'addressB',
        place: this.getPlace()
      });
      _this.props.updateAddress(_this.addressA, _this.addressB);
    });

  }

  updateAddress(address) {
    if (address.id === 'addressA') {
      this.addressA = address.place;
    } else {
      this.addressB = address.place;
    }
  }

  submit(ev) {
    if (this.addressA && this.addressB) {
      this.props.runSearch();
      this.addressA = null;
      this.addressB = null;
      this.inputA.value = null;
      this.inputB.value = null;
    }
    ev.preventDefault();
  }

  render() {
    return (
      <div className="Search">
        <form onSubmit={ev => this.submit(ev)}>
          <input
            type="text"
            name="inputA"
            placeholder="Address A"
            ref={(input) => { this.inputA = input; }} />
          <input
            type="text"
            name="inputB"
            placeholder="Address B"
            ref={(input) => { this.inputB = input; }} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Search;
