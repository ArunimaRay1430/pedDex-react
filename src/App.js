import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Tabel from './components/tabel/Tabel';
import Relays from './pages/Relays';
import Create from './pages/Create';
import Create2 from './pages/Create2';
import Create3 from './pages/Create3';
import Convert from './pages/Convert';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Create4 from './pages/Create4';

class App extends Component {
  constructor(){
    super();
      this.state={
      }
  }
  
 componentWillMount = () => {
 }
 
  
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Tabel} />
          <Route path="/Relays" component={Relays} />
          <Route path="/Create/1" component={Create} />
          <Route path="/Create/2" component={Create2} />
          <Route path="/Create/3" component={Create3} />
          <Route path="/Create/4" component={Create4} />
          <Route path="/Convert/" component={Convert}/>
         </div> 
      </Router>
    );
  }
}

export default App;


