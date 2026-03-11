import { Button } from '../ui';
import type { PaginationProps } from '../../types';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Pagination = ({ currentPage, totalPages, onNext, onPrevious }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-neutral-100">
      <p className="text-xs text-neutral-400 font-medium tabular-nums">
        P&aacute;gina <span className="text-neutral-700 font-semibold">{currentPage}</span> de{' '}
        <span className="text-neutral-700 font-semibold">{totalPages}</span>
      </p>
      <div className="flex gap-1.5">
        <Button
          onClick={onPrevious}
          disabled={currentPage === 1}
          variant="secondary"
          className="!px-2.5 !py-1.5 !text-xs !shadow-none inline-flex items-center gap-1"
        >
          <MdChevronLeft className="w-4 h-4" />
          Anterior
        </Button>
        <Button
          onClick={onNext}
          disabled={currentPage === totalPages}
          variant="secondary"
          className="!px-2.5 !py-1.5 !text-xs !shadow-none inline-flex items-center gap-1"
        >
          Siguiente
          <MdChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
