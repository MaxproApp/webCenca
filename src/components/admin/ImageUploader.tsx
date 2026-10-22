'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { api } from '@/lib/api-client'

interface Props {
  value: string | null | undefined
  onChange: (val: string | null) => void
  label?: string
}

export function ImageUploader({ value, onChange, label = 'Imagen' }: Props) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onFile = async (file?: File) => {
    if (!file) return
    setUploading(true)
    try {
      const url = await api.uploadImage(file)
      onChange(url)
      toast.success('Imagen subida')
    } catch (e: any) {
      toast.error(e.message || 'Error al subir imagen')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <div className="text-sm font-medium mb-1.5">{label}</div>
      <div className="flex items-start gap-3">
        <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden border border-border bg-muted flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-8 w-8 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <Input
            placeholder="URL o suba un archivo"
            value={value || ''}
            onChange={(e) => onChange(e.target.value || null)}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              {uploading ? 'Subiendo...' : 'Subir imagen'}
            </Button>
            {value && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange(null)}
              >
                <X className="h-4 w-4" /> Quitar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
