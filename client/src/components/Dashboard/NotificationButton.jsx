import React, { useEffect } from 'react';

const NotificationButton = () => {
    // Subscribe the user to push notifications
    const subscribeUser = async () => {
        // Confirm sw registered
        const registration = await navigator.serviceWorker.ready;
        // Retrieve the public VAPID key from the environment
        const publicKey = process.env.VAPID_KEY_PUBLIC;
        // Convert the VAPID key to a UInt8Array
        const convertedVapidKey = Uint8Array.from(atob(publicKey), c => c.charCodeAt(0));

        // Subscribe the user to push notifications
        registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey,
        })
        .then(subscription => {
            console.log('User is subscribed:', subscription);
            const subscriptionData = {
                endpoint: subscription.endpoint,
                keys: {
                    auth: subscription.toJSON().keys.auth,
                    p256dh: subscription.toJSON().keys.p256dh,
                },
            };
            
            const mutation = `
                mutation SubscribeUser() {
                    subscribeUser(input: $input) {
                        success
                        message
                    }
                }
            `;

            fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        input: subscriptionData,
                    },
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to subscribe the user');
                }
                return response.json();
            })
            .then(data => {
                console.log('User subscribed:', data);
            })
            .catch(err => {
                console.error('Failed to subscribe the user:', err);
            });
        })
        .catch(err => {
            console.error('Failed to subscribe the user:', err);
        });
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