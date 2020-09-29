import React,{Component} from 'react';
// import logo from './logo.svg';
import './App.css';

function DisplayZip(props){
  return <div>{props.display()}</div>
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
    // stateName: "",
    // lat: "",
    // long: "",
    // population: "",
    // totalWages: "",
    //  cityArray: [],
  };


  display(event) {
    // console.log("IN DISPLAY");
    let card = []


    if (this.state.zipCodes.length >= 1) {
      for (let i = 0; i < this.state.zipCodes.length; i++) {
       

        card.push(
          <div key={this.state.zipCodes[i]}>
            <p>ZipCode: {this.state.zipCodes[i]} State: {this.state.stateNames[i]} </p>
          </div>)
      }
    }
    else if(this.state.userInputValue===""){
      card.push(<div>No Results</div>)
    }

    return card;
  };

  getCity(event) {

    if(event.target.value.length===0){
      this.setState({
        userInputValue: ""
      })
    }else{
    this.setState({
      userInputValue: event.target.value
    })
  }

    fetch("https://ctp-zip-api.herokuapp.com/city/" + event.target.value.toUpperCase())
      .then(response => response.json())
      .then(jsonData => {

        // console.log(jsonData)

        // for Loop loads multiple city names
        let list = [];
        // let cityNamePerZip=[];
        let stateList=[];
        // console.log(jsonData.length);
       
          for (let i = 0; i < jsonData.length; i++) {
            // console.log(jsonData[i].City);

            list.push(jsonData[i]);

            fetch("https://ctp-zip-api.herokuapp.com/zip/"+jsonData[i])
            .then(response => response.json())
            .then(jsonData => {

              // for (let i = 0; i < jsonData.length; i++) {
              //   // console.log(jsonData[i].City);
              //   cityNamePerZip.push(jsonData[i].City);
              //   console.log(jsonData[i].City+"Hello")
              // }
              // list.push(cityNamePerZip);

              stateList.push(jsonData[0].State)
                this.setState({
                    stateNames: stateList,
                    // cityArray: list,

                })
            }).catch(error => console.log(error));
            // console.log("Hello from the loop")
          }
          // console.log("from the else");
          this.setState({
            zipCodes: list,
          });

        // console.log(this.state.zipCodes);
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
