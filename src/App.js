// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Product from "./Components/Product"

function App() {
  return (
    <Router>
     
      <Switch>
        <Route path="/product/:productId" component={Product} />
      </Switch>
    
    </Router>
  );
}

export default App;
