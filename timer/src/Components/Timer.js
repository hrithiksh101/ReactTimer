import React, { useContext , createContext } from 'react'
import { GlobalContext } from './GlobalContext/GlobalContext';
import Buttons from './TimerComponents.js/Buttons'
import Clock from './TimerComponents.js/Clock';



const Timer = () => {


    const start = useContext(GlobalContext) ;

    console.log(' this is the start ' , start ) ;

      
    return (
        <div>
         
         <Clock />
         {/* <Buttons /> */}
            
        </div>
    )
}

export default Timer ;
