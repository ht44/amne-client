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
        <div>
          <h1>Welcome!</h1>
          <p>Enter two addresses and hit 'Run Search' for a list of nearby agencies.</p>
          <p>Results will render on the map, and will be sorted below by ascending sum distance.</p>
          <p>If a result is not hyperlinked, that means that the business listing on Google didn't have a website URL.</p>
        </div>
        <ol>{results}</ol>
      </div>
    );
  }
}

export default Display;
