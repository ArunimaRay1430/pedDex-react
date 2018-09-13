import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/Header';
import Table from './components/table/Table';
import Relays from './pages/Relays';
import Create from './pages/Create';
import Create2 from './pages/Create2';

import relayCreate from './pages/relayCreate';
import relayCreate2 from './pages/relayCreate2';
import relayCreate3 from './pages/relayCreate3';
import relayCreate4 from './pages/relayCreate4';
import Convert from './pages/Convert';
import RelayConvert from './pages/RelayConvert';
import RelayTransfer from './pages/RelayTransfer';
import Transfer from './pages/Transfer';



import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Create4 from './pages/Create4';

class App extends Component {
  constructor(){
    super();
      this.state={
      }
  }
  render() {
    return (
      <Router>
        <div>
          <Header/>
          <Route exact path="/" component={Table} />
          <Route path="/Relays" component={Relays} />
          <Route path="/Create/1" component={Create} />
          <Route path="/Create/2" component={Create2} />
          <Route path="/Create/4" component={Create4} />
          <Route path="/relayCreate/1" component={relayCreate} />
          <Route path="/relayCreate/2" component={relayCreate2} />
          <Route path="/relayCreate/3" component={relayCreate3} />
          <Route path="/relayCreate/4" component={relayCreate4} />
          <Route path="/Convert/" component={Convert}/>
          <Route path="/RelayConvert/" component={RelayConvert}/>
          <Route path="/RelayTransfer/" component={RelayTransfer}/>
          <Route path="/Transfer/" component={Transfer}/>
         </div> 
      </Router>
    );
  }
}

export default App;


