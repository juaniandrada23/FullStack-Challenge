import { useState } from 'react';
import { orderService } from '../services';
import type { Order, CreateOrderDto, UpdateOrderDto, UseOrderMutationResult } from '../types';

export const useOrderMutation = (): UseOrderMutationResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (data: CreateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.createOrder(data);
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la orden');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, data: UpdateOrderDto): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await orderService.updateOrder(id, data);
      return response.data || null;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la orden');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      await orderService.deleteOrder(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la orden');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};
