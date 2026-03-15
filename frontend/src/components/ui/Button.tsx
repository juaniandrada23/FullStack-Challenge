import type { ButtonProps } from '../../types';

export const Button = ({ variant = 'primary', children, className = '', ...props }: ButtonProps) => {
  const baseStyles = 'px-4 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border cursor-pointer';

  const variantStyles = {
    primary: 'bg-neutral-950 text-white border-neutral-950 hover:bg-neutral-800 focus-visible:ring-neutral-950',
    secondary: 'bg-white text-neutral-700 border-neutral-300 hover:bg-neutral-50 hover:border-neutral-400 focus-visible:ring-neutral-400 shadow-sm',
    danger: 'bg-red-600 text-white border-red-600 hover:bg-red-700 hover:border-red-700 focus-visible:ring-red-500',
    submit: 'bg-accent-600 text-white border-accent-600 hover:bg-accent-700 hover:border-accent-700 focus-visible:ring-accent-500 shadow-sm shadow-accent-600/20',
    accent: 'bg-accent-600 text-white border-accent-600 hover:bg-accent-700 hover:border-accent-700 focus-visible:ring-accent-500',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
