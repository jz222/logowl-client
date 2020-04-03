const expirationHandler = (history, expirationTime) => {
    const expiresIn = expirationTime - Date.now();
    
    setTimeout(() => {
        localStorage.clear();
        
        history.push({
            pathname: '/auth/signin',
            expired: true
        });
    }, expiresIn);
};

export default expirationHandler;