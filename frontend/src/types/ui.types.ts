import type { Toast } from './toast.types';
import type { OrderStatus } from '@shared/types';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'submit' | 'accent';
  children: React.ReactNode;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
}

export interface StatusFilterProps {
  value: OrderStatus | '';
  onChange: (status: OrderStatus | '') => void;
  disabled?: boolean;
}
