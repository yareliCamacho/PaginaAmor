"use client"

import dynamic from "next/dynamic"
import { useMemo } from "react"

const LocationPickerMap = dynamic(
  () => import("./location-picker-map").then((m) => m.LocationPickerMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-secondary">
        <p className="text-sm text-muted-foreground">Cargando mapa…</p>
      </div>
    ),
  },
)

export function LocationPicker({
  lat,
  lng,
  onChange,
}: {
  lat: number | null
  lng: number | null
  onChange: (coords: { lat: number; lng: number }) => void
}) {
  const center = useMemo<[number, number]>(() => {
    if (lat != null && lng != null) return [lat, lng]
    return [40.4168, -3.7038] // Madrid default
  }, [lat, lng])

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="h-64 w-full">
        <LocationPickerMap center={center} lat={lat} lng={lng} onChange={onChange} />
      </div>
      <p className="border-t border-border bg-secondary/60 px-3 py-2 text-[11px] text-muted-foreground">
        Toca el mapa para fijar dónde ocurrió este recuerdo.
        {lat != null && lng != null && (
          <span className="ml-1 text-foreground/80">
            {lat.toFixed(4)}°, {lng.toFixed(4)}°
          </span>
        )}
      </p>
    </div>
  )
}
