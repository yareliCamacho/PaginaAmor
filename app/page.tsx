import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { MomentsTimeline } from "@/components/moments-timeline"
import { MemoriesMap } from "@/components/memories-map"
import { Reminders } from "@/components/reminders"
import { Wishlist } from "@/components/wishlist"
import { SiteFooter } from "@/components/site-footer"
import { createClient } from "@/lib/supabase/server"
import type { Moment, Reminder, Wish } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function Page() {
  const supabase = await createClient()

  const [{ data: momentsData }, { data: remindersData }, { data: wishesData }] =
    await Promise.all([
      supabase.from("moments").select("*").order("occurred_on", { ascending: false }),
      supabase.from("reminders").select("*").order("remind_on", { ascending: true }),
      supabase.from("wishes").select("*").order("created_at", { ascending: true }),
    ])

  const moments = (momentsData ?? []) as Moment[]
  const reminders = (remindersData ?? []) as Reminder[]
  const wishes = (wishesData ?? []) as Wish[]

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const upcoming =
    reminders.find((r) => new Date(r.remind_on + "T00:00:00") >= today) ??
    reminders[0] ??
    null

  const heroMoment = moments[0] ?? null

  const placesCount = moments.filter((m) => m.lat != null && m.lng != null).length
  const pendingWishes = wishes.filter((w) => !w.done).length

  return (
    <main className="paper min-h-screen">
      <SiteHeader />
      <Hero
        heroMoment={heroMoment}
        upcoming={upcoming}
        stats={{
          moments: moments.length,
          places: placesCount,
          wishes: pendingWishes,
        }}
      />
      <MomentsTimeline moments={moments} />
      <MemoriesMap moments={moments} />
      <Reminders reminders={reminders} />
      <Wishlist wishes={wishes} />
      <SiteFooter />
    </main>
  )
}
