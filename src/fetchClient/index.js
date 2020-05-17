import cache from './cache/cache';
import actions from './actions/';
import config from 'config';
import utils from 'utils';

const isCached = ['getAnalytics'];

const request = async (type, payload = {}, url) => {
    const action = actions[type];
    
    if (!action) {
        throw new Error('The provided action ' + type + ' does not exist.');
    }
    
    const cacheKey = type + url;
    
    if (isCached.includes(type) && cache.isCached(cacheKey)) {
        return JSON.parse(JSON.stringify(cache.get(cacheKey)));
    }
    
    const jwt = localStorage.getItem('access-pass');
    
    const opts = {
        method: action.method,
        headers: {
            'Content-Type': 'application/json',
            ...(!action.noAuthRequired) && { 'Authorization': 'Bearer ' + jwt }
        },
        ...(action.method === 'POST' || action.method === 'PUT' || action.method === 'DELETE') && { body: JSON.stringify(payload) }
    };
    
    let res = await fetch(config.connectivity.backendURL + (url || action.url), opts);
    
    // Cloud Run sometimes responds with a 429
    // if a new container is spinning up or
    // cold start takes too long. In that case
    // the request is send again after around 700ms.
    if (res.status === 429) {
        await utils.sleep(700);
        res = await fetch(config.connectivity.backendURL + (url || action.url), opts);
    }
    
    if (!res.ok) {
        const body = await res.json();
        const error = new Error(body.message || 'failed to fetch with unknown reason');
        
        error.code = res.status;
        
        throw error;
    }
    
    const jsonData = await res.json();
    
    if (isCached.includes(type)) {
        cache.set(cacheKey, JSON.parse(JSON.stringify(jsonData)));
    }
    
    return jsonData;
};

export default request;