
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import Error from './components/Error/Error';
import PdDetail from './components/PdDetail/PdDetail';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser ]= useState({})
  return (
   <UserContext.Provider value={[loggedInUser, setLoggedInUser ]}>
     <h1>Email: {loggedInUser.email}</h1>
      
     <Router>
     <Header></Header>
       <Switch>
         <Route path="/shop">
         <Shop></Shop>
         </Route>
         <Route path="/review">
           <Review></Review>
         </Route>
         <PrivateRoute path="/manage">
           <Inventory></Inventory>
         </PrivateRoute>
         <PrivateRoute path='/shipment'>
           <Shipment></Shipment>
         </PrivateRoute>
         <Route path='/login'>
           <Login></Login>
         </Route>
         <Route exact path="/">
             <Shop></Shop>
         </Route>
         <Route path="/product/:productKey">
            <PdDetail></PdDetail>
         </Route>
         <Route path="*">
           <Error></Error>
         </Route>
       </Switch>
     </Router>
  </UserContext.Provider>
  
   )
};

export default App;