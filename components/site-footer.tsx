export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p
              className="font-serif text-5xl tracking-tight text-foreground md:text-7xl"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 100' }}
            >
              Querencia
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Un diario íntimo para guardar fotos, fechas, lugares y deseos
              compartidos. Hecho para los que coleccionan días con alguien.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Diario
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li><a href="#momentos" className="hover:text-primary">Momentos</a></li>
              <li><a href="#mapa" className="hover:text-primary">Mapa</a></li>
              <li><a href="#recordatorios" className="hover:text-primary">Recordatorios</a></li>
              <li><a href="#deseos" className="hover:text-primary">Deseos</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Cuenta
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li><a href="#" className="hover:text-primary">Perfil compartido</a></li>
              <li><a href="#" className="hover:text-primary">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary">Exportar diario</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
              Soporte
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              <li><a href="#" className="hover:text-primary">Ayuda</a></li>
              <li><a href="#" className="hover:text-primary">Contacto</a></li>
              <li><a href="#" className="hover:text-primary">Términos</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Querencia. Hecho con cuidado.</p>
          <p className="italic">
            «el lugar donde uno se siente en casa, sin necesidad de explicaciones.»
          </p>
        </div>
      </div>
    </footer>
  )
}
