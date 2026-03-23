import { NextResponse } from "next/server";

export function middleware() {
  // For MVP demo mode, allow all routes
  // In production, use Supabase session middleware:
  // import { updateSession } from "@/lib/supabase/middleware";
  // return updateSession(request);
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
