import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';

function DisplayZip(props){
  return <div >{props.display()}</div>
}

function CitySearchField(props){
  return (
            <div>
              This is the CitySearchField
              <form>
                <label>
                  City:
                        {/* (console.log(event.target.value)) */}
                  <input type="text" value={props.cityValue} onChange={props.cityChanged} />
                </label>
              </form>
             </div>
          )
}


class App extends Component {

  state = {
    userInputValue: "",
    zipCodes:[],
    stateNames:[],
    //stateName: "",
    lat: [],
    long: [],
    population: [],
    totalWages: [],
    cityArray: [],
    stateInfo:[],
    commonNames:[],
  };


  display(event) {

    let card = []



    if (this.state.zipCodes.length >= 1) {
      for (let i = 0; i < this.state.zipCodes.length; i++) {
        
  

        card.push(
          <div class="info" key={this.state.zipCodes[i]}>
            <p>ZipCode: {this.state.zipCodes[i]} State: {this.state.stateNames[i]} </p>
            <p>Location: {this.state.lat[i]}, {this.state.long[i]}</p>
            <p>Population: {this.state.population[i]}</p>
            <p>Total Wages: {this.state.totalWages[i]}</p>
            <p>Common Names: {this.state.commonNames[i]}</p>
            <br></br>
          </div>
            )
          
      }
    }
    else if(this.state.userInputValue===""){
      card.push(<div key="Empty">No Results</div>)
    }

    return card;
  };

  getCity(event) {

    if(event.target.value.length===0){
      this.setState({
        userInputValue: "",
         zipCodes: [],
        stateNames: [],
        //stateName: "",
        lat: [],
        long: [],
        population: [],
        totalWages: [],
        cityArray: [],
        stateInfo: [],
        commonNames: [],
      })
    }else{
    this.setState({
      userInputValue: event.target.value
    })
  }

    fetch("https://ctp-zip-api.herokuapp.com/city/" + event.target.value.toUpperCase())
      .then(response => response.json())
      .then(jsonData => {

       
        
        let list = [];
        let stateList=[];
        let population =[];
        let lat=[];
        let long= [];
        let totalWages= [];
        let commonNames=[];
         console.log(jsonData.length+"CHECKING LENGTH");
       
          for (let i = 0; i < jsonData.length; i++) {
            console.log(jsonData[i]+"CHECK DATA BEFORE PUSH");

            list.push(jsonData[i]);
            

            fetch("https://ctp-zip-api.herokuapp.com/zip/"+jsonData[i])
            .then(response => response.json())
            .then(jsonData => {

              let cityNames = [];
              for (let i = 0; i < jsonData.length; i++) {
                cityNames.push(jsonData[i].City+", ");
                
              }
              console.log(cityNames);
              commonNames.push(cityNames);
              stateList.push(jsonData[0].State);
              population.push(jsonData[0].EstimatedPopulation);
              lat.push(jsonData[0].Lat);
              long.push(jsonData[0].Long);
              totalWages.push(jsonData[0].TotalWages);

              

            

                this.setState({

                  lat: lat,
                  long: long,
                  population: population,
                  totalWages: totalWages,
                  stateNames: stateList,
                  commonNames: commonNames,
                  

                })
            }).catch(error => console.log(error));
          }
       
          this.setState({
            zipCodes: list,
          });

        
        
      }).catch(error => console.log(error));

      

  };

   
    
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField cityChanged={(e) => this.getCity(e)} cityValue={this.state.userInputValue} />
        <div>

          <DisplayZip display={(e) => this.display(e)} />

        </div>
      </div>
    );
  }
}

export default App;
