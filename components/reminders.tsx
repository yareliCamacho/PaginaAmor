"use client"

import { useMemo, useState } from "react"
import { Bell, Cake, Heart, Plane, Gift, Clock, Users, Plus, Pencil } from "lucide-react"
import { ReminderEditor } from "./reminder-editor"
import { kindLabel, type Reminder } from "@/lib/types"

const KIND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  aniversario: Heart,
  cumple: Cake,
  viaje: Plane,
  tradicion: Gift,
  familia: Users,
  otro: Clock,
}

function daysFromToday(iso: string): number {
  const target = new Date(iso + "T00:00:00")
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function shortDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
  })
}

function whenLabel(iso: string): string {
  const d = daysFromToday(iso)
  if (d === 0) return "hoy"
  if (d === 1) return "mañana"
  if (d === -1) return "ayer"
  if (d > 0) return `en ${d} días`
  return `hace ${Math.abs(d)} días`
}

export function Reminders({ reminders }: { reminders: Reminder[] }) {
  const sorted = useMemo(() => {
    return [...reminders].sort((a, b) => {
      // Future first by closeness, past last.
      const da = daysFromToday(a.remind_on)
      const db = daysFromToday(b.remind_on)
      const aFuture = da >= 0
      const bFuture = db >= 0
      if (aFuture && !bFuture) return -1
      if (!aFuture && bFuture) return 1
      if (aFuture) return da - db
      return db - da
    })
  }, [reminders])

  const [editing, setEditing] = useState<Reminder | null>(null)
  const [creating, setCreating] = useState(false)

  return (
    <section id="recordatorios" className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Capítulo III — Agenda íntima
            </p>
            <h2
              className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Para no olvidar <em className="italic text-primary">lo importante.</em>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              Aniversarios, cumpleaños, viajes y pequeñas tradiciones. Añade los tuyos
              y márcalos como destacados para fijarlos arriba.
            </p>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs uppercase tracking-wider text-background hover:bg-foreground/90"
            >
              <Bell className="h-3.5 w-3.5" />
              Crear recordatorio
            </button>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="mt-12 rounded-2xl border-2 border-dashed border-border bg-background/50 p-12 text-center">
            <p className="font-serif text-2xl text-foreground">
              Aún no hay recordatorios.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Empieza por el próximo cumpleaños o aniversario.
            </p>
            <button
              type="button"
              onClick={() => setCreating(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-primary-foreground"
            >
              <Plus className="h-4 w-4" />
              Crear el primero
            </button>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((r) => {
              const Icon = KIND_ICONS[r.kind] ?? Clock
              const isHighlight = r.highlighted
              return (
                <article
                  key={r.id}
                  className={`group relative flex flex-col rounded-2xl border p-6 transition-colors ${
                    isHighlight
                      ? "border-primary/20 bg-primary text-primary-foreground"
                      : "border-border bg-background hover:border-accent/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-full ${
                        isHighlight ? "bg-primary-foreground/15" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isHighlight ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                        isHighlight
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-accent/15 text-accent"
                      }`}
                    >
                      {kindLabel(r.kind)}
                    </span>
                  </div>

                  <p
                    className={`mt-6 text-[11px] uppercase tracking-[0.2em] ${
                      isHighlight ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {shortDate(r.remind_on)}
                  </p>
                  <h3
                    className={`mt-1 font-serif text-2xl leading-tight ${
                      isHighlight ? "text-primary-foreground" : "text-foreground"
                    }`}
                    style={{ fontVariationSettings: '"opsz" 144' }}
                  >
                    {r.title}
                  </h3>
                  {r.description && (
                    <p
                      className={`mt-2 text-sm ${
                        isHighlight ? "text-primary-foreground/85" : "text-foreground/75"
                      }`}
                    >
                      {r.description}
                    </p>
                  )}

                  <div
                    className={`mt-6 flex items-center justify-between border-t pt-4 text-xs ${
                      isHighlight
                        ? "border-primary-foreground/20 text-primary-foreground/85"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {whenLabel(r.remind_on)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditing(r)}
                      className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-wider underline-offset-4 hover:underline ${
                        isHighlight ? "text-primary-foreground" : "text-foreground"
                      }`}
                    >
                      <Pencil className="h-3 w-3" />
                      Editar
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {creating && <ReminderEditor open onClose={() => setCreating(false)} reminder={null} />}
      {editing && (
        <ReminderEditor
          open
          onClose={() => setEditing(null)}
          reminder={editing}
          key={editing.id}
        />
      )}
    </section>
  )
}
