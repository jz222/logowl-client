import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Blueprint from './components/layout/blueprint/Blueprint';
import SignIn from './components/auth/SignIn/SignIn';
import Errors from './components/errors/Errors';

const App = () => {
    return (
        <Switch>
            <Route path='/login' component={SignIn} />
            
            <Blueprint>
                <Route exact path='/errors' component={Errors} />
                <Route path='' />
            </Blueprint>
        </Switch>
    );
};

export default App;
