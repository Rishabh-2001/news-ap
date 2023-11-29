import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
// import {isAuthenticated} from './utils/auth.utils'
const protectedRoutes = ["/profile"];

export default function middleware(req) {
  let isAuthenticated = false;
  if (req.cookies.get("user")) {
    isAuthenticated = true;
  }

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/auth/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  return NextResponse.next();
}
