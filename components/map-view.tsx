"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { useEffect } from "react"
import type { MapPlace } from "./memories-map"

const heartIcon = (active: boolean) =>
  L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${active ? 44 : 34}px;
        height: ${active ? 44 : 34}px;
        border-radius: 999px;
        background: ${active ? "oklch(0.38 0.09 25)" : "oklch(0.985 0.012 80)"};
        border: 2px solid ${active ? "oklch(0.985 0.012 80)" : "oklch(0.38 0.09 25)"};
        box-shadow: 0 6px 16px -4px rgba(80,30,20,0.4);
        display:flex; align-items:center; justify-content:center;
        transition: all .2s ease;
      ">
        <svg width="${active ? 18 : 14}" height="${active ? 18 : 14}" viewBox="0 0 24 24"
             fill="${active ? "oklch(0.985 0.012 80)" : "oklch(0.38 0.09 25)"}"
             stroke="${active ? "oklch(0.985 0.012 80)" : "oklch(0.38 0.09 25)"}"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </div>
    `,
    iconSize: [active ? 44 : 34, active ? 44 : 34],
    iconAnchor: [active ? 22 : 17, active ? 22 : 17],
  })

function FlyTo({ coords }: { coords: [number, number] }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(coords, Math.max(map.getZoom(), 6), { duration: 0.8 })
  }, [coords, map])
  return null
}

export function MapView({
  places,
  activeId,
  onSelect,
}: {
  places: MapPlace[]
  activeId: number
  onSelect: (id: number) => void
}) {
  const active = places.find((p) => p.id === activeId) ?? places[0]

  return (
    <MapContainer
      center={active.coords}
      zoom={5}
      scrollWheelZoom={false}
      className="h-full w-full"
      worldCopyJump
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <FlyTo coords={active.coords} />
      {places.map((p) => (
        <Marker
          key={p.id}
          position={p.coords}
          icon={heartIcon(p.id === activeId)}
          eventHandlers={{ click: () => onSelect(p.id) }}
        >
          <Popup>
            <div className="font-sans">
              <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                {p.date}
              </p>
              <p className="mt-0.5 font-serif text-base text-neutral-900">
                {p.name}
              </p>
              <p className="text-xs text-neutral-600">{p.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
