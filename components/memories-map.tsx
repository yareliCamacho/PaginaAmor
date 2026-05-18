"use client"

import dynamic from "next/dynamic"
import Image from "next/image"
import { useMemo, useState } from "react"
import { MapPin, Calendar, Pencil } from "lucide-react"
import { MomentEditor } from "./moment-editor"
import { photoSrc } from "@/lib/photo"
import type { Moment } from "@/lib/types"

const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary">
      <p className="text-sm text-muted-foreground">Cargando mapa…</p>
    </div>
  ),
})

export type MapPlace = {
  id: string
  name: string
  city: string
  date: string
  coords: [number, number]
  image: string | null
}

function shortDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
}

function countryFromLocation(loc: string | null): string {
  if (!loc) return ""
  const parts = loc.split(",").map((s) => s.trim())
  return parts[parts.length - 1] ?? ""
}

export function MemoriesMap({ moments }: { moments: Moment[] }) {
  const placed = useMemo(
    () => moments.filter((m): m is Moment & { lat: number; lng: number } => m.lat != null && m.lng != null),
    [moments],
  )

  const places = useMemo<MapPlace[]>(
    () =>
      placed.map((m) => ({
        id: m.id,
        name: m.title,
        city: m.location ?? "Sin ubicación",
        date: shortDate(m.occurred_on),
        coords: [m.lat, m.lng],
        image: photoSrc(m.photo_pathname),
      })),
    [placed],
  )

  const countries = useMemo(() => {
    const set = new Set<string>()
    for (const m of placed) {
      const c = countryFromLocation(m.location)
      if (c) set.add(c)
    }
    return set.size
  }, [placed])

  const [activeId, setActiveId] = useState<string | null>(places[0]?.id ?? null)
  const active = places.find((p) => p.id === activeId) ?? places[0] ?? null
  const activeMoment = active ? placed.find((m) => m.id === active.id) ?? null : null

  const [editing, setEditing] = useState<Moment | null>(null)

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
            Cada chincheta es un día, una foto y una historia. Toca un recuerdo para verlo
            o edítalo para cambiar su ubicación.
          </p>
        </div>

        {places.length === 0 ? (
          <div className="mt-10 rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
            <p className="font-serif text-2xl text-foreground">
              Aún no hay lugares en el mapa.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Edita un momento y fija su ubicación para que aparezca aquí.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-secondary md:h-[560px] lg:col-span-8">
              <MapView
                places={places}
                activeId={active?.id ?? places[0].id}
                onSelect={(id) => setActiveId(id)}
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
                {places.length} lugares
                {countries > 0 && ` · ${countries} ${countries === 1 ? "país" : "países"}`}
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-border bg-card p-2">
                <ul className="max-h-[560px] divide-y divide-border overflow-y-auto">
                  {places.map((p) => {
                    const isActive = p.id === active?.id
                    return (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setActiveId(p.id)}
                          className={`flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors ${
                            isActive ? "bg-secondary" : "hover:bg-secondary/60"
                          }`}
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-secondary">
                            {p.image && (
                              <Image
                                src={p.image}
                                alt={p.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            )}
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

              {active && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="relative aspect-[16/10] bg-secondary">
                    {active.image && (
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    )}
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
                    {activeMoment && (
                      <button
                        type="button"
                        onClick={() => setEditing(activeMoment)}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider text-foreground hover:bg-secondary"
                      >
                        <Pencil className="h-3 w-3" />
                        Editar este lugar
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {editing && (
        <MomentEditor
          open
          onClose={() => setEditing(null)}
          moment={editing}
          key={editing.id}
        />
      )}
    </section>
  )
}
