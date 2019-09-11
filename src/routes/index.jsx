import React from 'react';
import ControlPage from '../pages/control';
import NewControlPage from '../pages/NewControl';
import EditControl from '../pages/EditControl';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

export default () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={ControlPage} />
            <Route path="/controls/:type/new" component={NewControlPage} />
            <Route path="/controls/:id/edit" component={EditControl} />
        </Switch>
    </BrowserRouter>
);