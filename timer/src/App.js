import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import History from './Components/History';
import Options from './Components/Options';
import Clock2 from './Components/TimerComponents.js/Clock2';

function App() {


  return (


    // I've used browserRouter and Route just to have smooth transition between history and stopwatch page 
    // This is the basic setup of the application
      <BrowserRouter>
        <div className="App">
          <Header />
          <Options  />
          <Route path="/History" component={History} />
          <Route path="/Clock2" component={Clock2} />
        </div>
      </BrowserRouter>

  );
}

export default App;
