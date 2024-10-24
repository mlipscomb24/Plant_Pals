import React from 'react';
import { Button } from 'semantic-ui-react';

const NotificationButton = () => {

    const SUBSCRIBE_USER_MUTATION = `
        mutation SubscribeUser($input: SubscriptionInput!) {
            subscribeUser(input: $input) {
                success
                message
            }
        }
    `;
    // Subscribe the user to push notifications
    const subscribeUser = async () => {
        try {
        // Confirm sw registered
        const registration = await navigator.serviceWorker.ready;
        // Retrieve the public VAPID key from the environment
        const publicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
        // Log the public key
        console.log('VAPID Public Key:', publicKey);
        if (!publicKey) {
            throw new Error('VAPID public key is missing.');
        }
        // Convert the VAPID key to a UInt8Array
        const convertVapidKey = (publicKey) => {
            const padding = '='.repeat((4 - (publicKey.length % 4)) % 4);
            const base64 = (publicKey + padding).replace(/-/g, '+').replace(/_/g, '/');
            const rawData = window.atob(base64);
            return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
        };
        const convertedVapidKey = convertVapidKey(publicKey);

        // Subscribe the user to push notifications
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
        });

        console.log('User is subscribed:', subscription);
        const subscriptionData = {
            endpoint: subscription.endpoint,
            keys: {
                auth: subscription.toJSON().keys.auth,
                p256dh: subscription.toJSON().keys.p256dh,
            },
        };
        console.log('Subscription data:', subscriptionData);
        const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: SUBSCRIBE_USER_MUTATION,
                    variables: {
                        input: subscriptionData,
                    },
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to subscribe the user');
            }
            const data = await response.json();
            console.log('User subscribed:', data);
            } catch (err) {
                console.error('Failed to subscribe the user:', err);
            }
        };

    const requestNotificationPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permission granted for notifications');
                    subscribeUser();
                } else {
                    console.log('Permission denied for notifications');
                }
            });
        } else {
            console.log('This browser does not support notifications.');
        }
    };

    return (
        <Button onClick={requestNotificationPermission} color="green">
            Enable Notifications
        </Button>
    );
};

export default NotificationButton;