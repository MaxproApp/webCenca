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
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react'
import { toast } from 'sonner'
import { api, type Testimonial } from '@/lib/api-client'
import { ImageUploader } from './ImageUploader'

export function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      const list = await api.getTestimonials()
      list.sort((a: Testimonial, b: Testimonial) => a.order - b.order)
      setItems(list)
    } catch (e: any) { toast.error(e.message) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const save = async (data: Partial<Testimonial>) => {
    try {
      if (editing) { await api.updateTestimonial(editing.id, data); toast.success('Actualizado') }
      else { await api.createTestimonial(data); toast.success('Creado') }
      setEditing(null); setCreating(false); load()
    } catch (e: any) { toast.error(e.message) }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar este testimonio?')) return
    try { await api.deleteTestimonial(id); toast.success('Eliminado'); load() } catch (e: any) { toast.error(e.message) }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Testimonios ({items.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4" /> Agregar
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((t) => (
          <Card key={t.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold truncate">{t.name}</h4>
                    {t.role && <span className="text-xs text-muted-foreground">· {t.role}</span>}
                  </div>
                  <div className="flex items-center gap-0.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{t.content}</p>
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(t)}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => remove(t.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                {t.image && <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full object-cover" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(editing || creating) && (
        <TestimonialForm initial={editing || undefined} onClose={() => { setEditing(null); setCreating(false) }} onSave={save} />
      )}
    </div>
  )
}

function TestimonialForm({ initial, onClose, onSave }: { initial?: Testimonial; onClose: () => void; onSave: (d: Partial<Testimonial>) => void }) {
  const [data, setData] = useState<Partial<Testimonial>>(initial || { name: '', role: '', content: '', rating: 5, image: null, order: 0 })
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Editar testimonio' : 'Nuevo testimonio'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nombre *</Label>
            <Input id="name" value={data.name || ''} onChange={(e) => setData({ ...data, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="role">Rol / Etiqueta</Label>
            <Input id="role" value={data.role || ''} onChange={(e) => setData({ ...data, role: e.target.value })} placeholder="Ej: Paciente" />
          </div>
          <div>
            <Label htmlFor="content">Contenido *</Label>
            <Textarea id="content" value={data.content || ''} onChange={(e) => setData({ ...data, content: e.target.value })} rows={3} />
          </div>
          <div>
            <Label htmlFor="rating">Calificación (1-5)</Label>
            <Input id="rating" type="number" min={1} max={5} value={data.rating || 5} onChange={(e) => setData({ ...data, rating: parseInt(e.target.value) || 5 })} />
          </div>
          <div>
            <Label htmlFor="order">Orden</Label>
            <Input id="order" type="number" value={data.order || 0} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} />
          </div>
          <ImageUploader label="Foto (opcional)" value={data.image} onChange={(v) => setData({ ...data, image: v })} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(data)} disabled={!data.name || !data.content}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
