import React, { Component } from 'react';
import './Display.css';

class Display extends Component {

  metersToMiles(value) {
    return (value * 0.000621371).toFixed(1);
  }


  render() {
    const results = this.props.results.map(result =>
      <li key={result.place_id}>
        <a href={result.website} target="_blank">
          {result.name}
        </a>: {this.metersToMiles(result.sumDistance)} mi
      </li>
    );
    return (
      <div className="Display">
        <ol>{results}</ol>
      </div>
    );
  }
}

export default Display;
