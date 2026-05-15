// =============================================================================
// Componente: SectionTitle — Tema Claro y Cálido
// =============================================================================

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  gradient?: boolean;
  dark?: boolean;       // Para secciones con fondo oscuro
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  align = 'center',
  gradient = false,
  dark = false,
  className = '',
}: SectionTitleProps) {
  const alignmentClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-4 mb-12 ${alignmentClasses} ${className}`}>
      <div className="accent-line" />
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${
          gradient ? 'text-gradient' : dark ? 'text-text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg sm:text-xl max-w-2xl ${dark ? 'text-white/70' : 'text-text-secondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
