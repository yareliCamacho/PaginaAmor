"use client"

import { useState, useTransition } from "react"
import { Loader2, Trash2 } from "lucide-react"
import { Modal } from "./ui/modal"
import { createReminder, updateReminder, deleteReminder } from "@/lib/actions"
import { REMINDER_KINDS, type Reminder } from "@/lib/types"

export function ReminderEditor({
  open,
  onClose,
  reminder,
}: {
  open: boolean
  onClose: () => void
  reminder?: Reminder | null
}) {
  const isEdit = Boolean(reminder)
  const [title, setTitle] = useState(reminder?.title ?? "")
  const [description, setDescription] = useState(reminder?.description ?? "")
  const [remindOn, setRemindOn] = useState(
    reminder?.remind_on ?? new Date().toISOString().slice(0, 10),
  )
  const [kind, setKind] = useState(reminder?.kind ?? "aniversario")
  const [highlighted, setHighlighted] = useState(reminder?.highlighted ?? false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function submit() {
    if (!title.trim() || !remindOn) {
      setError("Necesitamos al menos un título y una fecha.")
      return
    }
    setError(null)
    startTransition(async () => {
      try {
        if (isEdit && reminder) {
          await updateReminder(reminder.id, {
            title: title.trim(),
            description: description.trim() || null,
            remind_on: remindOn,
            kind,
            highlighted,
          })
        } else {
          await createReminder({
            title: title.trim(),
            description: description.trim() || undefined,
            remind_on: remindOn,
            kind,
            highlighted,
          })
        }
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al guardar")
      }
    })
  }

  function handleDelete() {
    if (!reminder) return
    if (!confirm("¿Borrar este recordatorio?")) return
    startTransition(async () => {
      try {
        await deleteReminder(reminder.id)
        onClose()
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al borrar")
      }
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar recordatorio" : "Crear recordatorio"}
      subtitle="Para no olvidar lo importante."
    >
      <div className="flex flex-col gap-5">
        <Field label="Título">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Aniversario nº 5"
            className={inputCls}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fecha">
            <input
              type="date"
              value={remindOn}
              onChange={(e) => setRemindOn(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Tipo">
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value)}
              className={inputCls}
            >
              {REMINDER_KINDS.map((k) => (
                <option key={k.value} value={k.value}>
                  {k.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Nota">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Detalles, planes, ideas…"
            className={`${inputCls} resize-none`}
          />
        </Field>

        <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
          <input
            type="checkbox"
            checked={highlighted}
            onChange={(e) => setHighlighted(e.target.checked)}
            className="h-4 w-4 accent-[color:var(--primary)]"
          />
          <span className="text-sm text-foreground">Fijar como destacado</span>
        </label>

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
                Borrar
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
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
            >
              {pending && <Loader2 className="h-4 w-4 animate-spin" />}
              {isEdit ? "Guardar" : "Crear"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-accent"

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  )
}
