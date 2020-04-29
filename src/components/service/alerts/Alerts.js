import React, { useEffect, useState } from 'react';
import { FiBell, FiSlack } from 'react-icons/fi';

import InputField from 'components/UI/inputField/InputField';
import Card, { Header, Title } from 'components/UI/card/Card';
import Button from 'components/UI/button/Button';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './Alerts.module.scss';

const Alerts = ({ serviceId = '', slackWebhookURL = '' }) => {
    const [store, dispatch, setError] = useStore();
    
    const [{ webhookURL, prevWebhookURL, loading }, setState] = useState({
        webhookURL: '',
        prevWebhookURL: '',
        loading: false
    });
    
    /**
     * Sets or updates the Slack webhook URL for the service
     * with the given ID.
     * @returns {Promise<void>}
     */
    const updateService = async () => {
        try {
            setState(prevState => ({ ...prevState, loading: true }));
            
            await fetchClient('updateService', { slackWebhookURL: webhookURL }, '/service/' + serviceId);
            
            const tmpServices = [...store.services];
            const index = tmpServices.findIndex(x => x.id === serviceId);
            
            tmpServices[index].slackWebhookURL = webhookURL;
            
            dispatch({ action: 'update', payload: { services: tmpServices } });
            setState(prevState => ({ ...prevState, loading: false, prevWebhookURL: webhookURL }));
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, loading: false }));
            setError(error);
        }
    };
    
    useEffect(() => {
        setState(prevState => ({ ...prevState, prevWebhookURL: slackWebhookURL, webhookURL: slackWebhookURL }));
    }, [slackWebhookURL]);
    
    // Determines if the webhook URL is valid
    const webhookURLIsValid = webhookURL === '' || webhookURL.length > 70 || webhookURL.includes('https://hooks.slack.com/services/');
    
    return (
        <Card>
            <Header icon={<FiBell />}>Alerts</Header>
            
            <Title icon={<FiSlack />}>Slack</Title>
            
            <p className={styling.caption}>
                Create a webhook in Slack and add it to the desired Slack channel.
                To receive Slack alerts, paste the webhook URL below.
                You will then be notified every time an error occurred.
                Refer to the <a href='https://api.slack.com/messaging/webhooks' target='_blank' rel='noopener noreferrer'>
                Slack Documentation</a> for help.
            </p>
            
            <InputField
                value={webhookURL}
                onChange={({ target }) => setState(prevState => ({ ...prevState, webhookURL: target.value }))}
                placeholder='Webhook URL'
                test={/https:\/\/hooks.slack.com\/services\//}
            />
            
            <div className={styling.controls}>
                <Button onClick={updateService} disabled={!webhookURLIsValid || webhookURL === prevWebhookURL || loading}>Save</Button>
            </div>
        </Card>
    );
};

export default Alerts;