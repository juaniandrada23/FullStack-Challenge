import { z } from 'zod';
import { OrderStatus } from '@shared/types';

export const createOrderSchema = z.object({
  customer_name: z
    .string()
    .min(1, 'El nombre del cliente es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  item: z
    .string()
    .min(1, 'El artículo es requerido')
    .max(100, 'El artículo no puede exceder 100 caracteres')
    .trim(),
  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .min(1, 'La cantidad debe ser mayor a 0')
    .max(10000, 'La cantidad no puede exceder 10000'),
});

export const updateOrderSchema = z.object({
  customer_name: z
    .string()
    .min(1, 'El nombre del cliente es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim()
    .optional(),
  item: z
    .string()
    .min(1, 'El artículo es requerido')
    .max(100, 'El artículo no puede exceder 100 caracteres')
    .trim()
    .optional(),
  quantity: z
    .number()
    .int('La cantidad debe ser un número entero')
    .min(1, 'La cantidad debe ser mayor a 0')
    .max(10000, 'La cantidad no puede exceder 10000')
    .optional(),
  status: z
    .enum([OrderStatus.PENDING, OrderStatus.COMPLETED, OrderStatus.CANCELLED])
    .optional(),
});
