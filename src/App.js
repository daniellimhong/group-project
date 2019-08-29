import React, {Component} from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import SearchCar from './Components/SearchCar/SearchCar';
import Register from './Components/Register/Register';
import SellCar from "./Components/SellCar/SellCar";
import ForSale from './Components/ForSale/ForSale';
import YourListing from './Components/YourListing/YourListing';
import Contact from './Components/Contact/Contact';
import Profile from './Components/Profile/Profile';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div>
      <div className="App">
        
        <Switch>
          <Route exact path="/" component={Home}/> 
          {/* {/* <Route path="/SearchCar" component={SearchCar}/> */}
          <Route path="/Register" component={Register}/>
          {/* <Route path="/SellCar" component={SellCar}/> */}
          {/* <Route path="/ForSale" component={ForSale}/> */}
          {/* <Route path="/YourListing" component={YourListing}/> */}
          {/* <Route path="/Contact" component={Contact}/> */}
          {/* <Route path="Profile" component={Profile}/> */} */} */}
        </Switch>
      </div>

     >

      </div>
    );
  }
  
}

export default App;
