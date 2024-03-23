import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, res: NextResponse) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = req.nextUrl.clone();

  if (url.pathname === "/auth/login" && session) {
    return NextResponse.redirect(new URL("/home", url.origin).href);
  }
  if (url.pathname === "/home") {
    if (!session)
      return NextResponse.redirect(new URL("/auth/login", url.origin).href);
    if (session.user.changeData === false)
      return NextResponse.redirect(
        new URL("/auth/register?oauth=true", url.origin).href
      );
  }

  return NextResponse.next();
}
