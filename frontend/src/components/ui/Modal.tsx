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

        <div className="relative inline-block w-full max-w-xl overflow-hidden text-left align-middle bg-white shadow-xl rounded-xl animate-scaleIn">
          <div className="bg-neutral-950 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white tracking-wide">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-neutral-400 hover:text-white rounded-lg p-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/20"
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
