import { cookies } from "next/headers";

const COOKIE_NAME = "mila-admin-token";
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getExpectedToken(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD env var is not set");
  // Simple hash: base64 of password + salt — not meant for high security,
  // just prevents raw password from sitting in the cookie
  return Buffer.from(`mila:${password}:atelier`).toString("base64");
}

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return token === getExpectedToken();
  } catch {
    return false;
  }
}

export function verifyPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

export function getAuthCookie(): { name: string; value: string; maxAge: number; httpOnly: boolean; path: string; sameSite: "lax" } {
  return {
    name: COOKIE_NAME,
    value: getExpectedToken(),
    maxAge: TOKEN_MAX_AGE,
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  };
}

export function getClearAuthCookie(): { name: string; value: string; maxAge: number; path: string } {
  return {
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  };
}
