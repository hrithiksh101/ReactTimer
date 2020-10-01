import React from 'react';
import { Link } from 'react-router-dom';

const Options = () => {

    // this component is used for setting the options Between the clock and the timer
  return (
    <div className="options">
      <ul>
        <Link to="./Clock2">Timer</Link>
        <Link to="./History">History</Link>
      </ul>
    </div>
  );
};

export default Options;
