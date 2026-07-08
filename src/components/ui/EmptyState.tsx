type EmptyStateTone = 'light' | 'dark' | 'admin';

interface EmptyStateProps {
  children: React.ReactNode;
  tone?: EmptyStateTone;
  className?: string;
}

const toneClasses: Record<EmptyStateTone, string> = {
  light: 'text-text-secondary',
  dark: 'text-white/80',
  admin: 'text-text-muted',
};

export default function EmptyState({ children, tone = 'light', className = '' }: EmptyStateProps) {
  return (
    <p className={`text-center text-sm font-medium ${toneClasses[tone]} ${className}`}>
      {children}
    </p>
  );
}
