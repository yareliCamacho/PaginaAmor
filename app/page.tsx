import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { MomentsTimeline } from "@/components/moments-timeline"
import { MemoriesMap } from "@/components/memories-map"
import { Reminders } from "@/components/reminders"
import { Wishlist } from "@/components/wishlist"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="paper min-h-screen">
      <SiteHeader />
      <Hero />
      <MomentsTimeline />
      <MemoriesMap />
      <Reminders />
      <Wishlist />
      <SiteFooter />
    </main>
  )
}
