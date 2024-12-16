'use client';
import React, {useEffect} from "react";

const IntercomClientComponent: React.FC = () => {
    useEffect(() => {
        const w = window as any;
        
        if (typeof process.env.NEXT_PUBLIC_INTERCOM_APP_ID === 'string') {
            w.intercomSettings = {
                api_base: "https://api-iam.intercom.io",
                app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID
            };
        } else {
            console.error("Intercom app ID is not set. Please check your environment variables.");
        }

        if (w.Intercom) {
            w.Intercom('reattach_activator');
            w.Intercom('update', w.intercomSettings);
        } else {
            const intercomScript = document.createElement('script');
            intercomScript.type = 'text/javascript';
            intercomScript.async = true;
            intercomScript.src = 'https://widget.intercom.io/widget/rxehm4ny';
            intercomScript.onload = () => w.Intercom('update', w.intercomSettings);
            document.body.appendChild(intercomScript);
        }
    }, []);

    return null;
};

export default IntercomClientComponent;