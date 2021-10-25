import './App.css';
import React, { createContext, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Admin from './components/Admin/Admin';
import Notfound from './components/Notfound/Notfound';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Review from './components/Review/Review';
import CheakOut from './components/CheakOut/CheakOut';
import OrderList from './components/OrderList/OrderList';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
     <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
        <Header></Header>
          <Switch>
              <Route path="/home">
                 <Home></Home>
              </Route>
              <Route path="/admin">
                 <Admin></Admin>
                 </Route>
                 <Route path="/login">
                 <Login></Login>
                 </Route>
                 <PrivateRoute path="/review">
                 <Review></Review>
                 </PrivateRoute>
                 <PrivateRoute path="/cheakOut">
                 <CheakOut></CheakOut>
                 </PrivateRoute>
                 <PrivateRoute path="/orderList">
                 <OrderList></OrderList>
                 </PrivateRoute>
                 <Route exact  path="/">
                 <Home></Home>
               </Route>
                <Route  path="*">
                 <Notfound></Notfound>
               </Route>
          </Switch>
      </Router>
     </UserContext.Provider>
  );
}

export default App;
