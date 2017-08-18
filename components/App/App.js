import React, { Component } from 'react';
import Map from '../Map/Map';
import Search from '../Search/Search';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressA: null,
      addressB: null
    }
    this.updateAddress = this.updateAddress.bind(this);
  }

  updateAddress(address) {
    if (address.id === 'addressA') {
      this.setState({addressA: address.place});
    } else {
      this.setState({addressB: address.place});
    }
  }
  render() {
    return (
      <div className="App">
        <Search updateAddress={this.updateAddress}/>
        <Map
          addressA={this.state.addressA}
          addressB={this.state.addressB} />
      </div>
    );
  }
}

export default App;
