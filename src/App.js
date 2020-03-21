import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Blueprint from './components/layout/blueprint/Blueprint';
import SignIn from './components/auth/signIn/SignIn';
import Setup from './components/auth/setup/Setup';
import Errors from './components/errors/Errors';

const App = () => {
    return (
        <Switch>
            <Route path='/auth/login' component={SignIn} />
            <Route path='/auth/setup' component={Setup} />
            
            <Blueprint>
                <Route exact path='/services/:id' component={Errors} />
                <Route path='' />
            </Blueprint>
        </Switch>
    );
};

export default App;
