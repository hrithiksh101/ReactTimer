const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// The code used above is the basic code using for setting the port no ,  getting the dependicies from node and creating the express instance


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This is the array which stores the timestamps of the timer which i recieve from the react frontend , i've provided one dummy value initially
const array2 = [ { TYPE : 'START' , HOURS : '00' , MINUTES : '00'  , SECONDS : '00' , MILLISECONDS : '00' } ] ;


app.get('/api/hello', (req, res) => {
  res.send([ ...array2 ]);
});

// this function is not used
app.post('/api/world', (req, res) => {
  console.log(array2) ;
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.post( '/api/world2' , (req , res ) => {

    // console.log(req.body) ;

    // In this i've recieved the timestamp from the user and stored into the array2 array.
    array2.push( { TYPE : req.body.post , HOURS : req.body.hours , MINUTES : req.body.minutes  , SECONDS : req.body.seconds , MILLISECONDS : req.body.centiseconds  } ) ;

    // console.log(array2) ;


    // res.send( 'this is the response send *************' ) ;

} )



// this is used for printing the message for the
app.listen(port, () => console.log(`Listening on port ${port}`));