import React, { createContext, useContext, useReducer } from 'react';

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
        createdAt: '',
        updatedAt: ''
    },
    lastLogin: '',
    services: '',
    createdAt: '',
    updatedAt: ''
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
    const store = useReducer(reducer, initialState);
    
    return (
        <Context.Provider value={store}>
            {children}
        </Context.Provider>
    );
};

export const useStore = () => useContext(Context);