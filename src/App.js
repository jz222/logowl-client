import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ErrorDetails from './components/service/errorDetails/ErrorDetails';
import Organization from './components/organization/Organization';
import Blueprint from './components/layout/blueprint/Blueprint';
import Services from './components/services/Services';
import Settings from './components/settings/Settings';
import SignIn from './components/auth/signIn/SignIn';
import Service from './components/service/Service';
import Setup from './components/auth/setup/Setup';

const App = () => (
    <Switch>
        <Route path='/auth/signin' component={SignIn} />
        <Route path='/auth/setup' component={Setup} />
        
        <Blueprint>
            <Route exact path='/services' component={Services} />
            <Route exact path='/services/:serviceId' component={Service} />
            <Route exact path='/services/:serviceId/error/:errorId' component={ErrorDetails} />
            
            <Route exact path='/organization' component={Organization} />
            
            <Route exact path='/settings' component={Settings} />
        </Blueprint>
    </Switch>
);

export default App;
