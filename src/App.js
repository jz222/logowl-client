import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorDetails from './components/service/errorDetails/ErrorDetails';
import Blueprint from './components/layout/blueprint/Blueprint';
import SignIn from './components/auth/signIn/SignIn';
import Setup from './components/auth/setup/Setup';
import Service from './components/service/Service';

const App = () => {
    return (
        <Switch>
            <Route path='/auth/signin' component={SignIn} />
            <Route path='/auth/setup' component={Setup} />
            
            <Blueprint>
                <Route exact path='/services/:id' component={Service} />
                <Route exact path='/services/error/:id' component={ErrorDetails} />
            </Blueprint>
        </Switch>
    );
};

export default App;
