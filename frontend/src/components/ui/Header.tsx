import { Button, StatusFilter } from './';
import type { HeaderProps } from '../../types';
import { MdAdd } from 'react-icons/md';


export const Header = ({ statusFilter, onStatusFilterChange, onCreateClick, disabled = false }: HeaderProps) => {
  return (
    <header className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 sticky top-0 z-40 shadow-lg">
      <div className="h-1 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-5 md:py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-600 flex items-center justify-center shadow-lg shadow-accent-600/25">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                Ordenes
              </h1>
              <span className="hidden sm:inline-block w-px h-5 bg-neutral-700" />
              <span className="hidden sm:block text-sm font-medium text-neutral-500 tracking-wide">
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
              variant="accent"
              className="whitespace-nowrap gap-2 inline-flex items-center justify-center shadow-lg shadow-accent-600/25"
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
