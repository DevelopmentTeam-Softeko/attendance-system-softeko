import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const email = request.cookies.get("email")?.value;
  const employeeRole = request.cookies.get("ROLE")?.value;

  const restrictedPaths = ["/employees", "/attendance-list"];
  const pathname = request.nextUrl.pathname;

  if (!email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (restrictedPaths.some((path) => pathname.startsWith(path))) {
    // Check if the user has admin role
    if (employeeRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/employees", "/attendance-list"],
};
