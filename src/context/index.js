import React, { createContext, useCallback, useContext, useReducer } from 'react';

const Context = createContext({});

const initialState = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    organizationId: '',
    organization: {
        id: '',
        name: '',
        identifier: '',
        receivedRequests: {},
        monthlyRequestLimit: 0,
        createdAt: '',
        updatedAt: ''
    },
    lastLogin: '',
    services: [],
    isOrganizationOwner: false,
    team: [],
    createdAt: '',
    updatedAt: '',
    error: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);
    
    const setError = useCallback((error) => {
        dispatch({ type: 'update', payload: { error: error.message } });
        
        setTimeout(() => {
            dispatch({ type: 'update', payload: { error: '' } });
        }, 10000);
    }, []);
    
    return (
        <Context.Provider value={[store, dispatch, setError]}>
            {children}
        </Context.Provider>
    );
};

export const useStore = () => useContext(Context);