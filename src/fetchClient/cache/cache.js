const cache = () => {
    const _cache = new Map();
    
    const set = (key, data) => _cache.set(key, data);
    
    const get = (key) => _cache.get(key);
    
    const isCached = (key) => _cache.has(key);
    
    return { set, get, isCached };
};

export default cache();