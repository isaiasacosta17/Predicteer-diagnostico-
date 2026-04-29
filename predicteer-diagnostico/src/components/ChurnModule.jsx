import { useState } from 'react'
import { ArrowLeft } from '@phosphor-icons/react'
import ResultCard from './ResultCard'
import { formatCOP } from '../utils/format'

function NumberInput({ label, value, onChange, min, max, step, prefix, suffix }) {
  return (
    <div>
      <label className="block font-dm text-sm font-semibold text-[#212529] mb-2">{label}</label>
      <div className="flex items-center gap-3 bg-white border border-[#E9ECEF] rounded-xl px-4 py-2">
        <button
          className="num-btn"
          onClick={() => onChange(Math.max(min, value - step))}
          aria-label="Disminuir"
        >−</button>
        <div className="flex-1 text-center">
          <span className="font-dm text-xs text-[#6C757D]">{prefix}</span>
          <span className="font-outfit font-bold text-[#0A1628] text-xl mx-1">
            {value.toLocaleString('es-CO')}
          </span>
          <span className="font-dm text-xs text-[#6C757D]">{suffix}</span>
        </div>
        <button
          className="num-btn"
          onClick={() => onChange(Math.min(max, value + step))}
          aria-label="Aumentar"
        >+</button>
      </div>
    </div>
  )
}

