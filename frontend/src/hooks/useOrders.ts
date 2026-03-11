import { useState, useEffect, useCallback } from 'react';
import { useToast } from '.';
import { orderService } from '../services';
import type { Order, PaginationParams, OrderStatus } from '@shared/types';
import type { UseOrdersResult } from '../types';

export const useOrders = (initialPage = 1, initialPageSize = 10): UseOrdersResult => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const { showToast } = useToast();

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params: PaginationParams = { 
        page, 
        page_size: pageSize,
      };

      if (statusFilter) {
        params.status = statusFilter;
      }

      const response = await orderService.getAllOrders(params);
      
      setOrders(response.data);
      setTotal(response.pagination.total);
      setTotalPages(response.pagination.total_pages);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cargar las órdenes';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, statusFilter, showToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSetStatusFilter = (status: OrderStatus | '') => {
    setStatusFilter(status);
    setPage(1);
  };

  return {
    orders,
    loading,
    error,
    page,
    pageSize,
    total,
    totalPages,
    statusFilter,
    fetchOrders,
    nextPage,
    previousPage,
    setPage,
    setStatusFilter: handleSetStatusFilter,
  };
};
