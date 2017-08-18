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
    this.runSearch = this.runSearch.bind(this);
  }

  updateAddress(address) {
    if (address.id === 'addressA') {
      this.setState({addressA: address.place});
    } else {
      this.setState({addressB: address.place});
    }
  }

  runSearch(ev) {
    if (this.state.addressA && this.state.addressB) {
      this.map.runSearch();
    }
    ev.preventDefault();
  }


  render() {
    return (
      <div className="App">
        <Search
          runSearch={this.runSearch}
          updateAddress={this.updateAddress}/>
        <Map
          ref={instance => { this.map = instance; }}
          addressA={this.state.addressA}
          addressB={this.state.addressB} />
      </div>
    );
  }
}

export default App;
