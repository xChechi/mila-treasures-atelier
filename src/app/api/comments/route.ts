import { NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

// Public: submit a comment (goes to moderation queue)
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { target_type, target_slug, author_name, author_email, message } = body;

  if (!target_type || !target_slug || !author_name || !author_email || !message) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  if (!["product", "article"].includes(target_type)) {
    return Response.json({ error: "Invalid target type" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Database not configured" }, { status: 503 });

  const { error } = await supabase.from("comments").insert({
    target_type,
    target_slug,
    author_name,
    author_email,
    message,
    approved: false,
  });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ ok: true, message: "Comment submitted for review" }, { status: 201 });
}

// Public: get approved comments for a target
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");
  const slug = searchParams.get("slug");

  if (!type || !slug) {
    return Response.json({ error: "type and slug are required" }, { status: 400 });
  }

  const supabase = getSupabase();
  if (!supabase) return Response.json({ error: "Database not configured" }, { status: 503 });

  const { data, error } = await supabase
    .from("comments")
    .select("id, author_name, message, admin_reply, created_at")
    .eq("target_type", type)
    .eq("target_slug", slug)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}
