'use client';

import React, { useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from "@/types/supabase";

const IntercomClientComponent: React.FC = () => {
    useEffect(() => {
        const initializeIntercom = async () => {
            const supabase = createClientComponentClient<Database>();
            const w = window as any;
            
            // Get user data
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) return;

            // Get user credits
            const { data: credits } = await supabase
                .from('credits')
                .select('credits')
                .eq('user_id', user.id)
                .single();

            // Get models count
            const { count } = await supabase
                .from('models')
                .select('*', { count: 'exact' })
                .eq('user_id', user.id);

            // Set Intercom settings
            w.intercomSettings = {
                api_base: "https://api-iam.intercom.io",
                app_id: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
                name: user.user_metadata?.full_name || '',
                email: user.email,
                user_id: user.id,
                created_at: new Date(user.created_at).getTime() / 1000,
                custom_data: {
                    credits: credits?.credits || 0,
                    models_count: count || 0
                }
            };

            // Initialize Intercom
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
        };

        initializeIntercom();
    }, []);

    return null;
};

export default IntercomClientComponent;