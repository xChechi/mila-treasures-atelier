import { NextRequest } from "next/server";
import { verifyPassword, getAuthCookie, getClearAuthCookie, isAuthenticated } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!verifyPassword(password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookie = getAuthCookie();
  const res = Response.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `${cookie.name}=${cookie.value}; Max-Age=${cookie.maxAge}; HttpOnly; Path=${cookie.path}; SameSite=${cookie.sameSite}`
  );
  return res;
}

export async function GET() {
  const authed = await isAuthenticated();
  return Response.json({ authenticated: authed });
}

export async function DELETE() {
  const cookie = getClearAuthCookie();
  const res = Response.json({ ok: true });
  res.headers.set(
    "Set-Cookie",
    `${cookie.name}=; Max-Age=0; HttpOnly; Path=${cookie.path}`
  );
  return res;
}
