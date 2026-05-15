// =============================================================================
// Componente: Card — Tema Claro y Cálido
// =============================================================================

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  glow = false,
  className = '',
}: CardProps) {
  return (
    <div
      className={`
        bg-bg-card rounded-2xl border border-border-subtle p-6
        shadow-sm transition-all duration-300
        ${hover ? 'hover:bg-bg-card-hover hover:border-brand-blue-soft hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue/5' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
