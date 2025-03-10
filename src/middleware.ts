import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isOnboardingRoute = createRouteMatcher(["/onboarding(.*)"]);
export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // If user is signed in and on onboarding, redirect to home
    if (userId && isOnboardingRoute(req)) {
        return NextResponse.redirect(new URL('/dashboard?from=onboarding', req.url));
    }

    // If user is not signed in and not on onboarding, redirect to onboarding
    if (!userId && !isOnboardingRoute(req)) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}