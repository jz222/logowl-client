import React from 'react';

import styling from './Stacktrace.module.scss';

const Stacktrace = ({ snippet, stacktrace, path, line }) => {
    console.log(snippet);
    
    const preparedSnippet = Object.keys(snippet).sort((a, b) => a - b);
    
    return (
        <section className={styling.stacktrace}>
            <h4>Stacktrace</h4>
            
            <div className={styling.wrapper}>
                
                <ul className={styling.snippet}>
                    {preparedSnippet.map(lineNumber => {
                        const style = (lineNumber === line) ? styling.error : '';
                        
                        return (
                            <li key={lineNumber}>
                                <div className={styling.number + ' ' + style}>{lineNumber}</div>
                                <div className={styling.code + ' ' + style}>{snippet[lineNumber]}</div>
                            </li>
                        );
                    })}
                </ul>
                
                <div className={styling.info}><b>{path}</b> in line <b>{line}</b></div>
            
            </div>
        
        </section>
    );
};

export default Stacktrace;