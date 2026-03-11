import { Button, StatusFilter } from './';
import type { HeaderProps } from '../../types';
import { MdAdd } from 'react-icons/md';


export const Header = ({ statusFilter, onStatusFilterChange, onCreateClick, disabled = false }: HeaderProps) => {
  return (
    <header className="bg-neutral-950 sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-5 md:py-6">
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Ordenes
              </h1>
              <span className="hidden sm:inline-block w-px h-6 bg-neutral-700" />
              <span className="hidden sm:block text-sm font-medium text-neutral-400 tracking-wide">
                Panel de Gesti&oacute;n
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <StatusFilter
              value={statusFilter}
              onChange={onStatusFilterChange}
              disabled={disabled}
            />
            <Button
              onClick={onCreateClick}
              disabled={disabled}
              className="whitespace-nowrap gap-2 inline-flex items-center justify-center !bg-white !text-neutral-950 !border-white hover:!bg-neutral-200 hover:!border-neutral-200"
            >
              <MdAdd className="w-5 h-5" />
              Nueva Orden
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
