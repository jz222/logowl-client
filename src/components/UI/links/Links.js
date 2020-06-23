import React from 'react';

import config from 'config';

export const PrivacyPolicy = () => {
    return <a href={config.links.legal.privacyPolicy} rel='noreferrer noopener' target='_blank'>Privacy Policy</a>;
};

export const TermsAndConditions = () => {
    return <a href={config.links.legal.termsAndConditions} rel='noreferrer noopener' target='_blank'>Terms and Conditions</a>
};