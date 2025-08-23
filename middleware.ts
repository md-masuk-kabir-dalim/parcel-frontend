import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

interface ExtendedJwtPayload {
    role?: 'ADMIN' | 'CUSTOMER' | 'DELIVERY_AGENT';
    userName?: string;
    email?: string;
}

// Define routes from your sidebar
const protectedRoutes = [
    { path: '/dashboard/bookings', roles: ['ADMIN'] },
    { path: '/dashboard/assign-agent', roles: ['ADMIN'] },
    { path: '/dashboard/users', roles: ['ADMIN'] },
    { path: '/dashboard/my-bookings', roles: ['CUSTOMER'] },
    { path: '/dashboard/track-parcel', roles: ['CUSTOMER'] },
    { path: '/dashboard/assigned-parcels', roles: ['DELIVERY_AGENT'] },
    { path: '/dashboard/update-status', roles: ['DELIVERY_AGENT'] }
];

export async function middleware(req: Request) {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('token');
    const pathname = new URL(req.url).pathname;

    // Public route '/' redirects based on role
    if (pathname === '/' && tokenCookie?.value) {
        try {
            const decoded = jwtDecode<ExtendedJwtPayload>(tokenCookie.value);
            switch (decoded.role) {
                case 'ADMIN':
                case 'DELIVERY_AGENT':
                    return NextResponse.redirect(new URL('/dashboard/bookings', req.url));
                case 'CUSTOMER':
                    return NextResponse.redirect(new URL('/dashboard/my-bookings', req.url));
            }
        } catch {
            return NextResponse.next();
        }
    }

    // Protect dashboard routes
    const matchedRoute = protectedRoutes.find(route => pathname === route.path);
    if (matchedRoute) {
        if (!tokenCookie?.value) return NextResponse.redirect(new URL('/', req.url));

        try {
            const decoded = jwtDecode<ExtendedJwtPayload>(tokenCookie.value);

            if (!decoded.role || !matchedRoute.roles.includes(decoded.role)) {
                // Redirect unauthorized roles to their default dashboard
                if (decoded.role === 'CUSTOMER') return NextResponse.redirect(new URL('/dashboard/my-bookings', req.url));
                if (decoded.role === 'DELIVERY_AGENT') return NextResponse.redirect(new URL('/dashboard/assigned-parcels', req.url));
                return NextResponse.redirect(new URL('/', req.url));
            }

            return NextResponse.next(); // Authorized
        } catch {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // Allow public routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
};
