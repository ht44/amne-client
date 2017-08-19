import React, { Component } from 'react';
import Map from '../Map/Map';
import Search from '../Search/Search';
import Display from '../Display/Display';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressA: null,
      addressB: null,
      results: []
    };
    this.updateAddress = this.updateAddress.bind(this);
    this.runSearch = this.runSearch.bind(this);
    this.broadcastResults = this.broadcastResults.bind(this);
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

  broadcastResults(agencies) {
    this.setState({results: this.mergeSort(agencies)});
  }

  mergeSort(arr) {
    let left, right;
    if (arr.length < 2) return arr;
    left = [];
    right = [];
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length / 2) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    left = this.mergeSort(left);
    right = this.mergeSort(right);
    return this.merge(left, right);
  }

  merge(left, right) {
    let result = [],
        i = 0,
        j = 0;
    while (i < left.length && j < right.length) {
      if (left[i].sumDistance <= right[j].sumDistance) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    while (i < left.length) {
      result.push(left[i]);
      i++;
    }
    while (j < right.length) {
      result.push(right[j]);
      j++
    }
    return result;
  }

  render() {
    return (
      <div className="App">
        <div className="controller">
          <Search
            runSearch={this.runSearch}
            updateAddress={this.updateAddress}/>
          <Map
            ref={instance => { this.map = instance; }}
            addressA={this.state.addressA}
            addressB={this.state.addressB}
            broadcastResults={this.broadcastResults} />
        </div>
        <Display results={this.state.results}/>
      </div>
    );
  }
}

export default App;
