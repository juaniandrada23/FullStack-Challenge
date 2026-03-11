import { httpService } from './http.service';
import type {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
} from '@shared/types';

class OrderService {
  private readonly endpoint = '/orders';

  async getAllOrders(params: PaginationParams): Promise<PaginatedResponse<Order>> {
    const queryParams = new URLSearchParams({
      page: params.page.toString(),
      page_size: params.page_size.toString(),
    });

    if (params.status) {
      queryParams.append('status', params.status);
    }

    return httpService.get<PaginatedResponse<Order>>(
      `${this.endpoint}?${queryParams.toString()}`
    );
  }

  async createOrder(data: CreateOrderDto): Promise<ApiResponse<Order>> {
    return httpService.post<ApiResponse<Order>>(this.endpoint, data);
  }

  async updateOrder(id: string, data: UpdateOrderDto): Promise<ApiResponse<Order>> {
    return httpService.put<ApiResponse<Order>>(`${this.endpoint}/${id}`, data);
  }

  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return httpService.delete<ApiResponse<void>>(`${this.endpoint}/${id}`);
  }
}

export const orderService = new OrderService();
