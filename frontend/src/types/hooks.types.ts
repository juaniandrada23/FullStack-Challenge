import type { Order, CreateOrderDto, UpdateOrderDto, OrderStatus } from '@shared/types';

export interface UseOrdersResult {
  orders: Order[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  statusFilter: OrderStatus | '';
  fetchOrders: () => Promise<void>;
  nextPage: () => void;
  previousPage: () => void;
  setStatusFilter: (status: OrderStatus | '') => void;
}

export interface UseOrderMutationResult {
  loading: boolean;
  error: string | null;
  createOrder: (data: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
}

export interface UseModalResult<T = unknown> {
  isOpen: boolean;
  data: T | null;
  open: (itemData?: T) => void;
  close: () => void;
}

export interface UseOrderOperationsResult {
  loading: boolean;
  createWithFeedback: (data: CreateOrderDto) => Promise<Order | null>;
  updateWithFeedback: (id: string, data: UpdateOrderDto) => Promise<Order | null>;
  deleteWithFeedback: (id: string) => Promise<boolean>;
}


