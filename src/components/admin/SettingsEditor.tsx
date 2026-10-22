'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { api, type Settings } from '@/lib/api-client'

const FIELDS: { key: string; label: string; type?: 'text' | 'textarea'; group: string }[] = [
  // Brand & hero
  { key: 'brandName', label: 'Nombre completo', group: 'Encabezado' },
  { key: 'brandShortName', label: 'Nombre corto', group: 'Encabezado' },
  { key: 'heroBadge', label: 'Insignia hero', group: 'Encabezado' },
  { key: 'heroTitle', label: 'Título principal', type: 'textarea', group: 'Encabezado' },
  { key: 'heroSubtitle', label: 'Subtítulo', type: 'textarea', group: 'Encabezado' },
  // About
  { key: 'aboutTitle', label: 'Título "Nosotros"', group: 'Nosotros' },
  { key: 'aboutContent', label: 'Contenido "Nosotros"', type: 'textarea', group: 'Nosotros' },
  { key: 'missionTitle', label: 'Título misión', group: 'Nosotros' },
  { key: 'missionContent', label: 'Misión', type: 'textarea', group: 'Nosotros' },
  { key: 'visionTitle', label: 'Título visión', group: 'Nosotros' },
  { key: 'visionContent', label: 'Visión', type: 'textarea', group: 'Nosotros' },
  // Stats
  { key: 'statsExperience', label: 'Estadística 1 (valor)', group: 'Estadísticas' },
  { key: 'statsExperienceLabel', label: 'Estadística 1 (etiqueta)', group: 'Estadísticas' },
  { key: 'statsSpecialists', label: 'Estadística 2 (valor)', group: 'Estadísticas' },
  { key: 'statsSpecialistsLabel', label: 'Estadística 2 (etiqueta)', group: 'Estadísticas' },
  { key: 'statsPatients', label: 'Estadística 3 (valor)', group: 'Estadísticas' },
  { key: 'statsPatientsLabel', label: 'Estadística 3 (etiqueta)', group: 'Estadísticas' },
  { key: 'statsServices', label: 'Estadística 4 (valor)', group: 'Estadísticas' },
  { key: 'statsServicesLabel', label: 'Estadística 4 (etiqueta)', group: 'Estadísticas' },
  // Contact
  { key: 'contactAddress', label: 'Dirección', type: 'textarea', group: 'Contacto' },
  { key: 'contactPhone', label: 'Teléfono', group: 'Contacto' },
  { key: 'contactMobile', label: 'Celular', group: 'Contacto' },
  { key: 'contactEmail', label: 'Email', group: 'Contacto' },
  { key: 'contactHoursWeekday', label: 'Horario Lun-Vie', group: 'Contacto' },
  { key: 'contactHoursSaturday', label: 'Horario Sábado', group: 'Contacto' },
  { key: 'contactHoursSunday', label: 'Horario Domingo', group: 'Contacto' },
  { key: 'socialFacebook', label: 'Facebook URL', group: 'Redes sociales' },
  { key: 'socialInstagram', label: 'Instagram URL', group: 'Redes sociales' },
  { key: 'socialTwitter', label: 'Twitter URL', group: 'Redes sociales' },
  { key: 'socialWhatsapp', label: 'WhatsApp (con código país)', group: 'Redes sociales' },
  { key: 'footerText', label: 'Texto del pie', type: 'textarea', group: 'Footer' },
]

export function SettingsEditor() {
  const [values, setValues] = useState<Settings>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.getSettings().then((s) => {
      setValues(s)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handle = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues({ ...values, [k]: e.target.value })

  const save = async () => {
    setSaving(true)
    try {
      await api.saveSettings(values)
      toast.success('Ajustes guardados correctamente.')
    } catch (e: any) {
      toast.error(e.message || 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  const groups = Array.from(new Set(FIELDS.map((f) => f.group)))

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g} className="rounded-2xl border border-blue-100 bg-white p-5">
          <h3 className="font-serif text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" /> {g}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FIELDS.filter((f) => f.group === g).map((f) => (
              <div key={f.key} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                <Label htmlFor={f.key}>{f.label}</Label>
                {f.type === 'textarea' ? (
                  <Textarea id={f.key} value={values[f.key] || ''} onChange={handle(f.key)} rows={3} className="mt-1.5" />
                ) : (
                  <Input id={f.key} value={values[f.key] || ''} onChange={handle(f.key)} className="mt-1.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4 flex justify-end">
        <Button onClick={save} disabled={saving} size="lg" className="shadow-lg">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" /> Guardar cambios
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
