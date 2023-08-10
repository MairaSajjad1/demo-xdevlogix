import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (!req.cookies.has("token")) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (path === "/" && req.cookies.has("token")) {
    return NextResponse.redirect(new URL("/dashboard/home", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
