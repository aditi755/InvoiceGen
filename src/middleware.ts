import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtected = createRouteMatcher([
//     '/dashboard',
//     '/invoices/:invoiceId',
//     '/invoices/new'
// ])

const isPublic = createRouteMatcher([
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)'
])

//checker to see if the route is protected means the user is authenticated to access it
export default clerkMiddleware((auth, request) => {
if(!isPublic(request)){
    auth().protect()
}
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};