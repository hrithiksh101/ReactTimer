import React , {  useEffect } from 'react';

const History = () => {



    // In this component i'm basically just fetching the data from the node js backend and displaying it in the form of table
   // This function is used for creating the row for the table of timestamps
    const createRow = (body , i) => {

        console.log(body) ;

        var table = document.getElementById("myTable");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML =  body[i].TYPE ;
        cell2.innerHTML =  body[i].HOURS ;        
        cell3.innerHTML =  body[i].MINUTES ;
        cell4.innerHTML =  body[i].SECONDS ;    
        cell5.innerHTML =  body[i].MILLISECONDS ;    

        // here i'm setting up all the values for the fields in the table here data is fetched from the node js backend


    }

    const createTable = (body) => {

         
        console.log(body)
         

        if( body ){

            for( let i = 0 ; i<body.length ; i++ ){

                // calling the create row function for creating each of the indivisual row for create table
                createRow( body , i ) ;

            }

        }


    }
    
    // body array for storing the data from the api
    let body = [] ;
    const getData = async() =>{

        // here i'm fetching the data from the nodejs backend consiting of timestamps
        const response = await fetch('/api/hello');
        body = await response.json();

        if (response.status !== 200) throw Error(body.message);
        else {
            // if there is no error with the response then here i'm just calling the function to create table
            createTable(body) ;
        }


         createTable(body) ;

        return ;

    }


     
    // use effect hook is used to run the get data function to fetch the data from
    // node js backend as soon as data is fetched the table is created 
    useEffect( ()=>{
        
        getData() ;

    } , [body] )

      // filling up some dummy values in the table so the table doesnot look empty 

  return (
    <table className = "history-table"  >
      <thead>
        <tr>
          <th>Action</th>
          <th>Hours</th>
          <th>Minutes</th>
          <th>Seconds</th>
          <th>Milliseconds</th>
        </tr>
      </thead>


      <tbody id ="myTable" >
        <tr>
          <td>Start</td>
          <td>00</td>
          <td>00</td>
          <td>00</td>
          <td>00</td>
        </tr>
      </tbody>
    </table>
  );
};

export default History;
