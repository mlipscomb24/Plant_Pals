import React from 'react';

const NotificationButton = () => {
    const requestNotificationPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Permission granted for notifications');
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