import {
  Order,
  CreateOrderDto,
  UpdateOrderDto,
  PaginationParams,
} from '@shared/types';
import { getPool } from '../config/database';

export class OrderService {
  async getAllOrders(params: PaginationParams): Promise<{ orders: Order[]; total: number }> {
    const { page, page_size, status } = params;
    const offset = (page - 1) * page_size;
    const pool = getPool();

    const conditions: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (status) {
      conditions.push(`status = $${paramIndex++}`);
      values.push(status);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM orders ${where}`,
      values,
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const dataResult = await pool.query(
      `SELECT * FROM orders ${where} ORDER BY created_at DESC LIMIT $${paramIndex++} OFFSET $${paramIndex}`,
      [...values, page_size, offset],
    );

    return {
      orders: dataResult.rows as Order[],
      total,
    };
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const pool = getPool();
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);

    return result.rows[0] as Order | undefined;
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const pool = getPool();

    const result = await pool.query(
      `INSERT INTO orders (customer_name, item, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [orderData.customer_name, orderData.item, orderData.quantity],
    );

    return result.rows[0] as Order;
  }

  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order | undefined> {
    const pool = getPool();
    const setClauses: string[] = [];
    const values: unknown[] = [];
    let paramIndex = 1;

    if (orderData.customer_name !== undefined) {
      setClauses.push(`customer_name = $${paramIndex++}`);
      values.push(orderData.customer_name);
    }
    if (orderData.item !== undefined) {
      setClauses.push(`item = $${paramIndex++}`);
      values.push(orderData.item);
    }
    if (orderData.quantity !== undefined) {
      setClauses.push(`quantity = $${paramIndex++}`);
      values.push(orderData.quantity);
    }
    if (orderData.status !== undefined) {
      setClauses.push(`status = $${paramIndex++}`);
      values.push(orderData.status);
    }

    if (setClauses.length === 0) {
      return this.getOrderById(id);
    }

    setClauses.push('updated_at = NOW()');

    values.push(id);
    const result = await pool.query(
      `UPDATE orders SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values,
    );

    return result.rows[0] as Order | undefined;
  }

  async deleteOrder(id: string): Promise<boolean> {
    const pool = getPool();
    const result = await pool.query('DELETE FROM orders WHERE id = $1', [id]);

    return (result.rowCount ?? 0) > 0;
  }
}
