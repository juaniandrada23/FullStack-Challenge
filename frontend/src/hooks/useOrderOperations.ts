import { useOrderMutation, useToast } from '.';
import type { UseOrderOperationsResult } from '../types';
import type { Order, CreateOrderDto, UpdateOrderDto } from '@shared/types';

export const useOrderOperations = (): UseOrderOperationsResult => {
  const { loading, createOrder, updateOrder, deleteOrder } = useOrderMutation();
  const { showToast } = useToast();

  const withToast = async <T,>(
    operation: () => Promise<T>,
    successMessage: string,
    errorMessage: string
  ): Promise<T | null> => {
    try {
      const result = await operation();
      if (result) {
        showToast(successMessage, 'success');
        return result;
      }
      showToast(errorMessage, 'error');
      return null;
    } catch {
      showToast(errorMessage, 'error');
      return null;
    }
  };

  const createWithFeedback = async (data: CreateOrderDto): Promise<Order | null> => {
    return withToast(
      () => createOrder(data),
      'Orden creada exitosamente',
      'Error al crear la orden'
    );
  };

  const updateWithFeedback = async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    return withToast(
      () => updateOrder(id, data),
      'Orden actualizada exitosamente',
      'Error al actualizar la orden'
    );
  };

  const deleteWithFeedback = async (id: string): Promise<boolean> => {
    const result = await withToast(
      () => deleteOrder(id),
      'Orden eliminada exitosamente',
      'Error al eliminar la orden'
    );
    return result ?? false;
  };

  return {
    loading,
    createWithFeedback,
    updateWithFeedback,
    deleteWithFeedback,
  };
};
