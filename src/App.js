import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './modules/home/home';
import { Layout } from './modules/layout/layout';
import { RecipeFormViewContainer } from './modules/recipe-form/recipe-form-view-container';

import './App.scss';

const style = require('./modules/layout/layout.module.scss');

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
      
          <Route path="/recipe-form/" component={RecipeFormViewContainer} />
          <Route path="/" component={Home} />
      
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
