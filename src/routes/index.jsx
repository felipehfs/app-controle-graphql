import React from 'react';
import ControlPage from '../pages/control';
import NewControlPage from '../pages/NewControl';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ControlPage} />
            <Route path="/controls/:type/new" component={NewControlPage} />
        </Switch>
    </BrowserRouter>
);