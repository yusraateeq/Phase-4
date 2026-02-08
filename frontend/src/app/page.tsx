/**
 * Home page - Dynamic entry point for the Todo application.
 * Shows ChatGPT-style chat if authenticated, landing page if not.
 */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChatLayout } from "@/components/chat/ChatLayout";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("auth_token");

    if (token) {
      setIsAuthenticated(true);
    }

    // Force 5 second loading screen
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!token) {
        router.push("/login");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  // Loading state
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Authenticated - Show ChatGPT-style Chat Interface
  if (isAuthenticated) {
    return (
      <div className="h-screen">
        <ChatLayout />
      </div>
    );
  }

  // Return null or empty fragment while redirecting
  return null;
}
