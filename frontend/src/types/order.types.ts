export interface OrderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export interface OrderDetailsProps {
  order: Order;
}

export interface OrderFormProps {
  initialData?: Order;
  onSubmit: (data: CreateOrderDto | UpdateOrderDto) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  mode?: 'create' | 'edit';
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

import type { Order, CreateOrderDto, UpdateOrderDto } from '@shared/types';
