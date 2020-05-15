import React, { useEffect, useState } from 'react';
import { FiAnchor, FiCode, FiSlack } from 'react-icons/fi';

import InputField from 'components/UI/inputField/InputField';
import Card, { Header, Title } from 'components/UI/card/Card';
import Button from 'components/UI/button/Button';

import fetchClient from 'fetchClient';
import { useStore } from 'context';

import styling from './Integrations.module.scss';

const Integrations = (props) => {
    const [store, dispatch, setError] = useStore();
    
    const [{ prevWebhookURL, webhookURL, slackURL, prevSlackURL, loading }, setState] = useState({
        webhookURL: '',
        prevWebhookURL: '',
        slackURL: '',
        prevSlackURL: '',
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
            
            const update = { slackWebhookURL: slackURL, webhookURL };
            
            await fetchClient('updateService', update, '/service/' + props.serviceId);
            
            const tmpServices = [...store.services];
            const index = tmpServices.findIndex(x => x.id === props.serviceId);
            
            tmpServices[index].slackWebhookURL = slackURL;
            tmpServices[index].webhookURL = webhookURL;
            
            dispatch({ action: 'update', payload: { services: tmpServices } });
            
            setState(prevState => ({
                ...prevState,
                loading: false,
                prevSlackURL: slackURL,
                prevWebhookURL: webhookURL
            }));
            
        } catch (error) {
            console.error(error);
            setState(prevState => ({ ...prevState, loading: false }));
            setError(error);
        }
    };
    
    
    /**
     * Validates the input fields.
     * @returns {boolean} if the input fields are valid
     */
    const validateInput = () => {
        if (slackURL && slackURL.length < 70) {
            return false;
        }
        
        if (slackURL && !slackURL.includes('https://hooks.slack.com/services/')) {
            return false;
        }
        
        if (slackURL === prevSlackURL && webhookURL === prevWebhookURL) {
            return false;
        }
        
        return !loading;
    };
    
    
    /**
     * Save the props in state.
     */
    useEffect(() => {
        setState(prevState => ({
            ...prevState,
            prevSlackURL: props.slackWebhookURL || '',
            slackURL: props.slackWebhookURL || '',
            prevWebhookURL: props.webhookURL || '',
            webhookURL: props.webhookURL || ''
        }));
    }, [props.slackWebhookURL, props.webhookURL]);
    
    
    return (
        <Card>
            <Header icon={<FiCode />}>Integrations</Header>
            
            <Title icon={<FiAnchor />}>Webhooks</Title>
            
            <p className={styling.caption}>
                If provided, all error events will be sent to the webhook URL as POST request.
            </p>
            
            <InputField
                value={webhookURL}
                onChange={({ target }) => setState(prevState => ({ ...prevState, webhookURL: target.value }))}
                placeholder='Webhook URL'
            />
            
            <Title icon={<FiSlack />}>Slack</Title>
            
            <p className={styling.caption}>
                Create a webhook in Slack and add it to the desired Slack channel.
                To receive Slack alerts, paste the webhook URL below.
                You will then be notified every time an error occurred.
                Refer to the <a href='https://api.slack.com/messaging/webhooks' target='_blank' rel='noopener noreferrer'>
                Slack Documentation</a> for help.
            </p>
            
            <InputField
                value={slackURL}
                onChange={({ target }) => setState(prevState => ({ ...prevState, slackURL: target.value }))}
                placeholder='Slack Webhook URL'
                test={/https:\/\/hooks.slack.com\/services\//}
            />
            
            <div className={styling.controls}>
                <Button onClick={updateService} disabled={!validateInput()}>Save</Button>
            </div>
        </Card>
    );
};

export default Integrations;