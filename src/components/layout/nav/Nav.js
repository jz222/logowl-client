import React from 'react';
import { withRouter } from 'react-router-dom';

import Avatar from 'components/UI/avatar/Avatar';
import Dropdown from 'components/UI/dropdown/Dropdown';

import { useStore } from 'context';

import styling from './Nav.module.scss';

const Nav = ({ history }) => {
    const [store] = useStore();
    
    const changeHandler = (value) => history.push('/services/' + value);
    
    const allServices = (store.services || []).map(service => ({ key: service.name, value: service.id }));
    
    const selectedService = history.location.pathname.split('/services/')[1];
    
    return (
        <nav className={styling.nav}>
            <div>
                <Dropdown
                    items={allServices}
                    selected={selectedService}
                    label='Select Service'
                    changeHandler={changeHandler}
                />
            </div>
            
            
            <div className={styling.user}>
                <Avatar firstName={store.firstName} lastName={store.lastName} />
                
                <div>
                    <div className={styling.name}>{store.firstName} {store.lastName}</div>
                    <div className={styling.email}>{store.email}</div>
                </div>
            </div>
        </nav>
    );
};

export default withRouter(Nav);