import { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return Response.json({ error: "Invalid file type. Use JPG, PNG, WebP, or GIF." }, { status: 400 });
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ error: "File too large. Maximum 5MB." }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "webp";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = `products/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const { error: uploadError } = await getSupabaseAdmin().storage
    .from("product-images")
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return Response.json({ error: uploadError.message }, { status: 500 });
  }

  const { data: urlData } = getSupabaseAdmin().storage
    .from("product-images")
    .getPublicUrl(filePath);

  return Response.json({ url: urlData.publicUrl });
}
