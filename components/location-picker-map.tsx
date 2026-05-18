"use client"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

const pinIcon = L.divIcon({
  className: "",
  html: `
    <div style="
      width: 32px; height: 32px; border-radius: 999px;
      background: oklch(0.38 0.09 25);
      border: 2px solid oklch(0.985 0.012 80);
      box-shadow: 0 6px 16px -4px rgba(80,30,20,0.4);
      display:flex; align-items:center; justify-content:center;
    ">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="oklch(0.985 0.012 80)">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
})

function ClickCapture({
  onChange,
}: {
  onChange: (coords: { lat: number; lng: number }) => void
}) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })
  return null
}

export function LocationPickerMap({
  center,
  lat,
  lng,
  onChange,
}: {
  center: [number, number]
  lat: number | null
  lng: number | null
  onChange: (coords: { lat: number; lng: number }) => void
}) {
  return (
    <MapContainer center={center} zoom={4} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; OpenStreetMap &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      <ClickCapture onChange={onChange} />
      {lat != null && lng != null && <Marker position={[lat, lng]} icon={pinIcon} />}
    </MapContainer>
  )
}
