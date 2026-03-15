import type { ModalProps } from '../../types';
import { MdClose } from 'react-icons/md';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto animate-fadeIn">
      <div className="flex items-center justify-center min-h-screen px-4 py-8 sm:p-6">
        <div
          className="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-[2px]"
          onClick={onClose}
          aria-hidden="true"
        />

        <div className="relative inline-block w-full max-w-xl overflow-hidden text-left align-middle bg-white shadow-2xl rounded-2xl animate-scaleIn">
          <div className="h-1 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700" />
          <div className="bg-white px-6 py-4 border-b border-neutral-100">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900 tracking-wide">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg p-1.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                aria-label="Cerrar modal"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="px-6 py-6 bg-white">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
