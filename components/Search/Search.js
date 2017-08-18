import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    const _this = this;

    this.inputA = new google.maps.places.Autocomplete(this.inputA, {
      types: ['address']
    });

    this.inputB = new google.maps.places.Autocomplete(this.inputB, {
      types: ['address']
    });

    this.inputA.addListener('place_changed', function() {
      _this.props.updateAddress({
        id: 'addressA',
        place: this.getPlace()
      })
    });

    this.inputB.addListener('place_changed', function() {
      _this.props.updateAddress({
        id: 'addressB',
        place: this.getPlace()
      });
    });

  }

  handleSubmit(ev) {
    console.log('submitteddd');
    ev.preventDefault();
  }
  render() {
    return (
      <div className="Search">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="inputA"
            placeholder="Address A"
            ref={(input) => { this.inputA = input; }}
            onChange={this.handleChange} />
          <input
            type="text"
            name="inputB"
            placeholder="Address B"
            ref={(input) => { this.inputB = input; }}
            onChange={this.handleChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Search;
