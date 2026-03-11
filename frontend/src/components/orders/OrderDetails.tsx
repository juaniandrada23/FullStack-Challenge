import type { OrderDetailsProps } from '../../types';
import { MdAccessTime, MdCheckCircle, MdCancel, MdHelpOutline, MdPerson, MdInventory, MdNumbers, MdCalendarToday } from 'react-icons/md';

export const OrderDetails = ({ order }: OrderDetailsProps) => {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        icon: <MdAccessTime className="w-4 h-4" />,
        label: 'Pendiente',
      },
      completed: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        icon: <MdCheckCircle className="w-4 h-4" />,
        label: 'Completado',
      },
      cancelled: {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: <MdCancel className="w-4 h-4" />,
        label: 'Cancelado',
      },
    } as const;

    const config = statusConfig[status as keyof typeof statusConfig] || {
      bg: 'bg-neutral-50',
      text: 'text-neutral-700',
      border: 'border-neutral-200',
      icon: <MdHelpOutline className="w-4 h-4" />,
      label: status,
    };

    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border ${config.bg} ${config.text} ${config.border}`}>
        {config.icon}
        {config.label}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const DetailCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="group bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 hover:border-neutral-300 hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="w-8 h-8 rounded-lg bg-neutral-950 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <p className="text-[10px] sm:text-[11px] font-bold text-neutral-400 uppercase tracking-widest">{label}</p>
      </div>
      <p className="text-sm sm:text-base text-neutral-900 font-semibold">{value}</p>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-5 border-b border-neutral-100">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">ID de Orden</p>
          <p className="text-xs text-neutral-700 font-mono bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200 break-all">
            {order.id}
          </p>
        </div>
        <div className="flex-shrink-0">
          {getStatusBadge(order.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <DetailCard
          icon={<MdPerson className="w-4 h-4 text-white" />}
          label="Cliente"
          value={order.customer_name}
        />
        <DetailCard
          icon={<MdInventory className="w-4 h-4 text-white" />}
          label="Art&iacute;culo"
          value={order.item}
        />
        <DetailCard
          icon={<MdNumbers className="w-4 h-4 text-white" />}
          label="Cantidad"
          value={`${order.quantity} unidades`}
        />
        <DetailCard
          icon={<MdCalendarToday className="w-4 h-4 text-white" />}
          label="Creaci&oacute;n"
          value={formatDate(order.created_at)}
        />
        <div className="sm:col-span-2">
          <DetailCard
            icon={<MdCalendarToday className="w-4 h-4 text-white" />}
            label="&Uacute;ltima actualizaci&oacute;n"
            value={formatDate(order.updated_at)}
          />
        </div>
      </div>
    </div>
  );
};
