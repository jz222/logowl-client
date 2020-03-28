import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

import { Action } from 'components/UI/button/Button';
import Avatar from 'components/UI/avatar/Avatar';
import Badge from 'components/UI/badge/Badge';
import Card from 'components/UI/card/Card';

import styling from './Team.module.scss';

const Team = ({ team = [], userId }) => (
    <Card>
        <ul>
            {team.map(user => (
                <li key={user.email} className={styling.user}>
                    <Avatar firstName={user.firstName} lastName={user.lastName} />
                    
                    <div className={styling.wrapper}>
                        <div>
                            <div className={styling.info}>
                                <h6>{user.firstName} {user.lastName}</h6>
                                <Badge type='neutral' size='small'>{user.role}</Badge>
                            </div>
                            
                            <p>{user.role}</p>
                        </div>
                        
                        <Action icon={<FiTrash2 />} hidden={user.id === userId}>Delete</Action>
                    </div>
                </li>
            ))}
        </ul>
    </Card>
);

export default Team;