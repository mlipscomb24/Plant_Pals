import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';

const InstallButton = () => {
    const [installPrompt, setInstallPrompt] = useState(null);

    useEffect(() => {
        const handler = (event) => {
            event.preventDefault();
            setInstallPrompt(event);
        };
        window.addEventListener('beforeinstallprompt', handler);

        const handleInstallation = (event) => {
            setIsInstalled(true);
        };
        window.addEventListener('appinstalled', handleInstallation);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', handleInstallation);
        };
    }, []);

    const handleInstall = async () => {
        if (installPrompt) {
            installPrompt.prompt();
            const choiceResult = await installPrompt.userChoice;
            if (choiceResult.outcome === 'accepted') {
            } else {
            }
            setInstallPrompt(null);
        }
    };

    return (
            <Button
                onClick={handleInstall}
            >
            Install Plant Pals
            </Button>
        );
    };

export default InstallButton;