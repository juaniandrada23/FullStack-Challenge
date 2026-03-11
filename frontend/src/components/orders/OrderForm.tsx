import { useState } from 'react';
import { Input, Select, Button } from '../ui';
import { createOrderSchema, updateOrderSchema } from '../../schemas';
import { OrderStatus } from '@shared/types';
import type { CreateOrderDto, UpdateOrderDto } from '@shared/types';
import type { OrderFormProps } from '../../types';

export const OrderForm = ({ initialData, onSubmit, onCancel, loading = false, mode = 'create' }: OrderFormProps) => {
  const [formData, setFormData] = useState({
    customer_name: initialData?.customer_name || '',
    item: initialData?.item || '',
    quantity: initialData?.quantity || 1,
    status: initialData?.status || OrderStatus.PENDING,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: CreateOrderDto | UpdateOrderDto = mode === 'create'
      ? {
          customer_name: formData.customer_name,
          item: formData.item,
          quantity: formData.quantity,
        }
      : formData;

    const schema = mode === 'create' ? createOrderSchema : updateOrderSchema;
    const validation = schema.safeParse(submitData);

    if (!validation.success) {
      const newErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await onSubmit(submitData);
  };

  const statusOptions = [
    { value: OrderStatus.PENDING, label: 'Pendiente' },
    { value: OrderStatus.COMPLETED, label: 'Completado' },
    { value: OrderStatus.CANCELLED, label: 'Cancelado' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            label="Nombre del Cliente"
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            error={errors.customer_name}
            disabled={loading}
            placeholder="Ej: Juan P&eacute;rez"
          />
        </div>

        <div className="sm:col-span-2">
          <Input
            label="Art&iacute;culo"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            error={errors.item}
            disabled={loading}
            placeholder="Ej: Laptop Dell XPS 15"
          />
        </div>

        <div>
          <Input
            label="Cantidad"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            error={errors.quantity}
            disabled={loading}
            min={1}
          />
        </div>

        {initialData && (
          <div>
            <Select
              label="Estado"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof OrderStatus[keyof typeof OrderStatus] })}
              options={statusOptions}
              disabled={loading}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end pt-5 border-t border-neutral-100">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={loading} className="sm:min-w-[100px]">
          Cancelar
        </Button>
        <Button type="submit" variant="submit" disabled={loading} className="sm:min-w-[100px]">
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear Orden'}
        </Button>
      </div>
    </form>
  );
};
