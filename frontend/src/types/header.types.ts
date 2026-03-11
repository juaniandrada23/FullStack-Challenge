import type { OrderStatus } from '@shared/types';

export interface HeaderProps {
  statusFilter: OrderStatus | '';
  onStatusFilterChange: (status: OrderStatus | '') => void;
  onCreateClick: () => void;
  disabled?: boolean;
}