function SliderInput({ label, value, onChange, min, max, step, display }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-dm text-sm font-semibold text-[#212529]">{label}</label>
        <span className="font-outfit font-bold text-[#F57C00] text-sm">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}

export default function ChurnModule({ onBack, onCTA }) {
  const [clientes, setClientes] = useState(500)
  const [ticket, setTicket] = useState(150000)
  const [frecuencia, setFrecuencia] = useState(2)
  const [pctFerias, setPctFerias] = useState(55)

  // Cálculos
  const ingresoActual = clientes * ticket * frecuencia
  const churnActual = 0.35
  const clientasPerdidas = Math.round(clientes * churnActual)
  const ingresoPerdido = clientasPerdidas * ticket * frecuencia
  const clvPorClienta = ticket * frecuencia * 3

  const frecuenciaMejorada = frecuencia + 0.5
  const ingresoConRetencion = clientes * ticket * frecuenciaMejorada * (1 - 0.20)
  const gananciaPotencial = Math.max(0, ingresoConRetencion - ingresoActual)

  const dependenciaFerias = ingresoActual * (pctFerias / 100)
  const ecommerceActual = ingresoActual * (1 - pctFerias / 100)
  const ecommercePotencial = ecommerceActual * 1.6

  return (
    <div className="min-h-[100dvh] bg-[#F8F9FA]">
      <div className="max-w-2xl mx-auto px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 font-dm text-sm text-[#6C757D]
                       hover:text-[#0A1628] transition-colors"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
          <span className="font-outfit font-extrabold text-[#0A1628] text-base tracking-tight">
            PREDICTEER
          </span>
        </div>

        <div className="fade-up mb-8">
          <h1 className="font-outfit font-extrabold text-[#0A1628] text-3xl tracking-tight leading-tight mb-1">
            ¿Cuánto vale una clienta que no vuelve?
          </h1>
          <p className="font-dm text-[#6C757D]">
            Descubre el costo real de no retener
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-white border border-[#E9ECEF] rounded-2xl p-6 mb-6 shadow-sm space-y-6 fade-up">
          <NumberInput
            label="Clientas activas en tu base"
            value={clientes}
            onChange={setClientes}
            min={50} max={10000} step={50}
            suffix="clientas"
          />
          <NumberInput
            label="Ticket promedio por compra"
            value={ticket}
            onChange={setTicket}
            min={10000} max={2000000} step={10000}
            prefix="$"
            suffix="COP"
          />
          <SliderInput
            label="Veces que compra una clienta leal al año"
            value={frecuencia}
            onChange={setFrecuencia}
            min={1} max={6} step={0.5}
            display={`${frecuencia} veces / año`}
          />
          <SliderInput
            label="% de ventas que vienen de ferias"
            value={pctFerias}
            onChange={setPctFerias}
            min={20} max={80} step={5}
            display={`${pctFerias}% de tus ingresos`}
          />
          <p className="font-dm text-xs text-[#6C757D] -mt-2">
            {pctFerias}% de tus ingresos depende de solo 6 días al año
          </p>
        </div>

        {/* Results */}
        <div className="space-y-4 stagger">

          {/* Card roja — dependencia */}
          <ResultCard
            type="red"
            label="TU INGRESO DEPENDE DE 6 DÍAS AL AÑO"
            value={formatCOP(dependenciaFerias)}
            subtitle={`El ${pctFerias}% de tus ventas entra solo en ferias. El resto del año tu e-commerce genera ${formatCOP(ecommerceActual)}`}
          >
            <div className="mt-3">
              <div className="relative h-4 bg-[#E9ECEF] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-[#E53935] rounded-full transition-all duration-300"
                  style={{ width: `${pctFerias}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="font-dm text-xs text-[#E53935] font-semibold">{pctFerias}% Ferias</span>
                <span className="font-dm text-xs text-[#6C757D] font-semibold">{100 - pctFerias}% E-commerce</span>
              </div>
            </div>
          </ResultCard>

          {/* Card naranja — churn */}
          <ResultCard type="orange" label="CLIENTAS PERDIDAS ESTE AÑO (estimado)">
            <p className="font-outfit font-extrabold text-[#F57C00] text-3xl tabular-nums mb-1">
              {clientasPerdidas} clientas
            </p>
            <p className="font-dm text-sm text-[#6C757D] mb-3">
              {formatCOP(ingresoPerdido)} que no van a volver
            </p>
            <div className="border-t border-[#F57C00]/20 pt-3">
              <p className="font-dm text-xs text-[#6C757D] mb-1">Valor de por vida de cada clienta (3 años)</p>
              <p className="font-outfit font-bold text-[#0A1628] text-xl tabular-nums">
                {formatCOP(clvPorClienta)}
              </p>
            </div>
            <p className="font-dm text-xs text-[#6C757D] italic mt-2">
              Estimado con benchmark del sector moda Colombia: churn promedio 35% anual
            </p>
          </ResultCard>

          {/* Card verde */}
          <ResultCard
            type="green"
            label="SI RETIENES EL 15% DE LAS QUE SE IBAN"
            value={`+ ${formatCOP(gananciaPotencial)}`}
            subtitle="adicionales al año con campañas de reactivación y predicción de comportamiento"
          />

          {/* Card azul */}
          <ResultCard type="blue" label="TU E-COMMERCE PUEDE CRECER SIN FERIAS">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-dm text-xs text-[#6C757D] mb-1">Hoy</p>
                <p className="font-outfit font-extrabold text-[#6C757D] text-xl tabular-nums">
                  {formatCOP(ecommerceActual)}
                </p>
              </div>
              <div>
                <p className="font-dm text-xs text-[#6C757D] mb-1">Potencial</p>
                <p className="font-outfit font-extrabold text-[#1E6BFF] text-xl tabular-nums">
                  {formatCOP(ecommercePotencial)}
                </p>
              </div>
            </div>
            <p className="font-dm text-sm text-[#6C757D] mt-3">
              Identificando quién está a punto de irse, antes de que se vaya
            </p>
          </ResultCard>
        </div>

        {/* Phrase */}
        <p className="font-outfit font-bold text-[#0A1628] text-xl text-center my-8 leading-snug">
          "No necesitas más clientas nuevas.<br />Necesitas no perder las que ya tienes."
        </p>

        {/* CTA */}
        <button
          onClick={() => onCTA(ingresoPerdido)}
          className="w-full bg-[#1E6BFF] hover:bg-[#1558d6] text-white font-outfit font-semibold
                     text-lg rounded-2xl py-4 transition-all duration-150
                     active:scale-[0.99] shadow-lg shadow-[#1E6BFF]/20 mb-8"
        >
          Recibir mi diagnóstico personalizado
        </button>
      </div>
    </div>
  )
}
