"use client"

import { useState, useTransition } from "react"
import { Plus, Check, Sparkles, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createWish, deleteWish, toggleWish } from "@/lib/actions"
import { WISH_CATEGORIES, categoryLabel, type Wish } from "@/lib/types"

const FILTERS = [{ value: "todas", label: "Todas" }, ...WISH_CATEGORIES] as const

export function Wishlist({ wishes }: { wishes: Wish[] }) {
  const [filter, setFilter] = useState<string>("todas")
  const [error, setError] = useState<string | null>(null)
  const [, startTransition] = useTransition()
  const [pendingId, setPendingId] = useState<string | null>(null)

  const visible = wishes.filter((w) => filter === "todas" || w.category === filter)
  const completed = wishes.filter((w) => w.done).length
  const total = wishes.length

  function handleToggle(w: Wish) {
    setPendingId(w.id)
    startTransition(async () => {
      try {
        await toggleWish(w.id, !w.done)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error")
      } finally {
        setPendingId(null)
      }
    })
  }

  function handleDelete(w: Wish) {
    if (!confirm(`¿Borrar "${w.title}"?`)) return
    startTransition(async () => {
      try {
        await deleteWish(w.id)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error")
      }
    })
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
                  <span className="text-muted-foreground">/{total || 0}</span>
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                  cumplidos
                </span>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${total ? (completed / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setFilter(c.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors",
                filter === c.value
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <ul className="divide-y divide-border rounded-2xl border border-border bg-card lg:col-span-2">
            {visible.length === 0 ? (
              <li className="px-5 py-10 text-center text-sm text-muted-foreground">
                Nada por aquí todavía.
              </li>
            ) : (
              visible.map((w) => (
                <li key={w.id} className="group flex items-stretch">
                  <button
                    type="button"
                    onClick={() => handleToggle(w)}
                    disabled={pendingId === w.id}
                    className="flex flex-1 items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-secondary/50 disabled:opacity-60"
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
                        {w.title}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                        {categoryLabel(w.category)}
                      </p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(w)}
                    aria-label="Borrar deseo"
                    className="px-4 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))
            )}
          </ul>

          <AddWishForm />
        </div>
      </div>
    </section>
  )
}

function AddWishForm() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState<string>("experiencia")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    setError(null)
    startTransition(async () => {
      try {
        await createWish({ title: t, category })
        setTitle("")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error")
      }
    })
  }

  return (
    <div className="rounded-2xl border-2 border-dashed border-border bg-background p-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-accent">Añadir un deseo</p>
      <h3
        className="mt-3 font-serif text-2xl text-foreground"
        style={{ fontVariationSettings: '"opsz" 144' }}
      >
        ¿Qué nos falta por vivir?
      </h3>
      <form className="mt-5 flex flex-col gap-3" onSubmit={submit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej. Pasar un fin de semana sin teléfono"
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground outline-none focus:border-accent"
        >
          {WISH_CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending || !title.trim()}
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
        >
          <Plus className="h-4 w-4" />
          {pending ? "Añadiendo…" : "Añadir a la lista"}
        </button>
      </form>
    </div>
  )
}
