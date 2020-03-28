import React from 'react';

import InputField from 'components/UI/inputField/InputField';
import Card from 'components/UI/card/Card';

import styling from './Personal.module.scss';

const Personal = ({ firstName, lastName, email, role }) => (
    <Card>
        <div className={styling.row}>
            <h6>First Name</h6>
            <InputField value={firstName} disabled />
            <p>Your first name</p>
        </div>
        
        <div className={styling.row}>
            <h6>Last Name</h6>
            <InputField value={lastName} disabled />
            <p>Your last name</p>
        </div>
        
        <div className={styling.row}>
            <h6>Email</h6>
            <InputField value={email} disabled />
            <p>Your personal email address</p>
        </div>
        
        <div className={styling.row}>
            <h6>Role</h6>
            <div>{role}</div>
            <p>Your role</p>
        </div>
    </Card>
);

export default Personal;