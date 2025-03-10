'use client';
import {
    SignInButton,
    SignUpButton
} from '@clerk/nextjs';

export default function Onboarding() {

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full">
            <SignInButton >
                <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign in
                </button>
            </SignInButton>
            <SignUpButton>
                <button className="px-4 py-2 mt-4 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign up
                </button>
            </SignUpButton>
        </div>
    );

}
