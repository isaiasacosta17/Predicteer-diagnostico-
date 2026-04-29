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
        <span className="font-outfit font-bold text-[#1E6BFF] text-sm">{display}</span>
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

export default function InventoryModule({ onBack, onCTA }) {
  const [inventario, setInventario] = useState(300)
  const [precioVenta, setPrecioVenta] = useState(120000)
  const [pctSobrante, setPctSobrante] = useState(35)
  const [descuento, setDescuento] = useState(40)

  // Cálculos
  const costoProduccion = precioVenta * 0.45
  const margenNormal = precioVenta * 0.55
  const prendasSobrantes = Math.round(inventario * (pctSobrante / 100))
  const prendasVendidas = inventario - prendasSobrantes
  const precioLiquidacion = precioVenta * (1 - descuento / 100)
  const margenLiquidacion = Math.max(0, precioLiquidacion - costoProduccion)
  const margenDestruido = (margenNormal - margenLiquidacion) * prendasSobrantes
  const ingresoNormal = prendasSobrantes * precioVenta
  const ingresoLiquidacion = prendasSobrantes * precioLiquidacion
  const diferencia = ingresoNormal - ingresoLiquidacion
  const sellThrough = 100 - pctSobrante

  const prendasSobrantesOptimo = Math.round(inventario * 0.12)
  const margenDestruidoOptimo = (margenNormal - margenLiquidacion) * prendasSobrantesOptimo
  const ahorroPorFeria = Math.max(0, margenDestruido - margenDestruidoOptimo)
  const ahorroAnual = ahorroPorFeria * 3

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
            ¿Cuánto margen estás destruyendo?
          </h1>
          <p className="font-dm text-[#6C757D]">
            Mueve los sliders para ver el impacto en tiempo real
          </p>
        </div>

        {/* Inputs */}
        <div className="bg-white border border-[#E9ECEF] rounded-2xl p-6 mb-6 shadow-sm space-y-6 fade-up">
          <NumberInput
            label="Prendas que llevas a la feria"
            value={inventario}
            onChange={setInventario}
            min={50} max={2000} step={50}
            suffix="prendas"
          />
          <NumberInput
            label="Precio de venta por prenda"
            value={precioVenta}
            onChange={setPrecioVenta}
            min={10000} max={2000000} step={10000}
            prefix="$"
            suffix="COP"
          />
          <SliderInput
            label="Inventario que queda sin vender"
            value={pctSobrante}
            onChange={setPctSobrante}
            min={5} max={70} step={5}
            display={`${pctSobrante}% — ${prendasSobrantes} prendas`}
          />
          <div className="flex justify-between text-xs font-dm mt-1">
            <span className="text-[#2E7D32] font-semibold">12% objetivo</span>
            <span className="text-[#E53935] font-semibold">70% crítico</span>
          </div>
          <SliderInput
            label="Descuento con el que liquidas el sobrante"
            value={descuento}
            onChange={setDescuento}
            min={10} max={70} step={5}
            display={`${descuento}% de descuento`}
          />
        </div>

        {/* Results */}
        <div className="space-y-4 stagger">

          {/* Card roja */}
          <ResultCard
            type="red"
            label="MARGEN DESTRUIDO POR LIQUIDACIÓN"
            value={formatCOP(margenDestruido)}
            subtitle={`${prendasSobrantes} prendas liquidadas a ${formatCOP(precioLiquidacion)} vs precio normal ${formatCOP(precioVenta)}`}
          />

          {/* Card naranja */}
          <ResultCard type="orange" label="INGRESO REAL VS INGRESO POTENCIAL">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-dm text-xs text-[#6C757D] mb-1">Recibiste</p>
                <p className="font-outfit font-extrabold text-[#E53935] text-xl tabular-nums">
                  {formatCOP(ingresoLiquidacion)}
                </p>
              </div>
              <div>
                <p className="font-dm text-xs text-[#6C757D] mb-1">Debías recibir</p>
                <p className="font-outfit font-extrabold text-[#2E7D32] text-xl tabular-nums">
                  {formatCOP(ingresoNormal)}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-[#F57C00]/20 text-center">
              <p className="font-dm text-sm text-[#6C757D]">
                Dejaste de recibir{' '}
                <span className="font-semibold text-[#F57C00]">{formatCOP(diferencia)}</span>
              </p>
            </div>
          </ResultCard>

          {/* Sell-through bar */}
          <div className="bg-white border border-[#E9ECEF] rounded-2xl p-5 fade-up">
            <p className="font-dm text-xs font-semibold uppercase tracking-widest text-[#6C757D] mb-3">
              SELL-THROUGH ACTUAL VS OBJETIVO
            </p>
            <div className="relative h-5 bg-[#E9ECEF] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${sellThrough}%`,
                  backgroundColor: sellThrough >= 88 ? '#2E7D32' : sellThrough >= 70 ? '#F57C00' : '#E53935',
                }}
              />
              {/* Objetivo line at 88% */}
              <div
                className="absolute top-0 h-full w-0.5 bg-[#2E7D32]"
                style={{ left: '88%' }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-outfit font-bold text-sm" style={{
                color: sellThrough >= 88 ? '#2E7D32' : sellThrough >= 70 ? '#F57C00' : '#E53935'
              }}>
                {sellThrough}% actual
              </span>
              <span className="font-dm text-xs text-[#2E7D32] font-semibold">88% objetivo →</span>
            </div>
          </div>

          {/* Card verde */}
          <ResultCard
            type="green"
            label="CON PREDICCIÓN DE INVENTARIO"
            value={`+ ${formatCOP(ahorroAnual)}`}
            subtitle="recuperados al año (3 ferias) llevando solo lo que vas a vender"
          >
            <span className="inline-block mt-1 bg-white/60 text-[#2E7D32] text-xs font-dm font-semibold px-3 py-1 rounded-full border border-[#2E7D32]/20">
              Reduciendo sobrante de {pctSobrante}% a 12%
            </span>
          </ResultCard>
        </div>

        {/* Phrase */}
        <p className="font-outfit font-bold text-[#0A1628] text-xl text-center my-8 leading-snug">
          "No es que vendas menos.<br />Es que llevas de más."
        </p>

        {/* CTA */}
        <button
          onClick={() => onCTA(margenDestruido)}
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
