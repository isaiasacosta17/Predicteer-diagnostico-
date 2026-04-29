import { Package, UsersThree } from '@phosphor-icons/react'

export default function HomeScreen({ onSelect }) {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F8F9FA]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-5 max-w-2xl mx-auto w-full">
        <div>
          <span className="font-outfit font-extrabold text-[#0A1628] text-xl tracking-tight">
            PREDICTEER
          </span>
        </div>
        <span className="font-dm text-sm text-[#6C757D]">Predict. Steer. Execute.</span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="fade-up text-center mb-10">
          <h1 className="font-outfit font-extrabold text-[#0A1628] text-4xl md:text-5xl tracking-tight leading-none mb-3">
            ¿Cuánto dinero está<br />perdiendo tu marca?
          </h1>
          <p className="font-dm text-[#6C757D] text-lg">
            Elige el diagnóstico que aplica a tu situación
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger">
          {/* Inventario */}
          <button
            onClick={() => onSelect('inventory')}
            className="fade-up bg-white border-2 border-transparent rounded-2xl p-6 text-left
                       shadow-sm hover:border-[#1E6BFF] hover:shadow-md
                       transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
                       focus:outline-none focus:ring-2 focus:ring-[#1E6BFF] focus:ring-offset-2"
          >
            <div className="mb-4">
              <Package size={48} weight="duotone" color="#1E6BFF" />
            </div>
            <h2 className="font-outfit font-bold text-[#0A1628] text-lg mb-1">
              Inventario sin vender
            </h2>
            <p className="font-dm text-[#6C757D] text-sm mb-4 leading-relaxed">
              Calcula cuánto margen destruyes liquidando en feria
            </p>
            <span className="inline-block bg-[#EEF3FF] text-[#1E6BFF] text-xs font-dm font-semibold
                             px-3 py-1 rounded-full">
              Ferias EVA
            </span>
          </button>

          {/* Churn */}
          <button
            onClick={() => onSelect('churn')}
            className="fade-up bg-white border-2 border-transparent rounded-2xl p-6 text-left
                       shadow-sm hover:border-[#F57C00] hover:shadow-md
                       transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
                       focus:outline-none focus:ring-2 focus:ring-[#F57C00] focus:ring-offset-2"
          >
            <div className="mb-4">
              <UsersThree size={48} weight="duotone" color="#F57C00" />
            </div>
            <h2 className="font-outfit font-bold text-[#0A1628] text-lg mb-1">
              Clientes que no vuelven
            </h2>
            <p className="font-dm text-[#6C757D] text-sm mb-4 leading-relaxed">
              Calcula cuánto pierdes cuando una clienta no recompra
            </p>
            <span className="inline-block bg-[#FFF3E0] text-[#F57C00] text-xs font-dm font-semibold
                             px-3 py-1 rounded-full">
              E-commerce
            </span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-5 px-6">
        <p className="font-dm text-xs text-[#6C757D]">
          Diagnóstico gratuito · Sin compromiso · Respuesta en 24h
        </p>
      </footer>
    </div>
  )
}
