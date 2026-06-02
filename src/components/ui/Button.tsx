// =============================================================================
// Componente: Button — Tema Claro y Cálido
// =============================================================================

import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-blue hover:bg-brand-blue-vivid text-white shadow-md shadow-brand-blue/20 hover:shadow-lg hover:shadow-brand-blue/30 hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-accent-warm hover:bg-brand-blue-light text-brand-navy shadow-md shadow-accent-warm/20 hover:shadow-lg hover:shadow-brand-blue/20 hover:-translate-y-0.5 active:translate-y-0',
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white hover:-translate-y-0.5 active:translate-y-0',
    white: 'bg-white hover:bg-gray-50 text-brand-blue shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base px-6 py-3',
    lg: 'text-lg px-8 py-4',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return <Link href={href} className={classes}>{children}</Link>;
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
