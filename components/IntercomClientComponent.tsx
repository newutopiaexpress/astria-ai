'use client';

import React, { useEffect } from "react";

const IntercomClientComponent: React.FC = () => {
    useEffect(() => {
        const w = window as any;
        
        // Set basic Intercom settings
        w.intercomSettings = {
            api_base: "https://api-iam.intercom.io",
            app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID
        };

        // Initialize Intercom
        if (w.Intercom) {
            w.Intercom('reattach_activator');
            w.Intercom('update', w.intercomSettings);
        } else {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://widget.intercom.io/widget/${process.env.NEXT_PUBLIC_INTERCOM_APP_ID}`;
            document.body.appendChild(script);
        }

        // Cleanup
        return () => {
            if (w.Intercom) {
                w.Intercom('shutdown');
            }
        };
    }, []);

    return null;
};

export default IntercomClientComponent;