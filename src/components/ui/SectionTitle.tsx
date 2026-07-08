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
    <div className={`mb-8 flex flex-col gap-3 sm:mb-12 sm:gap-4 ${alignmentClasses} ${className}`}>
      <div className="accent-line" />
      <h2
        className={`text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl ${
          gradient ? 'text-gradient' : dark ? 'text-text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`max-w-2xl text-base leading-relaxed sm:text-xl ${dark ? 'text-white/70' : 'text-text-secondary'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
