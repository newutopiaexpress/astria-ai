"use client"
import { FacebookProvider, Like } from 'react-facebook';

export function FacebookChat() {
  return (



        <FacebookProvider appId="1296945471645834">
        <Like href="http://www.facebook.com" colorScheme="dark" showFaces share />
      </FacebookProvider>  
  );
}

