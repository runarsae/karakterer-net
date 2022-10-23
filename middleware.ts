import { NextFetchEvent, NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    const { pathname, searchParams } = request.nextUrl;
    const course = searchParams.get('id');

    if (request.method === 'GET' && pathname.startsWith('/course/') && course) {
        event.waitUntil(
            fetch(`${request.nextUrl.origin}/api/visits/${course}`, {
                method: 'PUT'
            })
        );
    }

    return NextResponse.next();
}
