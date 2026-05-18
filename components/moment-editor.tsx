"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import { Upload, Trash2, Loader2 } from "lucide-react"
import { Modal } from "./ui/modal"
import { LocationPicker } from "./location-picker"
import { createMoment, updateMoment, deleteMoment } from "@/lib/actions"
import { photoSrc } from "@/lib/photo"
import type { Moment } from "@/lib/types"

type Props = {
  open: boolean
  onClose: () => void
  moment?: Moment | null
}

export function MomentEditor({ open, onClose, moment }: Props) {
  const isEdit = Boolean(moment)
  const [title, setTitle] = useState(moment?.title ?? "")
  const [note, setNote] = useState(moment?.note ?? "")
  const [location, setLocation] = useState(moment?.location ?? "")
  const [occurredOn, setOccurredOn] = useState(
    moment?.occurred_on ?? new Date().toISOString().slice(0, 10),
  )
  const [lat, setLat] = useState<number | null>(moment?.lat ?? null)
  const [lng, setLng] = useState<number | null>(moment?.lng ?? null)
  const [photoPathname, setPhotoPathname] = useState<string | null>(
    moment?.photo_pathname ?? null,
  )
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const fd = new FormData()
      fd.append("file", file)
      const res = await fetch("/api/upload", { method: "POST", body: fd })
      if (!res.ok) throw new Error("No se pudo subir la foto")
      const json = await res.json()
      setPhotoPathname(json.pathname)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error subiendo la foto")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  function submit() {
    if (!title.trim() || !occurredOn) {
      setError("Necesitamos al menos un título y una fecha.")
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        if (isEdit && moment) {
          await updateMoment(moment.id, {
            title: title.trim(),
            note: note.trim() || null,
            location: location.trim() || null,
            occurred_on: occurredOn,
            lat,
            lng,
            photo_pathname: photoPathname,
          })
        } else {
          await createMoment({
            title: title.trim(),
            note: note.trim() || undefined,
            location: location.trim() || undefined,
            occurred_on: occurredOn,
            lat,
            lng,
            photo_pathname: photoPathname,
          })
        }
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al guardar")
      }
    })
  }

  function handleDelete() {
    if (!moment) return
    if (!confirm("¿Borrar este momento? Esta acción no se puede deshacer.")) return
    startTransition(async () => {
      try {
        await deleteMoment(moment.id)
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al borrar")
      }
    })
  }

  const previewSrc = photoSrc(photoPathname)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar momento" : "Guardar un momento"}
      subtitle="Una foto, un lugar y un par de palabras."
      size="lg"
    >
      <div className="flex flex-col gap-6">
        {/* Photo */}
        <div>
          <Label>Fotografía</Label>
          <div className="mt-2 grid gap-4 sm:grid-cols-[180px_1fr]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
              {previewSrc ? (
                <Image
                  src={previewSrc}
                  alt="Vista previa"
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Sin foto
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {uploading ? "Subiendo…" : photoPathname ? "Cambiar foto" : "Subir foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
              {photoPathname && (
                <button
                  type="button"
                  onClick={() => setPhotoPathname(null)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                  Quitar foto
                </button>
              )}
              <p className="text-xs text-muted-foreground">
                Se guarda de forma privada en Vercel Blob.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Título">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Atardecer en la Algarve"
              className={inputCls}
            />
          </Field>
          <Field label="Fecha">
            <input
              type="date"
              value={occurredOn}
              onChange={(e) => setOccurredOn(e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label="Lugar">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Lagos, Portugal"
            className={inputCls}
          />
        </Field>

        <Field label="Nota">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Lo que pasó, lo que sentiste, lo que dijo…"
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Ubicación en el mapa">
          <LocationPicker
            lat={lat}
            lng={lng}
            onChange={({ lat, lng }) => {
              setLat(lat)
              setLng(lng)
            }}
          />
        </Field>

        {error && (
          <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col-reverse items-stretch gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {isEdit && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={pending}
                className="inline-flex items-center gap-2 text-sm text-destructive underline-offset-4 hover:underline disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Borrar momento
              </button>
            )}
          </div>
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-5 py-3 text-sm text-foreground hover:bg-secondary"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={pending || uploading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Guardar cambios" : "Guardar momento"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
      {children}
    </span>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <Label>{label}</Label>
      {children}
    </label>
  )
}
