const typeStyles = {
  red: {
    bg: 'bg-[#FFEBEE]',
    border: 'border-[#E53935]',
    label: 'text-[#E53935]',
    value: 'text-[#E53935]',
  },
  orange: {
    bg: 'bg-[#FFF3E0]',
    border: 'border-[#F57C00]',
    label: 'text-[#F57C00]',
    value: 'text-[#F57C00]',
  },
  green: {
    bg: 'bg-[#E8F5E9]',
    border: 'border-[#2E7D32]',
    label: 'text-[#2E7D32]',
    value: 'text-[#2E7D32]',
  },
  blue: {
    bg: 'bg-[#EEF3FF]',
    border: 'border-[#1E6BFF]',
    label: 'text-[#1E6BFF]',
    value: 'text-[#1E6BFF]',
  },
  white: {
    bg: 'bg-white',
    border: 'border-[#E9ECEF]',
    label: 'text-[#6C757D]',
    value: 'text-[#212529]',
  },
}

export default function ResultCard({ type = 'white', label, value, subtitle, children, className = '' }) {
  const s = typeStyles[type]
  return (
    <div className={`${s.bg} border ${s.border} rounded-2xl p-5 fade-up ${className}`}>
      {label && (
        <p className={`font-dm text-xs font-semibold uppercase tracking-widest mb-2 ${s.label}`}>
          {label}
        </p>
      )}
      {value && (
        <p className={`font-outfit text-3xl font-extrabold tabular-nums leading-tight ${s.value}`}>
          {value}
        </p>
      )}
      {subtitle && (
        <p className="font-dm text-sm text-[#6C757D] mt-1 leading-relaxed">{subtitle}</p>
      )}
      {children && <div className="mt-3">{children}</div>}
    </div>
  )
}
