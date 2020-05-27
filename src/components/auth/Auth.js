import React from 'react';
import { FiStar, FiUser, FiUserCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Menu from 'components/layout/menu/Menu';

import styling from './Auth.module.scss';

const Auth = () => {
    return (
        <>
            <Menu>
                <ul>
                    <li><Link to='/auth/signin'>Sign In</Link></li>
                    <li><Link to='/auth/setup'>New Organization</Link></li>
                </ul>
            </Menu>
            
            <main>
                <div className={styling.box}>
                    <Link to='/auth/signin'>
                        <div className={styling.element}>
                            <div className={styling.icon}>
                                <FiUserCheck />
                            </div>
                            <div>
                                <h6>Sign In</h6>
                                <p>Sign in if you already have an account</p>
                            </div>
                        </div>
                    </Link>
                    
                    <hr />
                    
                    <Link to='/auth/signup'>
                        <div className={styling.element}>
                            <div className={styling.icon}>
                                <FiUser />
                            </div>
                            <div>
                                <h6>Sign Up</h6>
                                <p>Sign up if you were invited to a team</p>
                            </div>
                        </div>
                    </Link>
                    
                    <hr />
                    
                    <Link to='/auth/setup'>
                        <div className={styling.element}>
                            <div className={styling.icon}>
                                <FiStar />
                            </div>
                            <div>
                                <h6>Create Organization</h6>
                                <p>Create an organization and add your team</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </main>
        </>
    );
};

export default Auth;