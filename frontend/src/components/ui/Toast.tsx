import { useEffect, useState } from 'react';
import type { ToastProps } from '../../types';
import { MdCheckCircle, MdError, MdWarning, MdInfo, MdClose } from 'react-icons/md';

export const Toast = ({ toast, onRemove }: ToastProps) => {
  const duration = toast.duration || 3000;
  const [barStart, setBarStart] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);
    setBarStart(true);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onRemove]);

  const variantStyles: Record<string, string> = {
    success: 'border-l-emerald-500',
    error: 'border-l-red-500',
    warning: 'border-l-amber-500',
    info: 'border-l-neutral-900',
  };

  const iconColors: Record<string, string> = {
    success: 'text-emerald-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-neutral-700',
  };

  const barColors: Record<string, string> = {
    success: 'bg-emerald-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500',
    info: 'bg-neutral-900',
  };

  const icons = {
    success: <MdCheckCircle className="text-xl" />,
    error: <MdError className="text-xl" />,
    warning: <MdWarning className="text-xl" />,
    info: <MdInfo className="text-xl" />,
  };

  return (
    <div
      className={`relative bg-white border border-neutral-200 border-l-4 ${variantStyles[toast.variant]} px-4 py-3.5 rounded-lg shadow-lg flex items-center gap-3 w-[calc(100vw-2rem)] sm:min-w-[340px] sm:max-w-md animate-slide-in`}
      role="alert"
    >
      <span className={`flex-shrink-0 ${iconColors[toast.variant]}`}>{icons[toast.variant]}</span>
      <p className="flex-1 text-sm font-medium text-neutral-800 leading-snug">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 text-neutral-400 hover:text-neutral-700 rounded p-0.5 transition-colors duration-150 focus:outline-none"
        aria-label="Cerrar notificación"
      >
        <MdClose className="text-lg" />
      </button>
      <div className="absolute left-0 right-0 bottom-0 h-1 bg-neutral-100 rounded-b-lg overflow-hidden" aria-hidden="true">
        <div
          className={`h-full ${barColors[toast.variant]} rounded-b-lg will-change-transform origin-left`}
          style={{
            transform: barStart ? 'scaleX(0)' : 'scaleX(1)',
            transitionProperty: 'transform',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'linear',
          }}
        />
      </div>
    </div>
  );
};
