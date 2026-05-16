import { put } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const pathname = `moments/${Date.now()}-${safeName}`

    const blob = await put(pathname, file, {
      access: "private",
      contentType: file.type || undefined,
    })

    return NextResponse.json({ pathname: blob.pathname })
  } catch (error) {
    console.error("[v0] Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
