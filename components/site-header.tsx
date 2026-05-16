"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Momentos", href: "#momentos" },
  { label: "Mapa", href: "#mapa" },
  { label: "Recordatorios", href: "#recordatorios" },
  { label: "Deseos", href: "#deseos" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#" className="flex items-center gap-2">
          <span
            className="font-serif text-2xl tracking-tight text-foreground md:text-3xl"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
          >
            Querencia
          </span>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:inline">
            est. nosotros
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden rounded-full border border-foreground/20 px-4 py-2 text-xs font-medium uppercase tracking-wider text-foreground transition-colors hover:bg-foreground hover:text-background md:inline-flex"
          >
            Añadir momento
          </button>
          <button
            type="button"
            aria-label="Abrir menú"
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/60 md:hidden",
          open ? "max-h-96" : "max-h-0",
          "transition-[max-height] duration-300 ease-out",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-foreground hover:bg-secondary"
            >
              {item.label}
            </a>
          ))}
          <button className="mt-2 rounded-full bg-primary px-4 py-3 text-sm text-primary-foreground">
            Añadir momento
          </button>
        </nav>
      </div>
    </header>
  )
}
