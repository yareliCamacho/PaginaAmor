import { Bell, Cake, Heart, Plane, Gift, Clock } from "lucide-react"

const reminders = [
  {
    id: 1,
    icon: Heart,
    title: "Aniversario nº 4",
    date: "14 feb",
    when: "en 96 días",
    note: "Empieza a pensar la sorpresa.",
    pinned: true,
  },
  {
    id: 2,
    icon: Cake,
    title: "Cumple de Lucía",
    date: "27 nov",
    when: "en 18 días",
    note: "Reservar mesa en La Tasquita.",
    pinned: true,
  },
  {
    id: 3,
    icon: Plane,
    title: "Vuelo a Roma",
    date: "03 dic",
    when: "en 24 días",
    note: "Iberia 3022 · 07:40h · Maleta lista.",
    pinned: false,
  },
  {
    id: 4,
    icon: Gift,
    title: "Día de regalarnos algo pequeño",
    date: "todos los 15",
    when: "este sábado",
    note: "Tradición desde 2023.",
    pinned: false,
  },
  {
    id: 5,
    icon: Clock,
    title: "Llamada con sus padres",
    date: "domingo",
    when: "en 3 días",
    note: "20:00h · trae el postre.",
    pinned: false,
  },
]

export function Reminders() {
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
              Aniversarios, cumpleaños, viajes y pequeñas tradiciones. Querencia te
              avisa con tiempo, sin que te sientas como una agenda.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">
              <Bell className="h-3.5 w-3.5" />
              Crear recordatorio
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((r, i) => {
            const Icon = r.icon
            const isHighlight = i === 0
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
                  {r.pinned && (
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${
                        isHighlight
                          ? "bg-primary-foreground/15 text-primary-foreground"
                          : "bg-accent/15 text-accent"
                      }`}
                    >
                      Fijado
                    </span>
                  )}
                </div>

                <p
                  className={`mt-6 text-[11px] uppercase tracking-[0.2em] ${
                    isHighlight ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}
                >
                  {r.date}
                </p>
                <h3
                  className={`mt-1 font-serif text-2xl leading-tight ${
                    isHighlight ? "text-primary-foreground" : "text-foreground"
                  }`}
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {r.title}
                </h3>
                <p
                  className={`mt-2 text-sm ${
                    isHighlight ? "text-primary-foreground/85" : "text-foreground/75"
                  }`}
                >
                  {r.note}
                </p>

                <div
                  className={`mt-6 flex items-center justify-between border-t pt-4 text-xs ${
                    isHighlight
                      ? "border-primary-foreground/20 text-primary-foreground/85"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {r.when}
                  </span>
                  <button
                    className={`text-[11px] uppercase tracking-wider underline-offset-4 hover:underline ${
                      isHighlight ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    Editar
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
