export const OrderStatus = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Order {
  id: string;
  customer_name: string;
  item: string;
  quantity: number;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderDto {
  customer_name: string;
  item: string;
  quantity: number;
}

export interface UpdateOrderDto {
  customer_name?: string;
  item?: string;
  quantity?: number;
  status?: OrderStatus;
}

export interface PaginationParams {
  page: number;
  page_size: number;
  status?: OrderStatus;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
}

export interface ValidationErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}
