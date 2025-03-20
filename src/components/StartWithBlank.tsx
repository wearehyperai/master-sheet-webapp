"use client"
import { useRouter } from 'next/navigation';

export default function StartWithBlank() {
    const router = useRouter();
    return (
        <div className=" max-w-2xl p-6">
            <button
                className="relative flex flex-col items-center justify-center flex-1 h-64
                border-2 border-dashed rounded-lg cursor-pointer  px-8 py-0"
                onClick={() => router.push("/data")}
            >
                Start with blank
            </button>
        </div>
    );
}