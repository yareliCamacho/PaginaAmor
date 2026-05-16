"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useState } from "react"
import { MapPin, Calendar } from "lucide-react"

const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary">
      <p className="text-sm text-muted-foreground">Cargando mapa…</p>
    </div>
  ),
})

export type MapPlace = {
  id: number
  name: string
  city: string
  date: string
  coords: [number, number]
  image: string
}

export const PLACES: MapPlace[] = [
  {
    id: 1,
    name: "Nuestro café favorito",
    city: "Madrid, España",
    date: "12 oct 2025",
    coords: [40.4168, -3.7038],
    image: "/moments/cafe.jpg",
  },
  {
    id: 2,
    name: "Atardecer en la Algarve",
    city: "Lagos, Portugal",
    date: "08 sep 2025",
    coords: [37.1028, -8.6735],
    image: "/moments/beach.jpg",
  },
  {
    id: 3,
    name: "Picnic en el Retiro",
    city: "Madrid, España",
    date: "21 jul 2025",
    coords: [40.4153, -3.6844],
    image: "/moments/picnic.jpg",
  },
  {
    id: 4,
    name: "Concierto inolvidable",
    city: "Barcelona, España",
    date: "14 jun 2025",
    coords: [41.3984, 2.1909],
    image: "/moments/concert.jpg",
  },
  {
    id: 5,
    name: "Amanecer en la sierra",
    city: "Gredos, España",
    date: "03 may 2025",
    coords: [40.2521, -5.1364],
    image: "/moments/mountain.jpg",
  },
  {
    id: 6,
    name: "Donde nos conocimos",
    city: "París, Francia",
    date: "19 abr 2022",
    coords: [48.8566, 2.3522],
    image: "/moments/hero.jpg",
  },
]

export function MemoriesMap() {
  const [activeId, setActiveId] = useState<number>(PLACES[0].id)
  const active = PLACES.find((p) => p.id === activeId) ?? PLACES[0]

  return (
    <section id="mapa" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Capítulo II — Atlas
            </p>
            <h2
              className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              El mapa de los lugares que <em className="italic text-primary">nos pertenecen.</em>
            </h2>
          </div>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:col-span-5">
            Cada chincheta es un día, una foto y una historia. Mueve el mapa, abre un
            recuerdo y vuelve allí cuando quieras.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          {/* Map */}
          <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-secondary md:h-[560px] lg:col-span-8">
            <MapView
              places={PLACES}
              activeId={activeId}
              onSelect={(id) => setActiveId(id)}
            />
            <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
              {PLACES.length} lugares · 4 países
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-card p-2">
              <ul className="max-h-[560px] divide-y divide-border overflow-y-auto">
                {PLACES.map((p) => {
                  const isActive = p.id === activeId
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(p.id)}
                        className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors ${
                          isActive ? "bg-secondary" : "hover:bg-secondary/60"
                        }`}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate font-serif text-base text-foreground"
                            style={{ fontVariationSettings: '"opsz" 144' }}
                          >
                            {p.name}
                          </p>
                          <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {p.city}
                          </p>
                        </div>
                        <span className="hidden text-[10px] uppercase tracking-wider text-muted-foreground sm:inline">
                          {p.date}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            {/* Active card */}
            <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
              <div className="relative aspect-[16/10]">
                <Image
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3
                  className="font-serif text-2xl text-foreground"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {active.name}
                </h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {active.city}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {active.date}
                  </span>
                </div>
                <p className="mt-3 text-sm text-foreground/80">
                  {`${active.coords[0].toFixed(4)}°, ${active.coords[1].toFixed(4)}°`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
