'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Trash2, Loader2, Mail, Phone, Calendar, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { api, type Appointment } from '@/lib/api-client'

const STATUS_LABEL: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
}
const STATUS_COLOR: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
}

export function AppointmentsManager() {
  const [items, setItems] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Appointment | null>(null)

  const load = async () => {
    try {
      const list = await api.getAppointments()
      setItems(list)
    } catch (e: any) { toast.error(e.message) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const setStatus = async (a: Appointment, status: string) => {
    try {
      await api.updateAppointment(a.id, { status })
      toast.success('Estado actualizado')
      load()
      setSelected(null)
    } catch (e: any) { toast.error(e.message) }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta cita?')) return
    try { await api.deleteAppointment(id); toast.success('Eliminada'); load() } catch (e: any) { toast.error(e.message) }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Solicitudes de citas ({items.length})</h3>
        <Button onClick={load} size="sm" variant="outline">Actualizar</Button>
      </div>

      {items.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No hay solicitudes de citas.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((a) => (
            <Card key={a.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(a)}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3 justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold">{a.name}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLOR[a.status] || STATUS_COLOR.pending}`}>
                        {STATUS_LABEL[a.status] || a.status}
                      </span>
                    </div>
                    <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {a.email}</span>
                      {a.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {a.phone}</span>}
                      {a.date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>}
                    </div>
                    {a.message && <p className="mt-1.5 text-xs text-muted-foreground line-clamp-1"><MessageSquare className="h-3 w-3 inline mr-1" />{a.message}</p>}
                    <p className="mt-1 text-[10px] text-muted-foreground/70">Recibido: {new Date(a.createdAt).toLocaleString('es-CO')}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-destructive hover:text-destructive shrink-0" onClick={(e) => { e.stopPropagation(); remove(a.id) }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selected && (
        <Dialog open onOpenChange={(o) => !o && setSelected(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Solicitud de cita</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 text-sm">
              <div><strong>Nombre:</strong> {selected.name}</div>
              <div className="flex items-center gap-2"><strong>Email:</strong> <a href={`mailto:${selected.email}`} className="text-primary">{selected.email}</a></div>
              {selected.phone && <div><strong>Teléfono:</strong> {selected.phone}</div>}
              {selected.service && <div><strong>Servicio:</strong> {selected.service}</div>}
              {selected.date && <div><strong>Fecha preferida:</strong> {selected.date}</div>}
              {selected.message && (
                <div>
                  <strong>Mensaje:</strong>
                  <div className="mt-1 p-3 rounded-lg bg-muted text-foreground">{selected.message}</div>
                </div>
              )}
              <div><strong>Estado actual:</strong> <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_COLOR[selected.status] || STATUS_COLOR.pending}`}>{STATUS_LABEL[selected.status] || selected.status}</span></div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStatus(selected, 'pending')}>
                <Clock className="h-4 w-4" /> Pendiente
              </Button>
              <Button variant="outline" className="flex-1 text-emerald-600 hover:text-emerald-700" onClick={() => setStatus(selected, 'confirmed')}>
                <CheckCircle className="h-4 w-4" /> Confirmar
              </Button>
              <Button variant="outline" className="flex-1 text-rose-600 hover:text-rose-700" onClick={() => setStatus(selected, 'cancelled')}>
                <XCircle className="h-4 w-4" /> Cancelar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
