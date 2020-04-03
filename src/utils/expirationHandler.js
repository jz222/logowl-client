/**
 * Calculates the expiration time and pushes the user back
 * to the sign-in page if their JWT has been expired.
 * @param history {object} history object that contains the push function
 * @param expirationTime {int} expiration time of the JWT
 */
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