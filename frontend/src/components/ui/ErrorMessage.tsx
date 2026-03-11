import type { ErrorMessageProps } from '../../types';
import { MdErrorOutline } from 'react-icons/md';

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fadeInUp">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 ring-1 ring-red-100">
          <MdErrorOutline className="w-7 h-7 text-red-400" />
        </div>
        <h3 className="text-lg font-bold text-neutral-900 mb-2">Algo sali&oacute; mal</h3>
        <p className="text-sm text-neutral-500 mb-6 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold bg-neutral-950 text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};
