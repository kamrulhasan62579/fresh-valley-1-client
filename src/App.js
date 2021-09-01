import './App.css';
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Header/Home/Home';
import Admin from './components/Admin/Admin';
import Notfound from './components/Notfound/Notfound';
import Header from './components/Header/Header';


function App() {
  return (
      <Router>
        <Header></Header>
          <Switch>
              <Route path="/home">
                 <Home></Home>
              </Route>
              <Route path="/admin">
                 <Admin></Admin>
                 </Route>
              <Route exact path="/">
                 <Notfound></Notfound>
               </Route>
          </Switch>
      </Router>
  );
}

export default App;
