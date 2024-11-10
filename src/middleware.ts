import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;
  const pathSegments = pathname.split("/");

  if (pathSegments.length <= 1) {
    return NextResponse.next();
  }

  switch (pathSegments[1]) {
    case "course":
      return NextResponse.redirect(
        request.nextUrl.origin +
          request.nextUrl.pathname.replace("/course", "/courses"),
      );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - icon.svg (icon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|icon.svg).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
