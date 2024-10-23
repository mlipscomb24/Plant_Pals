import React from 'react';

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
        const publicKey = process.env.VAPID_KEY_PUBLIC;
        // Convert the VAPID key to a UInt8Array
        const convertedVapidKey = Uint8Array.from(atob(publicKey), c => c.charCodeAt(0));

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
        <button onClick={requestNotificationPermission}>
            Enable Notifications
        </button>
    );
};

export default NotificationButton;