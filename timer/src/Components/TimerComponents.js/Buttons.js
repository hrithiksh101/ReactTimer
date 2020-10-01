import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import './Buttons.css';

const Buttons = () => {
  const states = useContext(GlobalContext);

  let { start, setstart } = states;

  const startButton = (e) => {

    states.setstart((start) => !start);

    console.log('start button clicked');
  };
  const stopButton = (e) => {
    setstart( start => {
        console.log('button set to stop' , start) ;

        return false ;
    } );
    // start = false ;
    console.log('stop button clicked');
  };

  const resetButton = (e) => {
    console.log('reset button clicked');
  };

  return (
    <div className="button-line">
      <button onClick={startButton} className="single-button">
        Start
      </button>
      <button onClick={stopButton} className="single-button">
        Stop
      </button>
      <button onClick={resetButton} className="single-button">
        Reset
      </button>
    </div>
  );
};

export default Buttons;
