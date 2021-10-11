import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";

import Log from './components/Auth/login';
import Dashboard from './components/layout/dash';

//Users Views
import Newuser from './components/users/newuser';
import Allusers from './components/users/userslist';
import Edituser from './components/users/edituser';

//Users Routes
import Allroutes from './components/routes/routeslist';
import Newroute from './components/routes/newroute';
import Editroute from './components/routes/editroute';

//Customers
import Allcustomers from './components/customer/customerlist';
import Newcustomer from './components/customer/newcustomer';
import Editcustomer from './components/customer/editcustomer';
import Editsizes from './components/customer/customersizes';
import Editsamples from './components/customer/customersamples';

//Sample Stages
import Allstages from './components/stages/stageslist';
import Newstage from './components/stages/newstage';
import Editstage from './components/stages/editstage';

//Plants
import Allplants from './components/plants/plantlist';
import Newplant from './components/plants/newplant';
import Editplant from './components/plants/editplant';

//Plants
import Allugs from './components/usergroup/ugslist';
import Newug from './components/usergroup/newug';
import Editug from './components/usergroup/editug';

//Sewing MO-Teams
import Allmos from './components/mo/molist';
import Newmo from './components/mo/newmo';
import Editmo from './components/mo/editmo';

//Dispatch Vendors
import Allvendors from './components/vendors/vendorslist';
import Newvendor from './components/vendors/newvendor';
import Editvendor from './components/vendors/editvendor';

//Cutting
import Cuthandling from './components/cutting/cuthandling';
import Cuttingteams from './components/cutting/cuttingteams';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Log />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/newuser">
            <Newuser />
          </Route>
          <Route path="/allusers">
            <Allusers />
          </Route>
          <Route path="/edituser/:id">
            <Edituser />
          </Route>
          <Route path="/allroutes">
            <Allroutes />
          </Route>
          <Route path="/newroute">
            <Newroute />
          </Route>
          <Route path="/editroute/:id">
            <Editroute />
          </Route>
          <Route path="/allcustomers">
            <Allcustomers />
          </Route>
          <Route path="/newcustomer">
            <Newcustomer />
          </Route>
          <Route path="/editcustomer/:id">
            <Editcustomer />
          </Route>
          <Route path="/editsizes/:id">
            <Editsizes />
          </Route>
          <Route path="/editsamples/:id">
            <Editsamples />
          </Route>
          <Route path="/newstage">
            <Newstage />
          </Route>
          <Route path="/allstages">
            <Allstages />
          </Route>
          <Route path="/editstage/:id">
            <Editstage />
          </Route>
          <Route path="/newplant">
            <Newplant />
          </Route>
          <Route path="/allplants">
            <Allplants />
          </Route>
          <Route path="/editplant/:id">
            <Editplant />
          </Route>
          <Route path="/newug">
            <Newug />
          </Route>
          <Route path="/allugs">
            <Allugs />
          </Route>
          <Route path="/editug/:id">
            <Editug />
          </Route>
          <Route path="/newmo">
            <Newmo />
          </Route>
          <Route path="/allmos">
            <Allmos />
          </Route>
          <Route path="/editmo/:id">
            <Editmo />
          </Route>
          <Route path="/newvendor">
            <Newvendor />
          </Route>
          <Route path="/allvendors">
            <Allvendors />
          </Route>
          <Route path="/editvendor/:id">
            <Editvendor />
          </Route>
          <Route path="/cutmethods">
            <Cuthandling />
          </Route>
          <Route path="/cutteams">
            <Cuttingteams />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
