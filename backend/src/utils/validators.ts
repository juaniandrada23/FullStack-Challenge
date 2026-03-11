import { OrderStatus } from '@shared/types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateCreateOrder = (data: unknown): void => {
  const orderData = data as Record<string, unknown>;
  
  if (!orderData.customer_name || typeof orderData.customer_name !== 'string') {
    throw new ValidationError('El nombre del cliente es requerido y debe ser texto');
  }

  if (!orderData.item || typeof orderData.item !== 'string') {
    throw new ValidationError('El artículo es requerido y debe ser texto');
  }

  if (!orderData.quantity || typeof orderData.quantity !== 'number' || orderData.quantity <= 0) {
    throw new ValidationError('La cantidad es requerida y debe ser un número mayor a 0');
  }
};

export const validateUpdateOrder = (data: unknown): void => {
  const orderData = data as Record<string, unknown>;
  
  if (orderData.customer_name !== undefined && typeof orderData.customer_name !== 'string') {
    throw new ValidationError('El nombre del cliente debe ser texto');
  }

  if (orderData.item !== undefined && typeof orderData.item !== 'string') {
    throw new ValidationError('El artículo debe ser texto');
  }

  if (orderData.quantity !== undefined && (typeof orderData.quantity !== 'number' || orderData.quantity <= 0)) {
    throw new ValidationError('La cantidad debe ser un número mayor a 0');
  }

  if (orderData.status !== undefined && !Object.values(OrderStatus).includes(orderData.status as OrderStatus)) {
    throw new ValidationError(
      `El estado debe ser uno de: ${Object.values(OrderStatus).join(', ')}`
    );
  }
};

export const validatePaginationParams = (page: unknown, pageSize: unknown, status?: unknown): void => {
  const pageNum = parseInt(page as string);
  const pageSizeNum = parseInt(pageSize as string);

  if (isNaN(pageNum) || pageNum < 1) {
    throw new ValidationError('El parámetro page debe ser un número mayor o igual a 1');
  }

  if (isNaN(pageSizeNum) || pageSizeNum < 1 || pageSizeNum > 100) {
    throw new ValidationError('El parámetro page_size debe ser un número entre 1 y 100');
  }

  if (status !== undefined && status !== '' && !Object.values(OrderStatus).includes(status as OrderStatus)) {
    throw new ValidationError(
      `El parámetro status debe ser uno de: ${Object.values(OrderStatus).join(', ')}`
    );
  }
};
