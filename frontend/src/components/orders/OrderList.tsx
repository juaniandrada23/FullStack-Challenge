import { useOrders, useOrderOperations, useModal } from '../../hooks';
import { OrderTable, OrderForm, OrderDetails, Pagination } from './';
import { Modal, TableSkeleton, ErrorMessage, ConfirmDialog, Header } from '../ui';
import type { Order, CreateOrderDto, UpdateOrderDto } from '@shared/types';
import { MdAccessTime, MdCheckCircle, MdCancel, MdInbox } from 'react-icons/md';

export const OrderList = () => {
  const { orders, loading, error, page, totalPages, statusFilter, fetchOrders, nextPage, previousPage, setStatusFilter } = useOrders();
  const { loading: mutationLoading, createWithFeedback, updateWithFeedback, deleteWithFeedback } = useOrderOperations();

  const createModal = useModal();
  const editModal = useModal<Order>();
  const detailsModal = useModal<Order>();
  const deleteModal = useModal<Order>();

  const handleCreate = async (data: CreateOrderDto | UpdateOrderDto) => {
    const result = await createWithFeedback(data as CreateOrderDto);
    if (result) {
      createModal.close();
      await fetchOrders();
    }
  };

  const handleEdit = async (data: CreateOrderDto | UpdateOrderDto) => {
    if (!editModal.data) return;
    const result = await updateWithFeedback(editModal.data.id, data as UpdateOrderDto);
    if (result) {
      editModal.close();
      await fetchOrders();
    }
  };

  const handleDelete = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      deleteModal.open(order);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModal.data) return;
    const result = await deleteWithFeedback(deleteModal.data.id);
    if (result) {
      deleteModal.close();
      await fetchOrders();
    }
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const StatCard = ({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm hover:shadow-md transition-all duration-200`}>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-neutral-900 leading-none tabular-nums">{value}</p>
        <p className="text-[11px] font-medium text-neutral-500 mt-0.5">{label}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <>
        <Header
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateClick={() => createModal.open()}
          disabled={true}
        />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200/80">
              <TableSkeleton rows={5} columns={6} />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateClick={() => createModal.open()}
          disabled={false}
        />
        <div className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ErrorMessage message={error} onRetry={fetchOrders} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onCreateClick={() => createModal.open()}
        disabled={loading}
      />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Stats Summary */}
          {orders.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 animate-fadeInUp">
              <StatCard
                label="Total ordenes"
                value={stats.total}
                icon={<MdInbox className="w-4 h-4 text-accent-600" />}
                color="bg-accent-50"
              />
              <StatCard
                label="Pendientes"
                value={stats.pending}
                icon={<MdAccessTime className="w-4 h-4 text-amber-600" />}
                color="bg-amber-50"
              />
              <StatCard
                label="Completadas"
                value={stats.completed}
                icon={<MdCheckCircle className="w-4 h-4 text-emerald-600" />}
                color="bg-emerald-50"
              />
              <StatCard
                label="Canceladas"
                value={stats.cancelled}
                icon={<MdCancel className="w-4 h-4 text-red-500" />}
                color="bg-red-50"
              />
            </div>
          )}

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-200/80 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <OrderTable
              orders={orders}
              onViewDetails={detailsModal.open}
              onEdit={editModal.open}
              onDelete={handleDelete}
            />
            {totalPages > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onNext={nextPage}
                onPrevious={previousPage}
              />
            )}
          </div>
        </div>

        <Modal
          isOpen={createModal.isOpen}
          onClose={createModal.close}
          title="Crear Nueva Orden"
        >
          <OrderForm
            mode="create"
            onSubmit={handleCreate}
            onCancel={createModal.close}
            loading={mutationLoading}
          />
        </Modal>

        <Modal
          isOpen={editModal.isOpen}
          onClose={editModal.close}
          title="Editar Orden"
        >
          {editModal.data && (
            <OrderForm
              mode="edit"
              initialData={editModal.data}
              onSubmit={handleEdit}
              onCancel={editModal.close}
              loading={mutationLoading}
            />
          )}
        </Modal>

        <Modal
          isOpen={detailsModal.isOpen}
          onClose={detailsModal.close}
          title="Detalles de la Orden"
        >
          {detailsModal.data && <OrderDetails order={detailsModal.data} />}
        </Modal>

        <ConfirmDialog
          isOpen={deleteModal.isOpen}
          title="Confirmar Borrado"
          message={`¿Está seguro de eliminar la orden de "${deleteModal.data?.customer_name}" (${deleteModal.data?.item})?`}
          confirmText="Eliminar"
          cancelText="Cancelar"
          variant="danger"
          onConfirm={handleConfirmDelete}
          onCancel={deleteModal.close}
          loading={mutationLoading}
        />
      </div>
    </>
  );
};
