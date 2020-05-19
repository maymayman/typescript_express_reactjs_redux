import * as React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import About from './About';
import Home from './Home';

const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>

    <hr />

    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

export default App;
