"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { del } from "@vercel/blob"

async function db() {
  return await createClient()
}

/* ---------- MOMENTS ---------- */

export async function createMoment(input: {
  title: string
  note?: string
  location?: string
  occurred_on: string
  lat?: number | null
  lng?: number | null
  photo_pathname?: string | null
}) {
  const supabase = await db()
  const { error } = await supabase.from("moments").insert({
    title: input.title,
    note: input.note ?? null,
    location: input.location ?? null,
    occurred_on: input.occurred_on,
    lat: input.lat ?? null,
    lng: input.lng ?? null,
    photo_pathname: input.photo_pathname ?? null,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function updateMoment(
  id: string,
  input: Partial<{
    title: string
    note: string | null
    location: string | null
    occurred_on: string
    lat: number | null
    lng: number | null
    photo_pathname: string | null
  }>,
) {
  const supabase = await db()
  const { error } = await supabase.from("moments").update(input).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function deleteMoment(id: string) {
  const supabase = await db()
  const { data: existing } = await supabase
    .from("moments")
    .select("photo_pathname")
    .eq("id", id)
    .maybeSingle()

  const { error } = await supabase.from("moments").delete().eq("id", id)
  if (error) throw new Error(error.message)

  // Best-effort cleanup of associated private blob (only uploaded ones, not seeded /moments/* paths).
  const pathname = existing?.photo_pathname
  if (pathname && !pathname.startsWith("/moments/")) {
    try {
      await del(pathname)
    } catch {
      // ignore
    }
  }

  revalidatePath("/")
}

/* ---------- REMINDERS ---------- */

export async function createReminder(input: {
  title: string
  description?: string
  remind_on: string
  kind?: string
  highlighted?: boolean
}) {
  const supabase = await db()
  const { error } = await supabase.from("reminders").insert({
    title: input.title,
    description: input.description ?? null,
    remind_on: input.remind_on,
    kind: input.kind ?? "otro",
    highlighted: input.highlighted ?? false,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function updateReminder(
  id: string,
  input: Partial<{
    title: string
    description: string | null
    remind_on: string
    kind: string
    highlighted: boolean
  }>,
) {
  const supabase = await db()
  const { error } = await supabase.from("reminders").update(input).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function deleteReminder(id: string) {
  const supabase = await db()
  const { error } = await supabase.from("reminders").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

/* ---------- WISHES ---------- */

export async function createWish(input: {
  title: string
  description?: string
  category?: string
}) {
  const supabase = await db()
  const { error } = await supabase.from("wishes").insert({
    title: input.title,
    description: input.description ?? null,
    category: input.category ?? "experiencia",
    done: false,
  })
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function toggleWish(id: string, done: boolean) {
  const supabase = await db()
  const { error } = await supabase.from("wishes").update({ done }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function updateWish(
  id: string,
  input: Partial<{ title: string; description: string | null; category: string; done: boolean }>,
) {
  const supabase = await db()
  const { error } = await supabase.from("wishes").update(input).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}

export async function deleteWish(id: string) {
  const supabase = await db()
  const { error } = await supabase.from("wishes").delete().eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/")
}
