import { Modal } from './Modal';
import { Button } from './Button';
import type { ConfirmDialogProps } from '../../types';
import { MdWarning, MdInfo } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  loading = false,
  variant = 'danger'
}: ConfirmDialogProps) => {
  const getIconByVariant = () => {
    if (variant === 'danger') {
      return (
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center ring-1 ring-red-100">
          <MdWarning className="w-6 h-6 text-red-500" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center ring-1 ring-neutral-200">
        <MdInfo className="w-6 h-6 text-neutral-600" />
      </div>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          {getIconByVariant()}
          <p className="text-sm text-neutral-600 leading-relaxed max-w-sm">
            {message}
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-t border-neutral-100">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
            className="min-w-[100px] w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={onConfirm}
            disabled={loading}
            className="min-w-[100px] w-full sm:w-auto"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <AiOutlineLoading3Quarters className="animate-spin h-4 w-4" />
                Procesando...
              </span>
            ) : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
