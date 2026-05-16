"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, MapPin } from "lucide-react"
import { photoSrc } from "@/lib/photo"
import type { Moment, Reminder } from "@/lib/types"

function getRemaining(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  return { days, hours, minutes }
}

function formatReminderDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
  })
}

export function Hero({
  heroMoment,
  upcoming,
  stats,
}: {
  heroMoment: Moment | null
  upcoming: Reminder | null
  stats: { moments: number; places: number; wishes: number }
}) {
  const target = upcoming ? new Date(upcoming.remind_on + "T00:00:00") : null
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    if (!target) return
    setRemaining(getRemaining(target))
    const id = setInterval(() => setRemaining(getRemaining(target)), 60_000)
    return () => clearInterval(id)
  }, [target?.getTime()])

  const heroImg = photoSrc(heroMoment?.photo_pathname ?? "/moments/hero.jpg")

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-8 md:pb-20 md:pt-16">
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Vol. 04 — Otoño</span>
          <span className="hidden h-px w-8 bg-border md:inline-block" />
          <span className="hidden md:inline">un diario para los días que merecen un mapa</span>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h1
              className="font-serif text-5xl leading-[1.02] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Cada beso,
              <br />
              <em className="italic text-primary">cada lugar,</em>
              <br />
              guardado.
            </h1>

            <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Querencia es el lugar donde tus momentos en pareja viven en un solo sitio:
              fotos con coordenadas, recuerdos con fecha y deseos por cumplir juntos.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#momentos"
                className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
              >
                Abrir nuestro diario
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#mapa"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                <MapPin className="h-4 w-4 text-accent" />
                Ver el mapa de nosotros
              </a>
            </div>
          </div>

          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-[0_30px_60px_-20px_rgba(80,30,20,0.25)]">
              {heroImg && (
                <Image
                  src={heroImg}
                  alt={heroMoment?.title ?? "Recuerdo destacado"}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              {heroMoment?.location && (
                <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                  {heroMoment.location}
                </div>
              )}
            </div>

            {upcoming && (
              <div className="absolute -bottom-6 -left-4 w-[88%] max-w-xs rounded-2xl border border-border bg-card p-5 shadow-lg md:-left-12 md:w-[80%]">
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Próximo recordatorio
                </p>
                <p className="mt-1 font-serif text-xl text-foreground">
                  {upcoming.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatReminderDate(upcoming.remind_on)}
                </p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg bg-secondary px-2 py-2">
                    <p className="font-serif text-2xl text-primary">
                      {String(remaining.days).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">días</p>
                  </div>
                  <div className="rounded-lg bg-secondary px-2 py-2">
                    <p className="font-serif text-2xl text-primary">
                      {String(remaining.hours).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">hrs</p>
                  </div>
                  <div className="rounded-lg bg-secondary px-2 py-2">
                    <p className="font-serif text-2xl text-primary">
                      {String(remaining.minutes).padStart(2, "0")}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">min</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-y-8 border-y border-border py-8 md:mt-28 md:grid-cols-4">
          {[
            { n: String(stats.moments), l: "momentos guardados" },
            { n: String(stats.places), l: "lugares en el mapa" },
            { n: String(stats.wishes), l: "deseos por cumplir" },
            { n: "∞", l: "días por venir" },
          ].map((s) => (
            <div key={s.l} className="text-center md:text-left">
              <p
                className="font-serif text-4xl text-foreground md:text-5xl"
                style={{ fontVariationSettings: '"opsz" 144' }}
              >
                {s.n}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
