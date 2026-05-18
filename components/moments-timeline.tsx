"use client"

import Image from "next/image"
import { useState } from "react"
import { MapPin, Pencil, Plus } from "lucide-react"
import { MomentEditor } from "./moment-editor"
import { photoSrc } from "@/lib/photo"
import type { Moment } from "@/lib/types"

const ASPECTS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[1/1]"]

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function MomentsTimeline({ moments }: { moments: Moment[] }) {
  const [editing, setEditing] = useState<Moment | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <section id="momentos" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Capítulo I — Recuerdos
            </p>
            <h2
              className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Los momentos que <em className="italic text-primary">no quiero olvidar.</em>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-foreground px-5 py-3 text-xs uppercase tracking-wider text-background hover:bg-foreground/90 md:self-auto"
          >
            <Plus className="h-3.5 w-3.5" />
            Guardar momento
          </button>
        </div>

        {moments.length === 0 ? (
          <EmptyMoments onCreate={() => setCreating(true)} />
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {moments.map((m, i) => {
              const src = photoSrc(m.photo_pathname)
              const aspect = ASPECTS[i % ASPECTS.length]
              return (
                <article
                  key={m.id}
                  className={`group flex flex-col ${
                    i % 3 === 1 ? "lg:mt-16" : i % 3 === 2 ? "lg:mt-8" : ""
                  }`}
                >
                  <div className={`relative ${aspect} overflow-hidden rounded-xl bg-secondary`}>
                    {src ? (
                      <Image
                        src={src}
                        alt={m.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                        Sin foto
                      </div>
                    )}
                    <button
                      type="button"
                      aria-label="Editar momento"
                      onClick={() => setEditing(m)}
                      className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
                    >
                      <Pencil className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {formatDate(m.occurred_on)}
                    </p>
                    <h3
                      className="mt-2 font-serif text-2xl leading-tight text-foreground"
                      style={{ fontVariationSettings: '"opsz" 144' }}
                    >
                      {m.title}
                    </h3>
                    {m.location && (
                      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {m.location}
                      </p>
                    )}
                    {m.note && (
                      <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/80">
                        {m.note}
                      </p>
                    )}
                  </div>
                </article>
              )
            })}

            <button
              type="button"
              onClick={() => setCreating(true)}
              className="group flex aspect-[4/5] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 p-8 text-center transition-colors hover:border-accent hover:bg-secondary"
            >
              <span className="font-serif text-5xl text-muted-foreground transition-colors group-hover:text-accent">
                +
              </span>
              <span className="mt-3 text-sm font-medium text-foreground">
                Guardar un nuevo momento
              </span>
              <span className="mt-1 text-xs text-muted-foreground">
                Foto, fecha y un par de palabras
              </span>
            </button>
          </div>
        )}
      </div>

      {creating && (
        <MomentEditor open onClose={() => setCreating(false)} moment={null} />
      )}
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

function EmptyMoments({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="mt-12 rounded-2xl border-2 border-dashed border-border bg-background/50 p-12 text-center">
      <p className="font-serif text-2xl text-foreground">
        Aún no hay recuerdos guardados.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Empieza por el primer momento que no quieras olvidar.
      </p>
      <button
        type="button"
        onClick={onCreate}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
      >
        <Plus className="h-4 w-4" />
        Guardar el primero
      </button>
    </div>
  )
}
