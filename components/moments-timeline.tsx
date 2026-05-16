import Image from "next/image"
import { MapPin, Heart } from "lucide-react"

const moments = [
  {
    id: 1,
    title: "Café lento en domingo",
    date: "12 de octubre, 2025",
    place: "Casa, Madrid",
    note: "Te quedaste dormida sobre mi hombro mientras leía. No quise moverme en una hora.",
    image: "/moments/cafe.jpg",
    aspect: "aspect-[4/5]",
  },
  {
    id: 2,
    title: "Atardecer en la Algarve",
    date: "08 de septiembre, 2025",
    place: "Lagos, Portugal",
    note: "El cielo se puso de un rosa imposible. Dijiste que querías quedarte aquí para siempre.",
    image: "/moments/beach.jpg",
    aspect: "aspect-[3/4]",
  },
  {
    id: 3,
    title: "Picnic improvisado",
    date: "21 de julio, 2025",
    place: "Parque del Retiro",
    note: "Trajiste el queso, yo el vino. Olvidamos el sacacorchos. Lo abrimos con un zapato.",
    image: "/moments/picnic.jpg",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    title: "La canción que era nuestra",
    date: "14 de junio, 2025",
    place: "Razzmatazz, Barcelona",
    note: "La tocaron en directo. No me solté de tu mano en toda la noche.",
    image: "/moments/concert.jpg",
    aspect: "aspect-[1/1]",
  },
  {
    id: 5,
    title: "Amanecer a 2.300 metros",
    date: "03 de mayo, 2025",
    place: "Sierra de Gredos",
    note: "Subimos a oscuras. Llegamos justo a tiempo. Me dijiste te amo y el sol salió.",
    image: "/moments/mountain.jpg",
    aspect: "aspect-[3/4]",
  },
]

export function MomentsTimeline() {
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
          <div className="flex items-center gap-3">
            <button className="rounded-full border border-foreground/20 px-4 py-2 text-xs uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background">
              Todos
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
              Este año
            </button>
            <button className="rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
              Favoritos
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {moments.map((m, i) => (
            <article
              key={m.id}
              className={`group flex flex-col ${
                i === 1 ? "lg:mt-16" : i === 2 ? "lg:mt-8" : i === 4 ? "lg:mt-12" : ""
              }`}
            >
              <div
                className={`relative ${m.aspect} overflow-hidden rounded-xl bg-secondary`}
              >
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <button
                  type="button"
                  aria-label="Marcar como favorito"
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 backdrop-blur transition-colors hover:bg-background"
                >
                  <Heart className="h-4 w-4 text-primary" fill={i % 2 === 0 ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {m.date}
                </p>
                <h3
                  className="mt-2 font-serif text-2xl leading-tight text-foreground"
                  style={{ fontVariationSettings: '"opsz" 144' }}
                >
                  {m.title}
                </h3>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {m.place}
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/80">
                  {m.note}
                </p>
              </div>
            </article>
          ))}

          {/* Add new moment card */}
          <button
            type="button"
            className="group flex aspect-[4/5] flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background/50 p-8 text-center transition-colors hover:border-accent hover:bg-secondary lg:mt-4"
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
      </div>
    </section>
  )
}
