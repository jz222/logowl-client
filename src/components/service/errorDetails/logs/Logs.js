import React from 'react';

import utils from 'utils';

import styling from './Logs.module.scss';

const Logs = ({ logs }) => (
    <section hidden={!(logs || []).length}>
        <h4 className={styling.title}>Logs</h4>
        
        <ul className={styling.logs}>
            {(logs || []).map((log, i) => (
                <li key={i}>
                    <div className={styling.timestamp}>
                        {utils.getDateWithTime(log.timestamp)}
                    </div>
                    
                    <div className={styling.log}>
                        {log.log}
                    </div>
                </li>
            ))}
        </ul>
    </section>
);

export default Logs;