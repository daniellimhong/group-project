import React, {Component} from 'react';
import {Route, Switch, NavLink} from 'react-router-dom';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import SearchCar from './Components/SearchCar/SearchCar';
import Register from './Components/Register/Register';
import NewListing from './Components/NewListing/NewListing'
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
          <Route path="/register" component={Register}/>
          <Route path="/newlisting" component={NewListing}/>
          {/* <Route path="/sellcar" component={SellCar}/> */}
          {/* <Route path="/forsale" component={ForSale}/> */}
          {/* <Route path="/yourlisting" component={YourListing}/> */}
          {/* <Route path="/contact" component={Contact}/> */}
          {/* <Route path="profile" component={Profile}/> */}
           
        </Switch>
      </div>

     >

      </div>
    );
  }
  
}

export default App;
