import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const url = req.nextUrl.clone();

  if (url.pathname === "/auth/login" && session) {
    return NextResponse.redirect(new URL("/home", url.origin).href);
  }
  if (url.pathname === "/auth/login" && !session) {
    return NextResponse.next();
  }
  if (url.pathname === "/auth/register" && session) {
    if (session.user.id_rol === 4)
      return NextResponse.rewrite(
        new URL("/auth/register?oauth=true&verify=false", url.origin).href
      );
    return NextResponse.redirect(new URL("/home", url.origin).href);
  }
  if (url.pathname === "/auth/register?oauth=true" && !session) {
    return NextResponse.redirect(new URL("/auth/login", url.origin).href);
  }
  if (url.pathname === "/home" && session) {
    if (session.user.id_rol === 4) {
      return NextResponse.redirect(
        new URL("/auth/register?oauth=true", url.origin).href
      );
    }
    return NextResponse.next();
  }
  if (url.pathname === "/home" && !session) {
    return NextResponse.redirect(new URL("/auth/login", url.origin).href);
  }
  if (url.pathname === "/auth/reset-password" && session) {
    return NextResponse.redirect(new URL("/home", url.origin).href);
  }
}

const adminRoutes = [
  "/admin/dashboard",
  "/admin/dashboard/users",
  "/admin/dashboard/users/add-user",
  "/admin/dashboard/products",
  "/admin/dashboard/negocios",
];

// export const config = {
//   matcher: ["/((?!api|_next|static|public|favicon.ico).*)"],
// };
