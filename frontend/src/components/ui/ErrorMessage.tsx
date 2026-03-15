import type { ErrorMessageProps } from '../../types';
import { MdErrorOutline } from 'react-icons/md';

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fadeInUp">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5 ring-1 ring-red-100 shadow-sm">
          <MdErrorOutline className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Algo sali&oacute; mal</h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold bg-accent-600 text-white rounded-xl hover:bg-accent-700 transition-colors cursor-pointer shadow-sm shadow-accent-600/20"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};
