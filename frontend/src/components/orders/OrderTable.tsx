import type { OrderTableProps } from '../../types';
import { MdAccessTime, MdCheckCircle, MdCancel, MdHelpOutline, MdVisibility, MdEdit, MdDelete, MdInbox } from 'react-icons/md';

export const OrderTable = ({ orders, onViewDetails, onEdit, onDelete }: OrderTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: <MdAccessTime className="w-3.5 h-3.5" />,
        label: 'Pendiente',
      },
      completed: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: <MdCheckCircle className="w-3.5 h-3.5" />,
        label: 'Completado',
      },
      cancelled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: <MdCancel className="w-3.5 h-3.5" />,
        label: 'Cancelado',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      bg: 'bg-neutral-50',
      text: 'text-neutral-700',
      border: 'border-neutral-200',
      icon: <MdHelpOutline className="w-3.5 h-3.5" />,
      label: status,
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${config.bg} ${config.text} ${config.border}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-20 animate-fadeInUp">
        <div className="max-w-xs mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-5">
            <MdInbox className="w-8 h-8 text-neutral-300" />
          </div>
          <p className="text-base font-bold text-neutral-900 mb-1">Sin ordenes</p>
          <p className="text-sm text-neutral-400">Crea tu primera orden para comenzar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-neutral-950">
            <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              ID
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Cliente
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Art&iacute;culo
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Cantidad
            </th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Estado
            </th>
            <th className="px-6 py-3.5 text-right text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {orders.map((order, index) => (
            <tr
              key={order.id}
              className="hover:bg-neutral-50/80 transition-colors duration-150 animate-fadeInUp group"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <td className="px-6 py-3.5 whitespace-nowrap">
                <span className="text-xs text-neutral-400 font-mono">{order.id.substring(0, 8)}</span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <span className="text-sm font-semibold text-neutral-900">{order.customer_name}</span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <span className="text-sm text-neutral-600">{order.item}</span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                <span className="text-sm text-neutral-600 tabular-nums">{order.quantity}</span>
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap">
                {getStatusBadge(order.status)}
              </td>
              <td className="px-6 py-3.5 whitespace-nowrap text-right">
                <div className="inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    onClick={() => onViewDetails(order)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-transparent border border-neutral-200 rounded-md hover:bg-neutral-950 hover:text-white hover:border-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
                    title="Ver detalles"
                  >
                    <MdVisibility className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Detalle</span>
                  </button>
                  <button
                    onClick={() => onEdit(order)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-transparent border border-neutral-200 rounded-md hover:bg-neutral-950 hover:text-white hover:border-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
                    title="Editar orden"
                  >
                    <MdEdit className="w-3.5 h-3.5" />
                    <span className="hidden lg:inline">Editar</span>
                  </button>
                  <button
                    onClick={() => onDelete(order.id)}
                    className="inline-flex items-center justify-center p-1.5 text-neutral-400 bg-transparent border border-transparent rounded-md hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
                    title="Eliminar orden"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
