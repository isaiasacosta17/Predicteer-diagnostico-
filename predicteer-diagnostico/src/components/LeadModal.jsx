import { useState } from 'react'
import { X, CircleNotch } from '@phosphor-icons/react'
import { formatCOP } from '../utils/format'

// ⚠️ REEMPLAZA ESTO con tu webhook real de Make.com
const MAKE_WEBHOOK_URL = 'https://hook.us2.make.com/TU_WEBHOOK_ID_AQUI'

// ⚠️ REEMPLAZA con tu número de WhatsApp de Predicteer (sin +)
const WHATSAPP_NUMBER = '573001234567'

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block font-dm text-sm font-semibold text-[#212529] mb-1">{label}</label>
      {children}
      {error && (
        <p className="font-dm text-xs text-[#E53935] mt-1">{error}</p>
      )}
    </div>
  )
}

export default function LeadModal({ calculatedLoss, activeModule, onClose, onSuccess }) {
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const [correo, setCorreo] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const isInventory = activeModule === 'inventory'

  const validate = () => {
    const e = {}
    if (!nombre.trim()) e.nombre = 'Campo requerido'
    if (!marca.trim()) e.marca = 'Campo requerido'
    if (!correo.trim()) {
      e.correo = 'Campo requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      e.correo = 'Ingresa un correo válido'
    }
    if (!whatsapp.trim()) {
      e.whatsapp = 'Campo requerido'
    } else if (whatsapp.replace(/\D/g, '').length < 10) {
      e.whatsapp = 'Ingresa un número válido'
    }
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    setLoading(true)
    setServerError('')

    const payload = {
      nombre: nombre.trim(),
      marca: marca.trim(),
      correo: correo.trim(),
      whatsapp: whatsapp.replace(/\D/g, ''),
      modulo: activeModule,
      perdida_calculada: calculatedLoss,
      perdida_formateada: formatCOP(calculatedLoss),
      fecha: new Date().toISOString(),
      fuente: 'herramienta-diagnostico-feria',
    }

    try {
      const res = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setLoading(false)
        onSuccess({ nombre: nombre.trim(), marca: marca.trim(), whatsapp: payload.whatsapp })
      } else {
        throw new Error('Server error')
      }
    } catch {
      setLoading(false)
      setServerError('Hubo un error al enviar. Intenta de nuevo.')
    }
  }

  const inputClass = (field) =>
    `w-full font-dm text-sm border rounded-xl px-4 py-3 outline-none transition-all duration-150
    focus:ring-2 focus:ring-[#1E6BFF] focus:border-[#1E6BFF]
    ${errors[field]
      ? 'border-[#E53935] bg-[#FFEBEE]'
      : field && (nombre || marca || correo || whatsapp)
        ? 'border-[#E9ECEF] bg-white'
        : 'border-[#E9ECEF] bg-white'
    }`

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in"
      style={{ backgroundColor: 'rgba(10,22,40,0.65)', backdropFilter: 'blur(4px)' }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <h2 className="font-outfit font-bold text-[#0A1628] text-xl">
              Recibe tu diagnóstico personalizado
            </h2>
            <p className="font-dm text-sm text-[#6C757D] mt-0.5">
              Te contactamos en menos de 24 horas
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#6C757D] hover:text-[#212529] transition-colors ml-4 mt-0.5"
            aria-label="Cerrar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Loss summary */}
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: isInventory ? '#FFEBEE' : '#FFF3E0' }}
          >
            <p className="font-dm text-xs font-semibold text-[#6C757D] uppercase tracking-wide mb-1">
              Pérdida estimada identificada
            </p>
            <p
              className="font-outfit font-extrabold text-2xl tabular-nums"
              style={{ color: isInventory ? '#E53935' : '#F57C00' }}
            >
              {formatCOP(calculatedLoss)}
            </p>
            <p className="font-dm text-xs text-[#6C757D] mt-0.5">
              {isInventory ? 'en margen destruido por feria' : 'en clientas perdidas este año'}
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Field label="Nombre completo" error={errors.nombre}>
              <input
                type="text"
                className={inputClass('nombre')}
                value={nombre}
                onChange={(e) => { setNombre(e.target.value); setErrors(prev => ({ ...prev, nombre: '' })) }}
                placeholder="Tu nombre"
              />
            </Field>

            <Field label="Nombre de tu marca" error={errors.marca}>
              <input
                type="text"
                className={inputClass('marca')}
                value={marca}
                onChange={(e) => { setMarca(e.target.value); setErrors(prev => ({ ...prev, marca: '' })) }}
                placeholder="Nombre de tu marca"
              />
            </Field>

            <Field label="Correo electrónico" error={errors.correo}>
              <input
                type="email"
                className={inputClass('correo')}
                value={correo}
                onChange={(e) => { setCorreo(e.target.value); setErrors(prev => ({ ...prev, correo: '' })) }}
                placeholder="hola@tumarca.com"
              />
            </Field>

            <Field label="WhatsApp" error={errors.whatsapp}>
              <input
                type="tel"
                className={inputClass('whatsapp')}
                value={whatsapp}
                onChange={(e) => { setWhatsapp(e.target.value); setErrors(prev => ({ ...prev, whatsapp: '' })) }}
                placeholder="Ej: 3001234567"
              />
            </Field>
          </div>

          {serverError && (
            <p className="font-dm text-sm text-[#E53935] text-center">{serverError}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#1E6BFF] hover:bg-[#1558d6] disabled:bg-[#93b4ff]
                       text-white font-outfit font-semibold text-base rounded-xl py-3.5
                       transition-all duration-150 active:scale-[0.99]
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <CircleNotch size={18} className="animate-spin" />
                Enviando...
              </>
            ) : (
              'Enviar diagnóstico'
            )}
          </button>

          <p className="font-dm text-xs text-[#6C757D] text-center">
            Tu información es privada y no será compartida con terceros.
          </p>
        </div>
      </div>
    </div>
  )
}
