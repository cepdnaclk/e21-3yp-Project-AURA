import { useState, useEffect } from 'react';
import {
    ChefHat,
    Clock,
    CheckCircle2,
    AlertTriangle,
    ArrowRight,
    RotateCcw,
    Flame,
    Timer,
    X,
} from 'lucide-react';
import Button from '../../components/common/Button';
import StatusBadge from '../../components/common/StatusBadge';
import Footer from '../../components/layout/Footer';
import useOrderStore from '../../store/useOrderStore';
import { formatPrice, formatTime, getTimeSince } from '../../utils/helpers';

const statusFlow = ['new', 'preparing', 'ready', 'completed'];

function KitchenDisplay() {
    const orders = useOrderStore((state) => state.orders);
    const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus);
    const [filter, setFilter] = useState('all');
    const [now, setNow] = useState(new Date());

    // Refresh timer every 30 seconds
    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 30000);
        return () => clearInterval(timer);
    }, []);

    const filteredOrders =
        filter === 'all'
            ? orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled')
            : orders.filter((o) => o.status === filter);

    const advanceStatus = (orderId, currentStatus) => {
        const currentIndex = statusFlow.indexOf(currentStatus);
        if (currentIndex < statusFlow.length - 1) {
            updateOrderStatus(orderId, statusFlow[currentIndex + 1]);
        }
    };

    const cancelOrder = (orderId) => {
        updateOrderStatus(orderId, 'cancelled');
    };

    const statusFilterCounts = {
        all: orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length,
        new: orders.filter((o) => o.status === 'new').length,
        preparing: orders.filter((o) => o.status === 'preparing').length,
        ready: orders.filter((o) => o.status === 'ready').length,
        completed: orders.filter((o) => o.status === 'completed').length,
    };

    const demoOrders = orders.length === 0;

    // Demo orders when no real orders exist
    const displayOrders = demoOrders
        ? [
            {
                id: 'ORD-DEMO-A1',
                tableNumber: 'T3',
                robotId: 'AURA-01',
                status: 'new',
                priority: 'high',
                totalAmount: 67.5,
                createdAt: new Date(Date.now() - 120000).toISOString(),
                items: [
                    { name: 'Truffle Wagyu Burger', quantity: 2, price: 28.99 },
                    { name: 'Matcha Latte', quantity: 1, price: 6.5 },
                ],
            },
            {
                id: 'ORD-DEMO-A2',
                tableNumber: 'T1',
                robotId: 'AURA-02',
                status: 'preparing',
                priority: 'normal',
                totalAmount: 34.5,
                createdAt: new Date(Date.now() - 300000).toISOString(),
                items: [{ name: 'Lobster Risotto', quantity: 1, price: 34.5 }],
            },
            {
                id: 'ORD-DEMO-A3',
                tableNumber: 'T5',
                robotId: 'AURA-04',
                status: 'ready',
                priority: 'normal',
                totalAmount: 44.0,
                createdAt: new Date(Date.now() - 600000).toISOString(),
                items: [{ name: 'Dragon Roll Sushi', quantity: 2, price: 22.0 }],
            },
        ]
        : filteredOrders;

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col">
            <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">
                {/* ── Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
                            <ChefHat className="text-neon-orange" size={32} />
                            Kitchen Display
                        </h1>
                        <p className="text-dark-300 mt-1 text-sm">
                            {demoOrders
                                ? 'Showing demo orders — place an order via Robot UI to see live data'
                                : `${statusFilterCounts.all} active orders`}
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Timer size={16} className="text-dark-400" />
                        <span className="text-dark-400">
                            {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>

                {/* ── Status Filters ── */}
                {!demoOrders && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {['all', 'new', 'preparing', 'ready', 'completed'].map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilter(s)}
                                className={`
                  flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all
                  ${filter === s
                                        ? 'bg-aura-600/20 text-aura-300 border border-aura-500/30'
                                        : 'glass text-dark-300 hover:text-white'
                                    }
                `}
                            >
                                {s}
                                {statusFilterCounts[s] > 0 && (
                                    <span className="ml-2 bg-dark-700 px-1.5 py-0.5 rounded-md text-xs">
                                        {statusFilterCounts[s]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Orders Grid ── */}
                {displayOrders.length === 0 ? (
                    <div className="text-center py-20">
                        <ChefHat size={48} className="mx-auto text-dark-500 mb-4" />
                        <h3 className="font-display text-xl font-bold text-dark-300">No orders yet</h3>
                        <p className="text-dark-400 text-sm mt-1">
                            Orders will appear here in real-time when placed through Robot UI
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {displayOrders.map((order) => {
                            const isUrgent =
                                order.priority === 'high' ||
                                (order.status === 'new' &&
                                    Date.now() - new Date(order.createdAt).getTime() > 300000);

                            return (
                                <div
                                    key={order.id}
                                    className={`
                    glass rounded-2xl overflow-hidden transition-all duration-300 animate-slide-up
                    ${isUrgent ? 'ring-2 ring-red-500/40 shadow-lg shadow-red-500/10' : ''}
                    ${order.status === 'ready' ? 'neon-border ring-2 ring-neon-green/30' : ''}
                  `}
                                >
                                    {/* Card Header */}
                                    <div
                                        className={`
                      px-4 py-3 flex items-center justify-between
                      ${order.status === 'new'
                                                ? 'bg-neon-cyan/5'
                                                : order.status === 'preparing'
                                                    ? 'bg-amber-500/5'
                                                    : order.status === 'ready'
                                                        ? 'bg-neon-green/5'
                                                        : 'bg-dark-800/50'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center text-xs font-bold text-white">
                                                {order.tableNumber}
                                            </div>
                                            <div>
                                                <p className="text-xs font-mono text-dark-400">{order.id}</p>
                                                <p className="text-[10px] text-dark-500">{order.robotId}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {isUrgent && <Flame size={14} className="text-red-400 animate-pulse" />}
                                            <StatusBadge status={order.status} />
                                        </div>
                                    </div>

                                    {/* Items */}
                                    <div className="px-4 py-3 space-y-2">
                                        {order.items.map((item, i) => (
                                            <div key={i} className="flex items-center justify-between text-sm">
                                                <span className="text-dark-200">
                                                    <span className="text-aura-400 font-bold mr-1">{item.quantity}x</span>
                                                    {item.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="px-4 pb-4 flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1 text-xs text-dark-400">
                                            <Clock size={12} />
                                            {getTimeSince(order.createdAt)}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {!demoOrders && order.status !== 'completed' && order.status !== 'cancelled' && (
                                                <>
                                                    <button
                                                        onClick={() => cancelOrder(order.id)}
                                                        className="w-8 h-8 rounded-lg bg-dark-700 hover:bg-red-500/20 text-dark-400 hover:text-red-400 transition-all flex items-center justify-center"
                                                        title="Cancel"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <Button
                                                        variant={order.status === 'ready' ? 'neon' : 'primary'}
                                                        size="sm"
                                                        onClick={() => advanceStatus(order.id, order.status)}
                                                    >
                                                        {order.status === 'new' && 'Start'}
                                                        {order.status === 'preparing' && 'Ready'}
                                                        {order.status === 'ready' && 'Complete'}
                                                        <ArrowRight size={14} />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

export default KitchenDisplay;
