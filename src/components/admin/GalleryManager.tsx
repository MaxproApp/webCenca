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
import { api, type GalleryItem } from '@/lib/api-client'
import { ImageUploader } from './ImageUploader'

export function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<GalleryItem | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      const list = await api.getGallery()
      list.sort((a: GalleryItem, b: GalleryItem) => a.order - b.order)
      setItems(list)
    } catch (e: any) { toast.error(e.message || 'Error') } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const save = async (data: Partial<GalleryItem>) => {
    try {
      if (editing) { await api.updateGallery(editing.id, data); toast.success('Actualizado') }
      else { await api.createGallery(data); toast.success('Creado') }
      setEditing(null); setCreating(false); load()
    } catch (e: any) { toast.error(e.message || 'Error') }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta imagen?')) return
    try { await api.deleteGallery(id); toast.success('Eliminada'); load() } catch (e: any) { toast.error(e.message) }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Galería ({items.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4" /> Agregar imagen
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((g) => (
          <Card key={g.id}>
            <CardContent className="p-3">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-2">
                {g.image && g.image.startsWith('/') ? (
                  <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">Sin imagen</div>
                )}
              </div>
              <h4 className="font-semibold text-sm truncate">{g.title}</h4>
              {g.category && <p className="text-xs text-primary">{g.category}</p>}
              <div className="mt-2 flex gap-1.5">
                <Button size="sm" variant="outline" onClick={() => setEditing(g)}>
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => remove(g.id)}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(editing || creating) && (
        <GalleryForm initial={editing || undefined} onClose={() => { setEditing(null); setCreating(false) }} onSave={save} />
      )}
    </div>
  )
}

function GalleryForm({ initial, onClose, onSave }: { initial?: GalleryItem; onClose: () => void; onSave: (d: Partial<GalleryItem>) => void }) {
  const [data, setData] = useState<Partial<GalleryItem>>(initial || { title: '', description: '', image: '', category: '', order: 0 })
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial ? 'Editar imagen' : 'Nueva imagen'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={data.title || ''} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" value={data.description || ''} onChange={(e) => setData({ ...data, description: e.target.value })} rows={2} />
          </div>
          <div>
            <Label htmlFor="category">Categoría</Label>
            <Input id="category" value={data.category || ''} onChange={(e) => setData({ ...data, category: e.target.value })} placeholder="Ej: Instalaciones" />
          </div>
          <div>
            <Label htmlFor="order">Orden</Label>
            <Input id="order" type="number" value={data.order || 0} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} />
          </div>
          <ImageUploader label="Imagen *" value={data.image} onChange={(v) => setData({ ...data, image: v || '' })} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(data)} disabled={!data.image}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
