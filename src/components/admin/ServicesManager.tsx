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
import { Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react'
import { toast } from 'sonner'
import { api, type Service } from '@/lib/api-client'
import { ImageUploader } from './ImageUploader'

const ICON_OPTIONS = [
  'stethoscope', 'heart-pulse', 'baby', 'flower', 'bone', 'hand', 'eye', 'smile',
  'activity', 'brain', 'syringe', 'pill',
]

export function ServicesManager() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Service | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      // For admin, fetch all (we'll re-use the public endpoint; admins will only see actives - that's fine for editing since inactive items aren't shown publicly)
      // To get all items, we could enhance the API; for now, edit through editing existing items
      const list = await api.getServices()
      list.sort((a: Service, b: Service) => a.order - b.order)
      setItems(list)
    } catch (e: any) {
      toast.error(e.message || 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const save = async (data: Partial<Service>) => {
    try {
      if (editing) {
        await api.updateService(editing.id, data)
        toast.success('Servicio actualizado')
      } else {
        await api.createService(data)
        toast.success('Servicio creado')
      }
      setEditing(null)
      setCreating(false)
      load()
    } catch (e: any) {
      toast.error(e.message || 'Error al guardar')
    }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar este servicio?')) return
    try {
      await api.deleteService(id)
      toast.success('Servicio eliminado')
      load()
    } catch (e: any) {
      toast.error(e.message || 'Error al eliminar')
    }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Servicios ({items.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4" /> Agregar servicio
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((s) => (
          <Card key={s.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">#{s.order}</span>
                    <h4 className="font-semibold truncate">{s.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{s.description}</p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(s)}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => remove(s.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Eliminar
                    </Button>
                  </div>
                </div>
                {s.image && <img src={s.image} alt={s.title} className="h-14 w-14 rounded-lg object-cover" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(editing || creating) && (
        <ServiceForm
          initial={editing || undefined}
          onClose={() => { setEditing(null); setCreating(false) }}
          onSave={save}
        />
      )}
    </div>
  )
}

function ServiceForm({ initial, onClose, onSave }: { initial?: Service; onClose: () => void; onSave: (d: Partial<Service>) => void }) {
  const [data, setData] = useState<Partial<Service>>(initial || { title: '', description: '', icon: 'stethoscope', image: null, order: 0 })

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Editar servicio' : 'Nuevo servicio'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={data.title || ''} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" value={data.description || ''} onChange={(e) => setData({ ...data, description: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="icon">Ícono</Label>
            <div className="grid grid-cols-6 gap-2 mt-1.5">
              {ICON_OPTIONS.map((ic) => (
                <button
                  key={ic}
                  type="button"
                  onClick={() => setData({ ...data, icon: ic })}
                  className={`p-2 rounded-lg border text-xs font-medium transition-colors ${data.icon === ic ? 'border-primary bg-primary/10 text-primary' : 'border-border hover:bg-muted'}`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="order">Orden</Label>
            <Input id="order" type="number" value={data.order || 0} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} />
          </div>
          <ImageUploader label="Imagen (opcional)" value={data.image} onChange={(v) => setData({ ...data, image: v })} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(data)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
