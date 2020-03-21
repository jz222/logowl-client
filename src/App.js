import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Blueprint from './components/layout/blueprint/Blueprint';
import SignIn from './components/auth/signIn/SignIn';
import Setup from './components/auth/setup/Setup';
import Service from './components/service/Service';

const App = () => {
    return (
        <Switch>
            <Route path='/auth/login' component={SignIn} />
            <Route path='/auth/setup' component={Setup} />
            
            <Blueprint>
                <Route exact path='/services/:id' component={Service} />
                <Route path='' />
            </Blueprint>
        </Switch>
    );
};

export default App;
