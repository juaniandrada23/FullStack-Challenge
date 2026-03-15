import type { OrderTableProps } from '../../types';
import { MdAccessTime, MdCheckCircle, MdCancel, MdHelpOutline, MdVisibility, MdEdit, MdDelete, MdInbox } from 'react-icons/md';

export const OrderTable = ({ orders, onViewDetails, onEdit, onDelete }: OrderTableProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200/80',
        dot: 'bg-amber-500',
        icon: <MdAccessTime className="w-3.5 h-3.5" />,
        label: 'Pendiente',
      },
      completed: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200/80',
        dot: 'bg-emerald-500',
        icon: <MdCheckCircle className="w-3.5 h-3.5" />,
        label: 'Completado',
      },
      cancelled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200/80',
        dot: 'bg-red-500',
        icon: <MdCancel className="w-3.5 h-3.5" />,
        label: 'Cancelado',
      },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || {
      bg: 'bg-neutral-50',
      text: 'text-neutral-700',
      border: 'border-neutral-200',
      dot: 'bg-neutral-500',
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
      <div className="text-center py-24 animate-fadeInUp">
        <div className="max-w-xs mx-auto">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <MdInbox className="w-9 h-9 text-accent-400" />
          </div>
          <p className="text-lg font-bold text-neutral-900 mb-2">Sin ordenes</p>
          <p className="text-sm text-neutral-500 leading-relaxed">
            Crea tu primera orden para comenzar a gestionar tus pedidos
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200/80">
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                ID
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Cliente
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Art&iacute;culo
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Cantidad
              </th>
              <th className="px-6 py-3.5 text-left text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Estado
              </th>
              <th className="px-6 py-3.5 text-right text-[11px] font-bold text-neutral-500 uppercase tracking-widest">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="hover:bg-accent-50/30 transition-colors duration-150 animate-fadeInUp group"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-xs text-neutral-400 font-mono bg-neutral-100 px-2 py-0.5 rounded">
                    {order.id.substring(0, 8)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-xs font-bold text-white">
                        {order.customer_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-neutral-900">{order.customer_name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-neutral-600">{order.item}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-neutral-700 tabular-nums bg-neutral-100 px-2.5 py-0.5 rounded-full">
                    {order.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="inline-flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-150">
                    <button
                      onClick={() => onViewDetails(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-transparent border border-neutral-200 rounded-lg hover:bg-accent-600 hover:text-white hover:border-accent-600 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
                      title="Ver detalles"
                    >
                      <MdVisibility className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Detalle</span>
                    </button>
                    <button
                      onClick={() => onEdit(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 bg-transparent border border-neutral-200 rounded-lg hover:bg-neutral-900 hover:text-white hover:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
                      title="Editar orden"
                    >
                      <MdEdit className="w-3.5 h-3.5" />
                      <span className="hidden lg:inline">Editar</span>
                    </button>
                    <button
                      onClick={() => onDelete(order.id)}
                      className="inline-flex items-center justify-center p-1.5 text-neutral-400 bg-transparent border border-transparent rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 transition-all duration-150 cursor-pointer"
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

      {/* Mobile Card Layout */}
      <div className="md:hidden divide-y divide-neutral-100">
        {orders.map((order, index) => (
          <div
            key={order.id}
            className="p-4 animate-fadeInUp hover:bg-neutral-50/50 transition-colors duration-150"
            style={{ animationDelay: `${index * 0.04}s` }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-accent-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-sm font-bold text-white">
                    {order.customer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{order.customer_name}</p>
                  <p className="text-xs text-neutral-400 font-mono">{order.id.substring(0, 8)}</p>
                </div>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <div className="flex items-center gap-4 mb-3 ml-[50px]">
              <div>
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Art&iacute;culo</p>
                <p className="text-sm text-neutral-700">{order.item}</p>
              </div>
              <div>
                <p className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Cantidad</p>
                <p className="text-sm font-medium text-neutral-700 tabular-nums">{order.quantity}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 ml-[50px]">
              <button
                onClick={() => onViewDetails(order)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg hover:bg-accent-600 hover:text-white hover:border-accent-600 transition-all duration-150 cursor-pointer"
              >
                <MdVisibility className="w-3.5 h-3.5" />
                Detalle
              </button>
              <button
                onClick={() => onEdit(order)}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-600 border border-neutral-200 rounded-lg hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-150 cursor-pointer"
              >
                <MdEdit className="w-3.5 h-3.5" />
                Editar
              </button>
              <button
                onClick={() => onDelete(order.id)}
                className="inline-flex items-center justify-center p-1.5 text-neutral-400 border border-transparent rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-150 cursor-pointer"
              >
                <MdDelete className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
