'use client'

import { useState } from 'react'
import { Lock, Mail, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { api, setAdminToken } from '@/lib/api-client'

export function AdminLogin({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Ingrese email y contraseña.')
      return
    }
    setLoading(true)
    try {
      const res = await api.login(email, password)
      setAdminToken(res.token)
      toast.success('Acceso concedido. ¡Bienvenido!')
      onSuccess()
    } catch (err: any) {
      toast.error(err.message || 'Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-foreground/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-hero text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/15 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold">Panel de administración</h2>
              <p className="text-sm text-blue-50/80">CENCA S.A.S. — Acceso restringido</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@candelaria.com"
                className="pl-9"
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative mt-1.5">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
                autoComplete="current-password"
              />
            </div>
          </div>
          <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-muted-foreground">
            <strong>Credenciales por defecto:</strong>
            <br />
            Email: <code className="text-primary">admin@candelaria.com</code>
            <br />
            Contraseña: <code className="text-primary">admin123</code>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </Button>
        </form>
      </div>
    </div>
  )
}
