"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ArrowRight, MapPin } from "lucide-react"

// Aniversario ficticio: 14 de febrero
const ANIVERSARIO = new Date(new Date().getFullYear() + 1, 1, 14)

function getRemaining() {
  const now = new Date()
  let target = ANIVERSARIO
  if (target.getTime() < now.getTime()) {
    target = new Date(now.getFullYear() + 1, 1, 14)
  }
  const diff = target.getTime() - now.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  return { days, hours, minutes }
}

export function Hero() {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    setRemaining(getRemaining())
    const id = setInterval(() => setRemaining(getRemaining()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-8 md:pb-20 md:pt-16">
        {/* Tag line */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          <span>Vol. 04 — Otoño</span>
          <span className="hidden h-px w-8 bg-border md:inline-block" />
          <span className="hidden md:inline">un diario para los días que merecen un mapa</span>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Headline */}
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
              <button className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]">
                Abrir nuestro diario
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <a
                href="#mapa"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                <MapPin className="h-4 w-4 text-accent" />
                Ver el mapa de nosotros
              </a>
            </div>
          </div>

          {/* Hero image + countdown card */}
          <div className="relative md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary shadow-[0_30px_60px_-20px_rgba(80,30,20,0.25)]">
              <Image
                src="/moments/hero.jpg"
                alt="Pareja caminando tomados de la mano al atardecer"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                Lisboa · Mayo 2025
              </div>
            </div>

            {/* Countdown card */}
            <div className="absolute -bottom-6 -left-4 w-[88%] max-w-xs rounded-2xl border border-border bg-card p-5 shadow-lg md:-left-12 md:w-[80%]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Próximo aniversario
              </p>
              <p className="mt-1 font-serif text-xl text-foreground">
                14 de febrero
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
          </div>
        </div>

        {/* stat strip */}
        <div className="mt-20 grid grid-cols-2 gap-y-8 border-y border-border py-8 md:mt-28 md:grid-cols-4">
          {[
            { n: "1.247", l: "días juntos" },
            { n: "84", l: "momentos guardados" },
            { n: "23", l: "lugares visitados" },
            { n: "12", l: "deseos por cumplir" },
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
