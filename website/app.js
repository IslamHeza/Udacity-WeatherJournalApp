// Personal API Key for OpenWeatherMap API

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */


/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();

let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const apiKey = 'c82a5d14faeb5a13eebb09d0826639ec' ;
const baseApi = 'https://api.openweathermap.org/data/2.5/weather?zip=' ;

document.getElementById('generate').addEventListener('click', performActon);

function performActon (){
    let zipCode = document.getElementById('zip').value ;
    let feelings = document.getElementById('feelings').value ;
    
    getWeatherData ( zipCode ).then((data)=>{
        postData('http://localhost:3000/add' , {date:newDate , temp : data.main.temp , content:feelings});
        updateUI();
    });
}


// Async GET
const getWeatherData = async (zip)=>{
  const res = await fetch(`${baseApi}${zip}&appid=${apiKey}`);

  try {
  // Transform into JSON
  const data = await res.json()
  console.log(data);
  return data ;
  }
  catch(error) {
    console.log("error", error);
  }
};

// TODO-Chain your async functions to post an weather then GET the resulting data
// Async POST
const postData = async ( url = '' , data = {} )=>{
    console.log(url , data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
};

//function to update the UI after getting data from the server
const updateUI = async () => {
    const request = await fetch('http://localhost:3000/getData') ;
    try {
        const data = await request.json();
        document.getElementById('date').innerText = `Date : ${data.date}`;
        document.getElementById('temp').innerText = `Temp : ${data.temp}`;
        document.getElementById('content').innerText = `Your Feelings is  : ${data.content}`;
      }catch(error) {
      console.log("error", error);
      }
  
}