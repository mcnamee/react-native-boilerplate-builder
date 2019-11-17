import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';

// Containers
import {
  ArticlesList,
  ArticlesSingle,
} from '../containers';

// Components
import About from '../components/About';
import Error from '../components/UI/Error';

const Index = () => (
  <Switch>
    <Route path="/" exact component={About} />

    {/* Articles */}
    <Route path="/articles/:page?" component={ArticlesList} />
    <Route path="/article/:id" component={ArticlesSingle} />

    {/* 404 */}
    <Route
      render={(props) => (
        <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
      )}
    />
  </Switch>
);

export default Index;
