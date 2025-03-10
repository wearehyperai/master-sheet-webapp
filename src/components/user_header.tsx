
'use client';
import { UserButton } from '@clerk/nextjs';

export default function UserHeader() {
    return (
        <header className="flex flex-row justify-end items-center p-4 gap-4 h-16">
            <UserButton />
        </header>
    );
}
