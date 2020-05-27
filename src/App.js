import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authentication from './components/auth/authentication/Authentication';
import ErrorDetails from './components/service/errorDetails/ErrorDetails';
import PasswordReset from './components/auth/passwordReset/PasswordReset';
import Organization from './components/organization/Organization';
import Blueprint from './components/layout/blueprint/Blueprint';
import Services from './components/services/Services';
import Settings from './components/settings/Settings';
import Toast from './components/layout/toast/Toast';
import Service from './components/service/Service';
import Setup from './components/auth/setup/Setup';
import Auth from './components/auth/Auth';

const App = () => (
    <>
        <Switch>
            <Route path='/auth' component={Auth} exact />
            <Route path='/auth/signin' component={Authentication} />
            <Route path='/auth/signup' component={Authentication} />
            <Route path='/auth/setup' component={Setup} />
            <Route path='/auth/resetpassword' component={PasswordReset} />
            <Route path='/auth/newpassword' component={PasswordReset} />
            
            <Blueprint>
                <Route exact path='/services' component={Services} />
                <Route exact path='/services/:serviceId' component={Service} />
                <Route exact path='/services/:serviceId/error/:errorId' component={ErrorDetails} />
                
                <Route exact path='/organization' component={Organization} />
                
                <Route exact path='/settings' component={Settings} />
            </Blueprint>
        </Switch>
        
        <Toast />
    </>
);

export default App;
