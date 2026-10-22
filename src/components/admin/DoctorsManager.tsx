'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { api, type Doctor } from '@/lib/api-client'
import { ImageUploader } from './ImageUploader'

export function DoctorsManager() {
  const [items, setItems] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Doctor | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      const list = await api.getDoctors()
      list.sort((a: Doctor, b: Doctor) => a.order - b.order)
      setItems(list)
    } catch (e: any) {
      toast.error(e.message || 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const save = async (data: Partial<Doctor>) => {
    try {
      if (editing) {
        await api.updateDoctor(editing.id, data)
        toast.success('Especialista actualizado')
      } else {
        await api.createDoctor(data)
        toast.success('Especialista creado')
      }
      setEditing(null); setCreating(false); load()
    } catch (e: any) {
      toast.error(e.message || 'Error al guardar')
    }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar este especialista?')) return
    try {
      await api.deleteDoctor(id); toast.success('Eliminado'); load()
    } catch (e: any) { toast.error(e.message || 'Error') }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Especialistas ({items.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4" /> Agregar especialista
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((d) => (
          <Card key={d.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {d.image ? (
                  <img src={d.image} alt={d.name} className="h-14 w-14 rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary text-lg">
                    {d.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{d.name}</h4>
                  <p className="text-xs text-primary">{d.specialty}</p>
                  {d.schedule && <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{d.schedule}</p>}
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(d)}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => remove(d.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(editing || creating) && (
        <DoctorForm initial={editing || undefined} onClose={() => { setEditing(null); setCreating(false) }} onSave={save} />
      )}
    </div>
  )
}

function DoctorForm({ initial, onClose, onSave }: { initial?: Doctor; onClose: () => void; onSave: (d: Partial<Doctor>) => void }) {
  const [data, setData] = useState<Partial<Doctor>>(initial || { name: '', specialty: '', bio: '', image: null, schedule: '', order: 0 })
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Editar especialista' : 'Nuevo especialista'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <Input id="name" value={data.name || ''} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="specialty">Especialidad *</Label>
            <Input id="specialty" value={data.specialty || ''} onChange={(e) => setData({ ...data, specialty: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="bio">Biografía</Label>
            <Textarea id="bio" value={data.bio || ''} onChange={(e) => setData({ ...data, bio: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="schedule">Horario</Label>
            <Input id="schedule" value={data.schedule || ''} onChange={(e) => setData({ ...data, schedule: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="order">Orden</Label>
            <Input id="order" type="number" value={data.order || 0} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} />
          </div>
          <ImageUploader label="Foto" value={data.image} onChange={(v) => setData({ ...data, image: v })} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(data)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
