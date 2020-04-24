const convertTimestamp = (timestamp) => {
    return timestamp < 1000000000000 ? timestamp * 1000 : timestamp
};

export const getDate = (timestamp) => {
    try {
        timestamp = convertTimestamp(timestamp);
        
        const date = new Date(timestamp);
        
        return date.toLocaleDateString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const getDateWithTime = (timestamp) => {
    try {
        timestamp = convertTimestamp(timestamp);
        
        const date = new Date(timestamp);
        
        return date.toLocaleString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};

export const getTime = (timestamp, keepUTC) => {
    try {
        timestamp = convertTimestamp(timestamp);
        
        const date = new Date(timestamp);
        
        if (keepUTC) {
            const opts = { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' };
            return date.toLocaleTimeString(navigator.language, opts);
        }
        
        return date.toLocaleTimeString();
        
    } catch (error) {
        console.error(error);
        return '';
    }
};