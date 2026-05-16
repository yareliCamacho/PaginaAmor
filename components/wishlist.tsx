"use client"

import { useState } from "react"
import { Plus, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type Wish = {
  id: number
  text: string
  category: "Viajes" | "Experiencias" | "Pequeñas cosas" | "Algún día"
  done: boolean
}

const initialWishes: Wish[] = [
  { id: 1, text: "Ver una aurora boreal en Tromsø", category: "Viajes", done: false },
  { id: 2, text: "Aprender a hacer pasta fresca juntos", category: "Experiencias", done: true },
  { id: 3, text: "Recorrer la Toscana en coche", category: "Viajes", done: false },
  { id: 4, text: "Plantar un olivo en una casa nuestra", category: "Algún día", done: false },
  { id: 5, text: "Bailar bajo la lluvia, otra vez", category: "Pequeñas cosas", done: true },
  { id: 6, text: "Escribirnos cartas durante un mes", category: "Experiencias", done: false },
  { id: 7, text: "Despertar en una cabaña con vistas a un lago", category: "Viajes", done: false },
  { id: 8, text: "Hacer maratón de nuestras pelis favoritas", category: "Pequeñas cosas", done: true },
  { id: 9, text: "Adoptar un perro de orejas grandes", category: "Algún día", done: false },
  { id: 10, text: "Volver al lugar donde nos conocimos", category: "Algún día", done: false },
]

const categories: ("Todas" | Wish["category"])[] = [
  "Todas",
  "Viajes",
  "Experiencias",
  "Pequeñas cosas",
  "Algún día",
]

export function Wishlist() {
  const [wishes, setWishes] = useState(initialWishes)
  const [filter, setFilter] = useState<(typeof categories)[number]>("Todas")

  const visible = wishes.filter((w) => filter === "Todas" || w.category === filter)
  const completed = wishes.filter((w) => w.done).length

  function toggle(id: number) {
    setWishes((ws) => ws.map((w) => (w.id === id ? { ...w, done: !w.done } : w)))
  }

  return (
    <section id="deseos" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Capítulo IV — Lista de deseos
            </p>
            <h2
              className="mt-3 font-serif text-4xl leading-[1.05] tracking-tight text-foreground md:text-6xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Lo que <em className="italic text-primary">todavía</em> queremos vivir.
            </h2>
          </div>
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Progreso compartido
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p
                  className="font-serif text-4xl text-foreground"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {completed}
                  <span className="text-muted-foreground">/{wishes.length}</span>
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  cumplidos
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${(completed / wishes.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                filter === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* List + add */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <ul className="lg:col-span-2 divide-y divide-border rounded-2xl border border-border bg-card">
            {visible.map((w) => (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => toggle(w.id)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-secondary/50"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors",
                      w.done
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-foreground/30 bg-transparent",
                    )}
                  >
                    {w.done && <Check className="h-3.5 w-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "font-serif text-lg leading-snug",
                        w.done ? "text-muted-foreground line-through" : "text-foreground",
                      )}
                      style={{ fontVariationSettings: '"opsz" 144' }}
                    >
                      {w.text}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {w.category}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {/* Add wish form */}
          <div className="rounded-2xl border-2 border-dashed border-border bg-background p-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-accent">
              Añadir un deseo
            </p>
            <h3
              className="mt-3 font-serif text-2xl text-foreground"
              style={{ fontVariationSettings: '"opsz" 144' }}
            >
              ¿Qué nos falta por vivir?
            </h3>
            <form
              className="mt-5 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault()
                const form = e.currentTarget
                const data = new FormData(form)
                const text = String(data.get("text") || "").trim()
                const category = String(data.get("category") || "Pequeñas cosas") as Wish["category"]
                if (!text) return
                setWishes((ws) => [
                  ...ws,
                  { id: Date.now(), text, category, done: false },
                ])
                form.reset()
              }}
            >
              <input
                name="text"
                placeholder="Ej. Pasar un fin de semana sin teléfono"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
              />
              <select
                name="category"
                defaultValue="Experiencias"
                className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
              >
                <option value="Viajes">Viajes</option>
                <option value="Experiencias">Experiencias</option>
                <option value="Pequeñas cosas">Pequeñas cosas</option>
                <option value="Algún día">Algún día</option>
              </select>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01]"
              >
                <Plus className="h-4 w-4" />
                Añadir a la lista
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
