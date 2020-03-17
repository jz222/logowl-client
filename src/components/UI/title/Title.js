import React from 'react';

import styling from './Title.module.scss';

const Title = ({ children }) => <h1 className={styling.title}>{children}</h1>;

export default Title;