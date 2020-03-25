import config from 'config';

import actions from './actions/';

const request = async (type, payload = {}, url) => {
    const action = actions[type];
    
    if (!action) {
        throw new Error('The provided action ' + action + ' does not exist.');
    }
    
    const jwt = localStorage.getItem('access-pass');
    
    const opts = {
        method: action.method,
        headers: {
            'Content-Type': 'application/json',
            ...(!action.noAuthRequired) && { 'Authorization': 'Bearer ' + jwt }
        },
        ...(action.method === 'POST') && { body: JSON.stringify(payload) }
    };
    
    const res = await fetch(config.connectivity.backendURL + (url || action.url), opts);
    
    return await res.json();
};

export default request;