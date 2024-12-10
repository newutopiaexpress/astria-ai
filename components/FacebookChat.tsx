// 2. Update FacebookChat.tsx
"use client";

import { useEffect } from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

export default function FacebookChat() {
  useEffect(() => {
    console.log('FacebookChat mounted'); // Debug log
  }, []);

  return (
    <div className="facebook-chat-wrapper" style={{ minHeight: '100px', minWidth: '100px' }}> {/* Added minimum dimensions */}
      <FacebookProvider appId="1296945471645834" chatSupport>
        <CustomChat 
          pageId="527780757077912" 
          minimized={false}
          themeColor="#000000"
          loggedInGreeting="Hello! How can we help you?"
          loggedOutGreeting="Hello! How can we help you?"
        />
      </FacebookProvider>
    </div>
  );
}