import { describe, it, expect } from '@jest/globals';
import {
  validateCreateOrder,
  validateUpdateOrder,
  validatePaginationParams,
  ValidationError,
} from '../../utils/validators';
import { OrderStatus } from '@shared/types';

describe('Validators', () => {
  describe('validateCreateOrder', () => {
    it('debería pasar con datos válidos', () => {
      const validData = {
        customer_name: 'Juan Pérez',
        item: 'Laptop',
        quantity: 1,
      };

      expect(() => validateCreateOrder(validData)).not.toThrow();
    });

    it('debería lanzar error cuando falta customer_name', () => {
      const invalidData = {
        item: 'Laptop',
        quantity: 1,
      };

      expect(() => validateCreateOrder(invalidData)).toThrow(ValidationError);
      expect(() => validateCreateOrder(invalidData)).toThrow(
        'El nombre del cliente es requerido y debe ser texto'
      );
    });

    it('debería lanzar error cuando falta item', () => {
      const invalidData = {
        customer_name: 'Juan Pérez',
        quantity: 1,
      };

      expect(() => validateCreateOrder(invalidData)).toThrow(ValidationError);
      expect(() => validateCreateOrder(invalidData)).toThrow(
        'El artículo es requerido y debe ser texto'
      );
    });

    it('debería lanzar error cuando quantity es inválida', () => {
      const invalidData = {
        customer_name: 'Juan Pérez',
        item: 'Laptop',
        quantity: 0,
      };

      expect(() => validateCreateOrder(invalidData)).toThrow(ValidationError);
      expect(() => validateCreateOrder(invalidData)).toThrow(
        'La cantidad es requerida y debe ser un número mayor a 0'
      );
    });

    it('debería lanzar error cuando quantity es negativa', () => {
      const invalidData = {
        customer_name: 'Juan Pérez',
        item: 'Laptop',
        quantity: -5,
      };

      expect(() => validateCreateOrder(invalidData)).toThrow(ValidationError);
    });
  });

  describe('validateUpdateOrder', () => {
    it('debería pasar con datos parciales válidos', () => {
      const validData = {
        customer_name: 'Juan Pérez Actualizado',
      };

      expect(() => validateUpdateOrder(validData)).not.toThrow();
    });

    it('debería pasar con status válido', () => {
      const validData = {
        status: OrderStatus.COMPLETED,
      };

      expect(() => validateUpdateOrder(validData)).not.toThrow();
    });

    it('debería lanzar error cuando status es inválido', () => {
      const invalidData = {
        status: 'invalid_status',
      };

      expect(() => validateUpdateOrder(invalidData)).toThrow(ValidationError);
      expect(() => validateUpdateOrder(invalidData)).toThrow(/El estado debe ser uno de/);
    });

    it('debería lanzar error cuando quantity es cero', () => {
      const invalidData = {
        quantity: 0,
      };

      expect(() => validateUpdateOrder(invalidData)).toThrow(ValidationError);
    });

    it('debería pasar con todos los campos válidos', () => {
      const validData = {
        customer_name: 'Nombre Actualizado',
        item: 'Artículo Actualizado',
        quantity: 10,
        status: OrderStatus.CANCELLED,
      };

      expect(() => validateUpdateOrder(validData)).not.toThrow();
    });
  });

  describe('validatePaginationParams', () => {
    it('debería pasar con parámetros de paginación válidos', () => {
      expect(() => validatePaginationParams('1', '10')).not.toThrow();
    });

    it('debería pasar con filtro de status válido', () => {
      expect(() => validatePaginationParams('1', '10', OrderStatus.PENDING)).not.toThrow();
    });

    it('debería lanzar error cuando page es menor a 1', () => {
      expect(() => validatePaginationParams('0', '10')).toThrow(ValidationError);
      expect(() => validatePaginationParams('0', '10')).toThrow(
        'El parámetro page debe ser un número mayor o igual a 1'
      );
    });

    it('debería lanzar error cuando page no es un número', () => {
      expect(() => validatePaginationParams('abc', '10')).toThrow(ValidationError);
    });

    it('debería lanzar error cuando page_size es menor a 1', () => {
      expect(() => validatePaginationParams('1', '0')).toThrow(ValidationError);
    });

    it('debería lanzar error cuando page_size es mayor a 100', () => {
      expect(() => validatePaginationParams('1', '101')).toThrow(ValidationError);
      expect(() => validatePaginationParams('1', '101')).toThrow(
        'El parámetro page_size debe ser un número entre 1 y 100'
      );
    });

    it('debería lanzar error cuando status es inválido', () => {
      expect(() => validatePaginationParams('1', '10', 'invalid')).toThrow(ValidationError);
      expect(() => validatePaginationParams('1', '10', 'invalid')).toThrow(
        /El parámetro status debe ser uno de/
      );
    });

    it('debería pasar cuando status es string vacío', () => {
      expect(() => validatePaginationParams('1', '10', '')).not.toThrow();
    });
  });
});
