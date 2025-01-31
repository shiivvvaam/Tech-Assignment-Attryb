
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import DealerDashboard from './DealerDashboard';
import CarDetails from './CarDetails';
import Filters from './Filters';

function App() {
  return (
    <Router>
      <div>
        <h1>BUYC Corp - Car Marketplace</h1>
        <nav>
          <Link to="/login">Login</Link> | <Link to="/signup">Signup</Link> | <Link to="/dealer">Dealer Dashboard</Link>
        </nav>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/dealer" component={DealerDashboard} />
          <Route path="/add-car" component={CarDetails} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
