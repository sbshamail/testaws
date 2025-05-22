import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { key, value } = await req.json();

    const response = NextResponse.json({ message: "Cookie Set!" });

    response.cookies.set(key, JSON.stringify(value), {
      httpOnly: true, // Secure cookie
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to set cookie" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    const cookieStore = cookies();
    const cookieData = cookieStore.get(key)?.value;

    return NextResponse.json({
      key,
      value: cookieData ? JSON.parse(cookieData) : null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get cookie" },
      { status: 500 }
    );
  }
}
