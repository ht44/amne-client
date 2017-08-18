import React, { Component } from 'react';
import './Display.css';

class Display extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   sorted: []
    // }
  }

  // componentWillRecieveProps() {
  //   this.setState({sorted: this.mergeSort(this.props.results)});
  // }

  metersToMiles(value) {
    return (value * 0.000621371).toFixed(1);
  }


  render() {
    const results = this.props.results.map(result =>
      <li>
        {result.name}: {this.metersToMiles(result.sumDistance)} mi
      </li>
    );
    return (
      <div className="Display">
        <ol>{results}</ol>
      </div>
    );
  }
}

export default Display
