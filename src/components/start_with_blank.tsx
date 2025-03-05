"use client"
import { useRouter } from 'next/navigation';

export default function StartWithBlank() {
    const router = useRouter();
    return (
        <button
            className="flex justify-self-center bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-4"
            onClick={() => router.push("/data")}
        >
            Start with blank
        </button>
    );
}