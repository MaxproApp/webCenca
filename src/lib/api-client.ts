// Frontend API helpers
export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  image: string | null
  order: number
  active: boolean
}
export interface Doctor {
  id: string
  name: string
  specialty: string
  bio: string | null
  image: string | null
  schedule: string | null
  order: number
  active: boolean
}
export interface GalleryItem {
  id: string
  title: string
  description: string | null
  image: string
  category: string | null
  order: number
  active: boolean
}
export interface Testimonial {
  id: string
  name: string
  role: string | null
  content: string
  rating: number
  image: string | null
  order: number
  active: boolean
}
export interface Appointment {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  date: string | null
  message: string | null
  status: string
  createdAt: string
}
export type Settings = Record<string, string>

const STORAGE_KEY = 'cenca_admin_token'

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY)
}
export function setAdminToken(token: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, token)
}
export function clearAdminToken() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}

function authHeader(): Record<string, string> {
  const token = getAdminToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function jsonReq(url: string, method: string, body?: any) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Error desconocido' }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }
  return res.json()
}

// Auth
export const api = {
  login: (email: string, password: string) =>
    jsonReq('/api/auth', 'POST', { email, password }),

  // Services
  getServices: () => jsonReq('/api/services', 'GET'),
  createService: (data: Partial<Service>) => jsonReq('/api/services', 'POST', data),
  updateService: (id: string, data: Partial<Service>) => jsonReq(`/api/services/${id}`, 'PUT', data),
  deleteService: (id: string) => jsonReq(`/api/services/${id}`, 'DELETE'),

  // Doctors
  getDoctors: () => jsonReq('/api/doctors', 'GET'),
  createDoctor: (data: Partial<Doctor>) => jsonReq('/api/doctors', 'POST', data),
  updateDoctor: (id: string, data: Partial<Doctor>) => jsonReq(`/api/doctors/${id}`, 'PUT', data),
  deleteDoctor: (id: string) => jsonReq(`/api/doctors/${id}`, 'DELETE'),

  // Gallery
  getGallery: () => jsonReq('/api/gallery', 'GET'),
  createGallery: (data: Partial<GalleryItem>) => jsonReq('/api/gallery', 'POST', data),
  updateGallery: (id: string, data: Partial<GalleryItem>) => jsonReq(`/api/gallery/${id}`, 'PUT', data),
  deleteGallery: (id: string) => jsonReq(`/api/gallery/${id}`, 'DELETE'),

  // Testimonials
  getTestimonials: () => jsonReq('/api/testimonials', 'GET'),
  createTestimonial: (data: Partial<Testimonial>) => jsonReq('/api/testimonials', 'POST', data),
  updateTestimonial: (id: string, data: Partial<Testimonial>) => jsonReq(`/api/testimonials/${id}`, 'PUT', data),
  deleteTestimonial: (id: string) => jsonReq(`/api/testimonials/${id}`, 'DELETE'),

  // Settings
  getSettings: () => jsonReq('/api/settings', 'GET'),
  saveSettings: (data: Settings) => jsonReq('/api/settings', 'POST', data),

  // Appointments
  getAppointments: () => jsonReq('/api/appointments', 'GET'),
  createAppointment: (data: Partial<Appointment>) => jsonReq('/api/appointments', 'POST', data),
  updateAppointment: (id: string, data: Partial<Appointment>) => jsonReq(`/api/appointments/${id}`, 'PUT', data),
  deleteAppointment: (id: string) => jsonReq(`/api/appointments/${id}`, 'DELETE'),

  // Upload
  uploadImage: async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: authHeader(),
      body: fd,
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Error al subir imagen' }))
      throw new Error(err.error)
    }
    const { url } = await res.json()
    return url
  },
}
