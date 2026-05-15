// =============================================================================
// Componente: ImagePlaceholder — Tema Claro y Cálido
// =============================================================================

interface ImagePlaceholderProps {
  text: string;
  aspectRatio?: string;
  className?: string;
}

export default function ImagePlaceholder({
  text,
  aspectRatio = 'aspect-video',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`
        relative flex flex-col items-center justify-center gap-3
        bg-gradient-to-br from-brand-blue-pale to-bg-section
        border-2 border-dashed border-brand-blue-soft
        rounded-xl overflow-hidden
        ${aspectRatio}
        ${className}
      `}
    >
      <svg
        className="w-12 h-12 text-brand-blue-soft"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM8.25 8.25h.008v.008H8.25V8.25z"
        />
      </svg>
      <p className="text-brand-blue/40 text-sm text-center px-4 max-w-xs">
        {text}
      </p>
    </div>
  );
}
