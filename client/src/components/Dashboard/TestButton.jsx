import React from 'react';
import { Button } from 'semantic-ui-react';

const TestButton = () => {
    const testPush = async () => {
        setTimeout(async () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            try {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification('Test Notification', {
                    body: 'Test notification',
                    icon: '/images/icons/Plant_Pals_192.png',
                    Badge: '/images/icons/Plant_Pals_192.png',
                });
                console.log('Test notification sent.');
            } catch (error) {
                console.error('Error sending test notification:', error);
            }
        } else {
            console.error('Push notifications are not supported.');
        }
    }, 3000);
};
    return (
        <Button onClick={testPush} color="blue">
            Notification Test
        </Button>
    );
};

export default TestButton;