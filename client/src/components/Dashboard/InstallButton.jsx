import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const InstallButton = () => {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };
        // beforeinstallprompt - browser triggered event when web app installable
        window.addEventListener('beforeinstallprompt', handler);

        const handleInstallation = (event) => {
            console.log('👍', 'appinstalled', event);
            setIsInstalled(true);
        };
        // appinstalled - browser triggered event when web app installed
        window.addEventListener('appinstalled', handleInstallation);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', handleInstallation);
        };
    }, []);

    const handleInstall = async () => {
        if (installPrompt) {
        // trigger install prompt
            installPrompt.prompt();
        // userChoice resolves when user responds to prompt
            const choiceResult = await installPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setInstallPrompt(null);
        }
    };

    return (
        // react fragment wrapper
        <>
            {!isInstalled && (
            <Button
                onClick={handleInstall}
                disabled={isInstalled}
            >
            Install Plant Pals
            </Button>
            )}
            {isInstalled && (
            <p>Plant Pals is installed!</p>
            )}
        </>
        );
    };

export default InstallButton;
