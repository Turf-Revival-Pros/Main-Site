import Link from 'next/link';
import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-etr-green text-white hover:bg-etr-green-dark focus:ring-etr-green/40',
  secondary:
    'bg-etr-blue text-white hover:bg-etr-blue-dark focus:ring-etr-blue/40',
  outline:
    'bg-transparent border-2 border-white text-white hover:bg-white/10 focus:ring-white/40',
  // Use this variant for CTAs on green/dark backgrounds. Flipped contrast: white bg with dark green text.
  inverse:
    'bg-white text-etr-green-dark hover:bg-etr-bg-alt shadow-lg focus:ring-white/60',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ariaLabel,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 btn-hover ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
