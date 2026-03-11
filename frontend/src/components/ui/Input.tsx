import type { InputProps } from '../../types';

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        className={`px-3.5 py-2.5 border rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:border-neutral-950 ${
          error ? 'border-red-400' : 'border-neutral-300 hover:border-neutral-400'
        } ${className}`}
        {...props}
      />
      {error && <span className="text-xs font-medium text-red-500">{error}</span>}
    </div>
  );
};
