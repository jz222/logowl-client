import React from 'react';
import { withRouter } from 'react-router-dom';

import Dropdown from 'components/UI/dropdown/Dropdown';
import Adapter from 'components/UI/adapter/Adapter';
import Avatar from 'components/UI/avatar/Avatar';

import { useStore } from 'context';

import styling from './Nav.module.scss';

const Nav = ({ history }) => {
    const [store] = useStore();
    
    const changeHandler = (value) => history.push('/services/' + value);
    
    const allServices = (store.services || []).map(service => {
        
        const item = (
            <>
                <Adapter type={service.type} size='small' />
                {service.name}
            </>
        );
        
        return { key: item, value: service.id, id: service.id };
    });
    
    let selectedService = history.location.pathname.split('/services/')[1];
    
    if (selectedService) {
        selectedService = selectedService.split('/error')[0];
    }
    
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