import React, { useEffect, useState, useContext, createContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import './currentTimer.css';

const Clock = () => {
  const [minutes, setminutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setmilliseconds] = useState(0);
  //   const [start, setStart] = useState(true);

  const states = useContext(GlobalContext);

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$this is the changed code

  const [state , setstate] = useState({
      timerOn : false ,
      timerStart : 0 ,
      timerTime : 0
  }) ;
  
  let timer ;

  const startTimer  = () =>{
      setstate( {
          timerOn : true ,
          timerTime : state.timerTime ,
          timerStart : Date.now() - state.timerTime
      })

       timer = setInterval(() => {
        setstate({
          timerTime: Date.now() - state.timerStart
        });
      }, 10);

  }

  const  stopTimer = () => {
    setstate({ timerOn: false });
    clearInterval(timer);
  };

  const  resetTimer = () => {


    setstate({
      timerStart: 0,
      timerTime: 0 
    });
  };

  const { timerTime } = state;
  let centisecondsR = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let secondsR = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutesR = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  let hoursR = ("0" + Math.floor(timerTime / 3600000)).slice(-2);  

  // $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$this is the changed code

  //  let minutes = 0;
  //  let seconds = 0 ;
  //  let milliseconds = 0 ;

  let start2 = true ;

  const { start, setstart } = states;

  const doubleDigit = (digit, count) => {
    let result = digit.toString();

    for (; result.length < count; --count) {
      result = '0' + result;
    }

    return result;
  };

  const calculateDifference = () => {
    if (start2) {
      setmilliseconds((milliseconds) => {
          if( start2 ){

            console.log(start , 'is the current state') ;
        if (milliseconds >= 99) {
          setSeconds((seconds) => {
            if (seconds >= 59) {
              setminutes((minutes) => {
                if (minutes >= 59) {
                  return 0;
                }

                return minutes + 1;
              });

              return 0;
            } else return seconds + 1;
          });
          return 0;
        } else {
          return milliseconds + 1;
        }
      } } );
    }
  };

  const startClock = () => {
    if (start2) {
      calculateDifference();


    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      startClock();
    }, 10);
    return () => {
    //   clearInterval(interval);
    };
  }, []);


    // this is the buttons section **************************************************************************************

    const startButton = (e) => {

        states.setstart((start) => !start);
    
        console.log('start button clicked');
      };
      const stopButton = (e) => {
        setstart( start => {
            console.log('button set to stop' , start) ;
            start2 = false ;
    
            return false ;
        } );
        // start = false ;
        console.log('stop button clicked');
      };
    
      const resetButton = (e) => {
        console.log('reset button clicked');
      };

  return (
    <div>
      <div className="Clock">
        <h2 className="current-timer">
          {' '}
          {`${doubleDigit(minutes, 2)} : ${doubleDigit(
            seconds,
            2
          )} : ${doubleDigit(milliseconds, 2)} `}{' '}
        </h2>
      </div>

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


      <div className="current-timer">

      {hoursR} : {minutesR} : {secondsR} : {centisecondsR}
      </div>

    </div>
  );
};

export default Clock;
