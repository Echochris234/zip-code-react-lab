import React, { Component } from 'react';
import './App.css';


function City(props) {
  return <div>{props.display()}</div>


}
  // (<div>This is the City component {props.display}</div>);
      
  
  
  

function ZipSearchField(props) {
  return (<div>This is the ZipSearchField component

            <form>
              <label>
                Zipcode:
                {/* (console.log(event.target.value)) */}
            <input type="text" value={ props.zipValue } onChange={props.zipChanged} />
              </label> 
            </form>

         </div>);
}
// create an array of <City /> elements,

class App extends Component {  

  state = {
      userInputValue: "",
      stateName: "",
      lat: "",
      long: "",
      population: "",
      totalWages: "", 
      cityArray: [],
  };


  display(event){
    console.log("IN DISPLAY");
    let card=[]


    if(this.state.cityArray.length>=1){
       for (let i = 0; i < this.state.cityArray.length; i++) {
   
         card.push(
            <div key={this.state.cityArray[i]}>
              <h1>{this.state.cityArray[i]}, {this.state.stateName}</h1>
                <ul>
                  <li> State: {this.state.stateName}</li>
                  <li>Location: ({this.state.lat}, {this.state.long}) </li>
                  <li>Population(estimated): {this.state.population} </li>
                  <li>Total Wages: {this.state.totalWages} </li>
                </ul>
            </div>)
          // card.push(returnvalue)
       }
    }
    
    

      return card; 
  }

    getZip(event){

        console.log(event.target.value)
      this.setState({
        userInputValue: event.target.value
      })
        
      fetch("https://ctp-zip-api.herokuapp.com/zip/"+event.target.value)
      .then(response => response.json())
      .then(jsonData => {
        
        console.log(jsonData)

          // for Loop loads multiple city names
          let list = []; 
        console.log(jsonData.length);
          if(jsonData.length>1){
            for (let i = 0; i < jsonData.length; i++) {
               // console.log(jsonData[i].City);
                list.push(jsonData[i].City);
                // console.log("Hello from the loop")
            }
          }else{
            list.push(jsonData[0].City);
            // console.log("from the else");

          }

          
           this.setState({
             cityArray : list,
             stateName: jsonData[0].State,
             population: jsonData[0].EstimatedPopulation,
             lat: jsonData[0].Lat,
             long: jsonData[0].Long,
             totalWages: jsonData[0].TotalWages,
             
             });
             
       

          
      }).catch(error=>console.log(error));

     
     
    };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField zipChanged={(e)=>this.getZip(e)} zipValue={this.state.userInputValue} />
        <div>
          
          <City  display={(e) => this.display(e) } />
          {/* <City /> */}
        </div>
      </div>
    );
  }
}

export default App;
