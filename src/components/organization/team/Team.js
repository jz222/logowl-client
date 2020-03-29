import React from 'react';
import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';

import { Action } from 'components/UI/button/Button';
import Avatar from 'components/UI/avatar/Avatar';
import Badge from 'components/UI/badge/Badge';
import Card from 'components/UI/card/Card';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './Team.module.scss';

const transition = {
    type: 'spring',
    damping: 20,
    stiffness: 400
};

const Team = ({ team = [], userId }) => {
    const [store, dispatch] = useStore();
    
    /**
     * Deletes an user with a given ID.
     * @param id {string} the ID of the user who should be deleted
     * @returns {Promise<void>}
     */
    const deleteUser = async (id) => {
        const currentTeam = [...store.team];
        
        try {
            const updatedTeam = currentTeam.filter(user => user.id !== id);
            
            dispatch({ type: 'update', payload: { team: updatedTeam } });
            
            const res = await fetchClient('deleteUserById', null, '/user/' + id);
            
            if (!res.ok) {
                throw new Error(res.message || 'failed to delete user');
            }
            
        } catch (error) {
            console.error(error);
            dispatch({ type: 'update', payload: { team: currentTeam } });
        }
    };
    
    const reversedTeam = [...team].reverse();
    
    return (
        <Card>
            <ul>
                {reversedTeam.map(user => (
                    <motion.li key={user.email} className={styling.user} layoutTransition={transition}>
                        <Avatar firstName={user.firstName} lastName={user.lastName} />
                        
                        <div className={styling.wrapper}>
                            <div>
                                <div className={styling.info}>
                                    <h6>{user.firstName} {user.lastName}</h6>
                                    <Badge type='neutral' size='small'>{user.role}</Badge>
                                </div>
                                
                                <p>{user.email}</p>
                            </div>
                            
                            <Action
                                icon={<FiTrash2 />}
                                onClick={() => deleteUser(user.id)}
                                hidden={user.id === userId}
                            >
                                Delete
                            </Action>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </Card>
    );
};

export default Team;