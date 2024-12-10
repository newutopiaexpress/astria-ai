"use client";

import { MessengerChat } from "react-messenger-chat-plugin";
import { useEffect, useState } from "react";

export default function MessengerChatPlugin() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <MessengerChat
      pageId="527780757077912"
      language="eng_ENG"
      themeColor={"#000000"}
      bottomSpacing={300}
      loggedInGreeting="loggedInGreeting"
      loggedOutGreeting="loggedOutGreeting"
      greetingDialogDisplay={"show"}
      debugMode={true}
      onMessengerShow={() => {
        console.log("onMessengerShow");
      }}
      onMessengerHide={() => {
        console.log("onMessengerHide");
      }}
      onMessengerDialogShow={() => {
        console.log("onMessengerDialogShow");
      }}
      onMessengerDialogHide={() => {
        console.log("onMessengerDialogHide");
      }}
      onMessengerMounted={() => {
        console.log("onMessengerMounted");
      }}
      onMessengerLoad={() => {
        console.log("onMessengerLoad");
      }}
    />
  );
}