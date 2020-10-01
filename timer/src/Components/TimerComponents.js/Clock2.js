import React, { Component } from "react";


class Clock2 extends Component {

  // For The Clock component only i've used react class based component because when i was using functional component 
  // updating the state of timer using use state method was asynchrous and was unable the update time every milliseconds
  // for this i've choosen class based component as updating state is faster in this scenario and clock is working without any glitches

  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  // initially i've choosen the following state and variable themself define the what is means.


  // the funtion is executed when the user presses the start button
  startTimer = ( TYPE , hours , minutes , seconds , centiseconds) => {
    
    // at this stage we are sending request to our backend to store the data that the timer is started
    this.apiPost(TYPE , hours , minutes , seconds , centiseconds  ) ;  
    
    // setting the timer as on and seleting the value for timeStart
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });

    // i've used the set interval method so that the data for the clock is being updated every milliseconds ( as 1000 = 1 second so 10 = 1ms )
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart
        // every 1ms i'm updating the timerTime
      });
    }, 10);
  };


  // when the stop button is pressed then this command is executed and it stops the timer
  stopTimer = (hours , minutes , seconds , centiseconds) => {

    // At this stage i'm sending the request as the stop button is pressed so , to store the response

    this.apiPost('STOP' , hours , minutes , seconds , centiseconds  ) ;    
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  // This is executed when the user press the reset timer button and it 
  // sends the data of timer to our backend node and also reset the timer to initial values.
  resetTimer = (hours , minutes , seconds , centiseconds) => {


    this.apiPost('RESET' , hours , minutes , seconds , centiseconds  ) ;
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };


  // This is asynchronous function and it is responsible for sending post request of the 
  // timestamp of the clock to our server node js in the backend
  apiPost = async ( REQUEST , hours , minutes , seconds , centiseconds ) => {


    console.log ( REQUEST ,  hours , minutes , seconds , centiseconds) ;    

   // The data i'm sending the to the server include action(request) , hours , minutes , seconds and centiseconds .


    const response = await fetch('/api/world2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: REQUEST , hours , minutes , seconds , centiseconds }),
    });
    // const body = await response.text();
    // This code was used for testing purposes , for seeing whether i'm able to recieve the data


  }

  render() {
    const { timerTime } = this.state;

    // i'm fetching the current time of the timer from the state

    let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
    let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    // this the logic for converting the current time to hours , minutes and seconds , etc .

    // In this stage i'm just showing the buttons according to condition whether the clock is running or not 
    // also i've attached buttons to functions in the code shown below.
    return (
      <div className="Stopwatch">
        <div className="Stopwatch-display">
          {hours} : {minutes} : {seconds} : {centiseconds}
        </div>
        {this.state.timerOn === false && this.state.timerTime === 0 && (
          <button onClick={() => this.startTimer('START' ,hours,minutes , seconds , centiseconds)}>Start</button>
        )}
        {this.state.timerOn === true && (
          <button onClick={ () => this.stopTimer(hours,minutes , seconds , centiseconds)}>Stop</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={ () => this.startTimer( 'RESUME' ,hours,minutes , seconds , centiseconds)}>Resume</button>
        )}
        {this.state.timerOn === false && this.state.timerTime > 0 && (
          <button onClick={() => this.resetTimer(hours,minutes , seconds , centiseconds)}>Reset</button>
        )}
      </div>
    );
  }
}

export default Clock2;