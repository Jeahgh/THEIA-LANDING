// =============================================================================
// Componente: Card — Tema Race Night
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
        rounded-lg p-4 sm:rounded-2xl sm:p-6
        theia-card-glow transition-all duration-300
        ${hover ? 'hover:border-brand-blue-soft hover:-translate-y-1 hover:bg-white hover:shadow-2xl hover:shadow-brand-blue/15' : ''}
        ${glow ? 'animate-pulse-glow' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
