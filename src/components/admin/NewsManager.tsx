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
import { Plus, Pencil, Trash2, Loader2, Star, Calendar } from 'lucide-react'
import { toast } from 'sonner'
import { api, type NewsItem } from '@/lib/api-client'
import { ImageUploader } from './ImageUploader'

const CATEGORY_OPTIONS = ['Noticia', 'Blog', 'Evento']

export function NewsManager() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<NewsItem | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    try {
      const list = await api.getNews()
      list.sort((a: NewsItem, b: NewsItem) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1
        return (a.order || 0) - (b.order || 0)
      })
      setItems(list)
    } catch (e: any) { toast.error(e.message) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const save = async (data: Partial<NewsItem>) => {
    try {
      if (editing) { await api.updateNews(editing.id, data); toast.success('Noticia actualizada') }
      else { await api.createNews(data); toast.success('Noticia creada') }
      setEditing(null); setCreating(false); load()
    } catch (e: any) { toast.error(e.message) }
  }

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta noticia?')) return
    try { await api.deleteNews(id); toast.success('Eliminada'); load() } catch (e: any) { toast.error(e.message) }
  }

  if (loading) return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-lg font-bold">Noticias y Novedades ({items.length})</h3>
        <Button onClick={() => setCreating(true)} size="sm">
          <Plus className="h-4 w-4" /> Nueva noticia
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {items.map((n) => (
          <Card key={n.id} className={n.featured ? 'border-amber-300 ring-1 ring-amber-200' : ''}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                {n.image ? (
                  <img src={n.image} alt={n.title} className="h-14 w-14 rounded-lg object-cover" />
                ) : (
                  <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Calendar className="h-6 w-6" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{n.category}</span>
                    {n.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" /> Destacada
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold mt-1 truncate">{n.title}</h4>
                  {n.excerpt && <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{n.excerpt}</p>}
                  <div className="mt-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setEditing(n)}>
                      <Pencil className="h-3.5 w-3.5" /> Editar
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => remove(n.id)}>
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
        <NewsForm initial={editing || undefined} onClose={() => { setEditing(null); setCreating(false) }} onSave={save} />
      )}
    </div>
  )
}

function NewsForm({ initial, onClose, onSave }: { initial?: NewsItem; onClose: () => void; onSave: (d: Partial<NewsItem>) => void }) {
  const [data, setData] = useState<Partial<NewsItem>>(initial || {
    title: '',
    excerpt: '',
    content: '',
    category: 'Noticia',
    image: null,
    date: new Date().toISOString().split('T')[0],
    author: 'CENCA S.A.S.',
    featured: false,
    order: 0,
  })
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial ? 'Editar noticia' : 'Nueva noticia'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título *</Label>
            <Input id="title" value={data.title || ''} onChange={(e) => setData({ ...data, title: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="excerpt">Resumen (extracto)</Label>
            <Textarea id="excerpt" value={data.excerpt || ''} onChange={(e) => setData({ ...data, excerpt: e.target.value })} rows={2} />
          </div>
          <div>
            <Label htmlFor="content">Contenido *</Label>
            <Textarea id="content" value={data.content || ''} onChange={(e) => setData({ ...data, content: e.target.value })} rows={6} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Label htmlFor="category">Categoría</Label>
              <select
                id="category"
                value={data.category || 'Noticia'}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
              >
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Input id="date" type="date" value={data.date || ''} onChange={(e) => setData({ ...data, date: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="author">Autor</Label>
              <Input id="author" value={data.author || ''} onChange={(e) => setData({ ...data, author: e.target.value })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="order">Orden</Label>
              <Input id="order" type="number" value={data.order || 0} onChange={(e) => setData({ ...data, order: parseInt(e.target.value) || 0 })} />
            </div>
            <div className="flex items-center gap-2 pt-7">
              <input
                id="featured"
                type="checkbox"
                checked={!!data.featured}
                onChange={(e) => setData({ ...data, featured: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="featured" className="cursor-pointer">Marcar como destacada</Label>
            </div>
          </div>
          <ImageUploader label="Imagen (opcional)" value={data.image} onChange={(v) => setData({ ...data, image: v })} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(data)} disabled={!data.title || !data.content}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
