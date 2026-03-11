import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import { ResponseHelper } from '../utils/response.helper';
import { OrderStatus, PaginationParams } from '@shared/types';
import {
  validateCreateOrder,
  validateUpdateOrder,
  validatePaginationParams,
  ValidationError,
} from '../utils/validators';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const page = req.query.page || '1';
      const pageSize = req.query.page_size || '10';
      const status = req.query.status as string | undefined;

      validatePaginationParams(page, pageSize, status);

      const pageNum = parseInt(page as string);
      const pageSizeNum = parseInt(pageSize as string);

      const params: PaginationParams = {
        page: pageNum,
        page_size: pageSizeNum,
      };

      if (status && status !== '') {
        params.status = status as OrderStatus;
      }

      const { orders, total } = await this.orderService.getAllOrders(params);

      const totalPages = Math.ceil(total / pageSizeNum);

      res.status(200).json({
        success: true,
        data: orders,
        pagination: {
          page: pageNum,
          page_size: pageSizeNum,
          total,
          total_pages: totalPages,
        },
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        ResponseHelper.validationError(res, error.message);
      } else {
        ResponseHelper.error(
          res,
          'Error al obtener órdenes',
          500,
          error instanceof Error ? error.message : 'Error desconocido'
        );
      }
    }
  };

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const order = await this.orderService.getOrderById(id);

      if (!order) {
        ResponseHelper.notFound(res, 'Orden no encontrada');
        return;
      }

      ResponseHelper.success(res, order);
    } catch (error) {
      ResponseHelper.error(
        res,
        'Error al obtener orden',
        500,
        error instanceof Error ? error.message : 'Error desconocido'
      );
    }
  };

  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      validateCreateOrder(req.body);

      const newOrder = await this.orderService.createOrder(req.body);

      ResponseHelper.successWithMessage(res, 'Orden creada exitosamente', newOrder, 201);
    } catch (error) {
      if (error instanceof ValidationError) {
        ResponseHelper.validationError(res, error.message);
      } else {
        ResponseHelper.error(
          res,
          'Error al crear orden',
          400,
          error instanceof Error ? error.message : 'Error desconocido'
        );
      }
    }
  };

  updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      validateUpdateOrder(req.body);

      const updatedOrder = await this.orderService.updateOrder(id, req.body);

      if (!updatedOrder) {
        ResponseHelper.notFound(res, 'Orden no encontrada');
        return;
      }

      ResponseHelper.successWithMessage(res, 'Orden actualizada exitosamente', updatedOrder);
    } catch (error) {
      if (error instanceof ValidationError) {
        ResponseHelper.validationError(res, error.message);
      } else {
        ResponseHelper.error(
          res,
          'Error al actualizar orden',
          400,
          error instanceof Error ? error.message : 'Error desconocido'
        );
      }
    }
  };

  deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deleted = await this.orderService.deleteOrder(id);

      if (!deleted) {
        ResponseHelper.notFound(res, 'Orden no encontrada');
        return;
      }

      ResponseHelper.successWithMessage(res, 'Orden eliminada exitosamente');
    } catch (error) {
      ResponseHelper.error(
        res,
        'Error al eliminar orden',
        500,
        error instanceof Error ? error.message : 'Error desconocido'
      );
    }
  };
}
