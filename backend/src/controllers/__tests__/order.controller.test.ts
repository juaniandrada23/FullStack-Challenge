import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import request from 'supertest';
import app from '../../index';
import type { Order } from '@shared/types';

let orders: Record<string, any>[] = [];

function resetOrders() {
  orders = [];
}

const mockQuery = async (text: string, params?: unknown[]) => {
  const sql = text.replace(/\s+/g, ' ').trim();

  if (sql.startsWith('SELECT COUNT(*)')) {
    let filtered = [...orders];
    if (params && params.length > 0 && sql.includes('WHERE status')) {
      filtered = filtered.filter((o) => o.status === params[0]);
    }
    return { rows: [{ count: String(filtered.length) }] };
  }

  if (sql.startsWith('SELECT * FROM orders') && sql.includes('ORDER BY')) {
    let filtered = [...orders];
    const statusParamMatch = sql.match(/status = \$(\d+)/);
    if (statusParamMatch && params) {
      const idx = parseInt(statusParamMatch[1], 10) - 1;
      filtered = filtered.filter((o) => o.status === params[idx]);
    }
    const limitMatch = sql.match(/LIMIT \$(\d+)/);
    const offsetMatch = sql.match(/OFFSET \$(\d+)/);
    let limit = filtered.length;
    let offset = 0;
    if (limitMatch && params) limit = params[parseInt(limitMatch[1], 10) - 1] as number;
    if (offsetMatch && params) offset = params[parseInt(offsetMatch[1], 10) - 1] as number;

    filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const sliced = filtered.slice(offset, offset + limit);
    return { rows: sliced };
  }

  if (sql.startsWith('SELECT * FROM orders WHERE id')) {
    const id = params?.[0];
    const found = orders.find((o) => o.id === id);
    return { rows: found ? [found] : [] };
  }

  if (sql.startsWith('INSERT INTO orders')) {
    const [customer_name, item, quantity] = params as any[];
    const now = new Date().toISOString();
    const row = { id: crypto.randomUUID(), customer_name, item, quantity, status: 'pending', created_at: now, updated_at: now };
    orders.push(row);
    return { rows: [row] };
  }

  if (sql.startsWith('UPDATE orders')) {
    const id = params?.[params.length - 1];
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return { rows: [] };

    const setSection = sql.match(/SET (.+?) WHERE/)?.[1] ?? '';
    const assignments = setSection.split(',').map((s) => s.trim());
    for (const assignment of assignments) {
      const match = assignment.match(/(\w+)\s*=\s*\$(\d+)/);
      if (match && params) {
        const field = match[1];
        const paramIdx = parseInt(match[2], 10) - 1;
        orders[idx][field] = params[paramIdx];
      }
    }
    return { rows: [orders[idx]] };
  }

  if (sql.startsWith('DELETE FROM orders')) {
    const id = params?.[0];
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return { rows: [], rowCount: 0 };
    orders.splice(idx, 1);
    return { rows: [], rowCount: 1 };
  }

  return { rows: [] };
};

const mockPool = { query: mockQuery };

jest.mock('../../config/database', () => ({
  getPool: () => mockPool,
}));

describe('Order API Endpoints', () => {
  beforeEach(() => {
    resetOrders();
  });

  describe('GET /health', () => {
    it('debería retornar 200 y el estado de salud', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'OK');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /orders', () => {
    it('debería retornar órdenes paginadas', async () => {
      const response = await request(app).get('/orders').query({ page: 1, page_size: 10 });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('page', 1);
      expect(response.body.pagination).toHaveProperty('page_size', 10);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('debería filtrar órdenes por estado', async () => {
      const now = new Date().toISOString();
      orders.push(
        { id: '1', customer_name: 'A', item: 'X', quantity: 1, status: 'pending', created_at: now, updated_at: now },
        { id: '2', customer_name: 'B', item: 'Y', quantity: 2, status: 'completed', created_at: now, updated_at: now },
      );

      const response = await request(app)
        .get('/orders')
        .query({ page: 1, page_size: 10, status: 'pending' });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);

      if (response.body.data.length > 0) {
        response.body.data.forEach((order: Order) => {
          expect(order.status).toBe('pending');
        });
      }
    });

    it('debería retornar 400 para parámetro page inválido', async () => {
      const response = await request(app).get('/orders').query({ page: 0, page_size: 10 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('debería retornar 400 para parámetro page_size inválido', async () => {
      const response = await request(app).get('/orders').query({ page: 1, page_size: 101 });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('debería retornar 400 para parámetro status inválido', async () => {
      const response = await request(app)
        .get('/orders')
        .query({ page: 1, page_size: 10, status: 'invalid_status' });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /orders', () => {
    it('debe crear una nueva orden con datos válidos', async () => {
      const newOrder = {
        customer_name: 'Usuario de Prueba',
        item: 'Artículo de Prueba',
        quantity: 5,
      };

      const response = await request(app).post('/orders').send(newOrder);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data.customer_name).toBe(newOrder.customer_name);
      expect(response.body.data.item).toBe(newOrder.item);
      expect(response.body.data.quantity).toBe(newOrder.quantity);
      expect(response.body.data.status).toBe('pending');
    });

    it('debe devolver 400 cuando falta customer_name', async () => {
      const invalidOrder = {
        item: 'Artículo de Prueba',
        quantity: 5,
      };

      const response = await request(app).post('/orders').send(invalidOrder);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it('debe devolver 400 cuando quantity es cero', async () => {
      const invalidOrder = {
        customer_name: 'Usuario de Prueba',
        item: 'Artículo de Prueba',
        quantity: 0,
      };

      const response = await request(app).post('/orders').send(invalidOrder);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /orders/:id', () => {
    it('debería retornar 404 para orden inexistente', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).get(`/orders/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /orders/:id', () => {
    it('debería retornar 404 al actualizar orden inexistente', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const updateData = {
        customer_name: 'Nombre Actualizado',
      };

      const response = await request(app).put(`/orders/${fakeId}`).send(updateData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it('debería retornar 400 para status inválido', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const invalidData = {
        status: 'invalid_status',
      };

      const response = await request(app).put(`/orders/${fakeId}`).send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /orders/:id', () => {
    it('debería retornar 404 al eliminar orden inexistente', async () => {
      const fakeId = '00000000-0000-0000-0000-000000000000';
      const response = await request(app).delete(`/orders/${fakeId}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
