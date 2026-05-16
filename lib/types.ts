export type Moment = {
  id: string
  title: string
  note: string | null
  location: string | null
  occurred_on: string // ISO date (YYYY-MM-DD)
  lat: number | null
  lng: number | null
  photo_pathname: string | null
  created_at: string
}

export type Reminder = {
  id: string
  title: string
  description: string | null
  remind_on: string
  kind: string
  highlighted: boolean
  created_at: string
}

export type Wish = {
  id: string
  title: string
  description: string | null
  category: string
  done: boolean
  created_at: string
}

export const WISH_CATEGORIES = [
  { value: "viaje", label: "Viajes" },
  { value: "experiencia", label: "Experiencias" },
  { value: "pequena", label: "Pequeñas cosas" },
  { value: "algun-dia", label: "Algún día" },
] as const

export const REMINDER_KINDS = [
  { value: "aniversario", label: "Aniversario" },
  { value: "cumple", label: "Cumpleaños" },
  { value: "viaje", label: "Viaje" },
  { value: "tradicion", label: "Tradición" },
  { value: "familia", label: "Familia" },
  { value: "otro", label: "Otro" },
] as const

export function categoryLabel(value: string): string {
  return WISH_CATEGORIES.find((c) => c.value === value)?.label ?? value
}

export function kindLabel(value: string): string {
  return REMINDER_KINDS.find((k) => k.value === value)?.label ?? value
}
