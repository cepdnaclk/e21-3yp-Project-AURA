import { useMemo } from 'react';
import useOrderStore from '../store/useOrderStore';

export function useOrders() {
    const orders = useOrderStore((state) => state.orders);
    const addOrder = useOrderStore((state) => state.addOrder);
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
    const removeOrder = useOrderStore((state) => state.removeOrder);

    const activeOrders = useMemo(
        () => orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled'),
        [orders]
    );

    const newOrders = useMemo(() => orders.filter((o) => o.status === 'new'), [orders]);
    const preparingOrders = useMemo(() => orders.filter((o) => o.status === 'preparing'), [orders]);
    const readyOrders = useMemo(() => orders.filter((o) => o.status === 'ready'), [orders]);
    const completedOrders = useMemo(() => orders.filter((o) => o.status === 'completed'), [orders]);

    const totalRevenue = useMemo(
        () => completedOrders.reduce((sum, o) => sum + o.totalAmount, 0),
        [completedOrders]
    );

    return {
        orders,
        activeOrders,
        newOrders,
        preparingOrders,
        readyOrders,
        completedOrders,
        totalRevenue,
        addOrder,
        updateOrderStatus,
        removeOrder,
    };
}
