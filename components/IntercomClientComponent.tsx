'use client';

import React, { useEffect } from "react";

// Add TypeScript interface for window object
declare global {
  interface Window {
    Intercom?: any;
    intercomSettings?: any;
  }
}

const IntercomClientComponent: React.FC = () => {
  useEffect(() => {
    if (typeof process.env.NEXT_PUBLIC_INTERCOM_APP_ID === 'string') {
      window.intercomSettings = {
        api_base: "https://api-iam.intercom.io",
        app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID
      };
    } else {
      console.error("Intercom app ID is not set. Please check your environment variables.");
    }

    // Safe check for Intercom existence
    const w = window as any;
    if (typeof w.Intercom === 'function') {
      w.Intercom('reattach_activator');
      w.Intercom('update', window.intercomSettings);
    } else {
      const intercomScript = document.createElement('script');
      intercomScript.type = 'text/javascript';
      intercomScript.async = true;
      intercomScript.src = 'https://widget.intercom.io/widget/rxehm4ny';
      intercomScript.onload = () => {
        if (typeof w.Intercom === 'function') {
          w.Intercom('update', window.intercomSettings);
        }
      };
      document.body.appendChild(intercomScript);
    }
  }, []);

  return null;
};

export default IntercomClientComponent;