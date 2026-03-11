import { useOrders, useOrderOperations, useModal } from '../../hooks';
import { OrderTable, OrderForm, OrderDetails, Pagination } from './';
import { Modal, TableSkeleton, ErrorMessage, ConfirmDialog, Header } from '../ui';
import type { Order, CreateOrderDto, UpdateOrderDto } from '@shared/types';

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

  if (loading) {
    return (
      <>
        <Header
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateClick={() => createModal.open()}
          disabled={true}
        />
        <div className="flex-1 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
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
        <div className="flex-1 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

      <div className="flex-1 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-neutral-200">
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
