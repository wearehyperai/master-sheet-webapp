'use client';
import UserHeader from "@/components/user_header";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('Home User has signed in!');
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="relative flex gap-3">
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-screen w-full">
          <Link href="/onboarding">
            <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
              Sign in
            </button>
          </Link>
          <center className="text-2xl font-bold pt-4">Welcome to the app</center>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-col h-screen w-full">
          <UserHeader />
          <div className="flex items-center justify-center h-[700px] bg-gray-50">
            <Link href="/dashboard">
              <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                Dashboard
              </button>
            </Link>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}