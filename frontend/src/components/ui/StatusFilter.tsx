import { OrderStatus } from '@shared/types';
import type { StatusFilterProps } from '../../types';
import { MdKeyboardArrowDown } from 'react-icons/md';

export const StatusFilter = ({ value, onChange, disabled = false }: StatusFilterProps) => {
  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: OrderStatus.PENDING, label: 'Pendiente' },
    { value: OrderStatus.COMPLETED, label: 'Completado' },
    { value: OrderStatus.CANCELLED, label: 'Cancelado' },
  ];

  return (
    <div className="relative w-full sm:w-auto sm:min-w-[200px]">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as OrderStatus | '')}
        disabled={disabled}
        aria-label="Filtrar por estado"
        className="peer w-full appearance-none bg-neutral-900/80 border border-neutral-700 text-neutral-200 text-sm px-3.5 py-2.5 pr-9 rounded-lg font-medium hover:border-neutral-500 focus-visible:ring-2 focus-visible:ring-accent-500/30 focus-visible:border-accent-500 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <MdKeyboardArrowDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 peer-focus:text-neutral-300 transition-colors duration-200" />
    </div>
  );
};
