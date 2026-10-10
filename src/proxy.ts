import { NextRequest, NextResponse } from "next/server";
// Deploy behind a proxy that overwrites (rather than appends) X-Forwarded-Proto.
export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") return NextResponse.next();
  const hostname = request.nextUrl.hostname;
  if (["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname)) return NextResponse.next();
  const scheme = request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ?? request.nextUrl.protocol.replace(":", "");
  if (scheme === "http") {
    const url = request.nextUrl.clone(); url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
