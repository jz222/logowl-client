import React from 'react';

import InputField from 'components/UI/inputField/InputField';
import Card from 'components/UI/card/Card';

import styling from './Info.module.scss';

const Info = ({ organization = {} }) => {
    return (
        <Card>
            <div className={styling.row}>
                <h6>Organization Name</h6>
                <InputField value={organization.name} disabled />
                <p>The name of your organization.</p>
            </div>
            
            <div className={styling.row}>
                <h6>Identifier</h6>
                <InputField value={organization.identifier} disabled />
                <p>Your organization's identifier.</p>
            </div>
        </Card>
    );
};

export default Info;