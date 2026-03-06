import { create } from 'zustand';

const generateId = () => `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

const useOrderStore = create((set, get) => ({
    orders: [],

    // Add a new order (called from RobotUI)
    addOrder: (orderData) => {
        const newOrder = {
            id: generateId(),
            items: orderData.items,
            tableNumber: orderData.tableNumber || 'T1',
            robotId: orderData.robotId || 'AURA-01',
            status: 'new',
            priority: orderData.priority || 'normal',
            notes: orderData.notes || '',
            totalAmount: orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        set((state) => ({
            orders: [newOrder, ...state.orders],
        }));
        return newOrder;
    },

    // Update order status (called from KitchenDisplay)
    updateOrderStatus: (orderId, newStatus) => {
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId
                    ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
                    : order
            ),
        }));
    },

    // Remove an order
    removeOrder: (orderId) => {
        set((state) => ({
            orders: state.orders.filter((order) => order.id !== orderId),
        }));
    },

    // Get active orders (not completed or cancelled)
    getActiveOrders: () => {
        return get().orders.filter(
            (order) => order.status !== 'completed' && order.status !== 'cancelled'
        );
    },

    // Get orders by status
    getOrdersByStatus: (status) => {
        return get().orders.filter((order) => order.status === status);
    },

    // Get total revenue
    getTotalRevenue: () => {
        return get().orders
            .filter((order) => order.status === 'completed')
            .reduce((sum, order) => sum + order.totalAmount, 0);
    },

    // Clear all orders
    clearOrders: () => set({ orders: [] }),
}));

export default useOrderStore;
