import {
    TrendingUp,
    DollarSign,
    ShoppingBag,
    Bot,
    Clock,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    Zap,
    Activity,
} from 'lucide-react';
import Card from '../../components/common/Card';
import StatusBadge from '../../components/common/StatusBadge';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import { useOrders } from '../../hooks/useOrders';
import { formatPrice, formatTime, getStatusColor } from '../../utils/helpers';

// ── Mock Stats ──
const robotsData = [
    { id: 'AURA-01', status: 'delivering', battery: 87, deliveries: 24 },
    { id: 'AURA-02', status: 'idle', battery: 95, deliveries: 18 },
    { id: 'AURA-03', status: 'charging', battery: 32, deliveries: 21 },
    { id: 'AURA-04', status: 'delivering', battery: 64, deliveries: 16 },
];

function AdminDashboard() {
    const { orders, activeOrders, completedOrders, totalRevenue } = useOrders();

    const stats = [
        {
            label: 'Total Revenue',
            value: formatPrice(totalRevenue || 4285.5),
            change: '+12.5%',
            up: true,
            icon: DollarSign,
            color: 'from-emerald-500 to-green-400',
        },
        {
            label: 'Active Orders',
            value: activeOrders.length || 8,
            change: '+3',
            up: true,
            icon: ShoppingBag,
            color: 'from-aura-500 to-aura-400',
        },
        {
            label: 'Robots Active',
            value: `${robotsData.filter((r) => r.status !== 'charging').length}/${robotsData.length}`,
            change: 'Online',
            up: true,
            icon: Bot,
            color: 'from-neon-cyan to-blue-400',
        },
        {
            label: 'Avg. Delivery',
            value: '4.2 min',
            change: '-0.8 min',
            up: true,
            icon: Clock,
            color: 'from-amber-500 to-yellow-400',
        },
    ];

    const recentOrders = orders.length > 0 ? orders.slice(0, 6) : [
        { id: 'ORD-DEMO-001', tableNumber: 'T3', status: 'preparing', totalAmount: 67.50, createdAt: new Date().toISOString(), items: [{ name: 'Truffle Burger', quantity: 2 }] },
        { id: 'ORD-DEMO-002', tableNumber: 'T1', status: 'new', totalAmount: 34.50, createdAt: new Date().toISOString(), items: [{ name: 'Lobster Risotto', quantity: 1 }] },
        { id: 'ORD-DEMO-003', tableNumber: 'T5', status: 'ready', totalAmount: 45.00, createdAt: new Date().toISOString(), items: [{ name: 'Dragon Roll', quantity: 2 }] },
        { id: 'ORD-DEMO-004', tableNumber: 'T2', status: 'completed', totalAmount: 89.00, createdAt: new Date().toISOString(), items: [{ name: 'Wagyu Steak', quantity: 1 }] },
    ];

    return (
        <div className="flex min-h-[calc(100vh-4rem)]">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <div className="flex-1 p-6 lg:p-8 space-y-8">
                    {/* ── Header ── */}
                    <div>
                        <h1 className="font-display text-3xl font-bold text-white flex items-center gap-3">
                            <Activity className="text-aura-400" size={28} />
                            Admin Dashboard
                        </h1>
                        <p className="text-dark-300 mt-1">Real-time overview of your restaurant operations</p>
                    </div>

                    {/* ── Stats Grid ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <Card key={stat.label} hover={false} className="relative overflow-hidden">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-xs font-medium text-dark-400 uppercase tracking-wider">
                                                {stat.label}
                                            </p>
                                            <p className="text-3xl font-bold text-white mt-2 font-display">{stat.value}</p>
                                            <div className="flex items-center gap-1 mt-2">
                                                {stat.up ? (
                                                    <ArrowUpRight size={14} className="text-neon-green" />
                                                ) : (
                                                    <ArrowDownRight size={14} className="text-red-400" />
                                                )}
                                                <span
                                                    className={`text-xs font-medium ${stat.up ? 'text-neon-green' : 'text-red-400'
                                                        }`}
                                                >
                                                    {stat.change}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                                        >
                                            <Icon size={22} className="text-white" />
                                        </div>
                                    </div>
                                    {/* Decorative gradient */}
                                    <div
                                        className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-5 blur-xl`}
                                    />
                                </Card>
                            );
                        })}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* ── Recent Orders ── */}
                        <div className="lg:col-span-2">
                            <Card hover={false} className="p-0 overflow-hidden">
                                <div className="px-6 py-4 border-b border-dark-700/50 flex items-center justify-between">
                                    <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                                        <ShoppingBag size={18} className="text-aura-400" />
                                        Recent Orders
                                    </h2>
                                    <span className="text-xs text-dark-400">{recentOrders.length} orders</span>
                                </div>
                                <div className="divide-y divide-dark-700/30">
                                    {recentOrders.map((order) => (
                                        <div
                                            key={order.id}
                                            className="px-6 py-4 flex items-center gap-4 hover:bg-dark-800/30 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center text-sm font-bold text-aura-300">
                                                {order.tableNumber}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{order.id}</p>
                                                <p className="text-xs text-dark-400 truncate">
                                                    {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                                                </p>
                                            </div>
                                            <StatusBadge status={order.status} />
                                            <span className="text-sm font-bold text-white ml-4">
                                                {formatPrice(order.totalAmount)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>

                        {/* ── Robot Status ── */}
                        <div>
                            <Card hover={false} className="p-0 overflow-hidden">
                                <div className="px-6 py-4 border-b border-dark-700/50">
                                    <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                                        <Bot size={18} className="text-neon-cyan" />
                                        Robot Fleet
                                    </h2>
                                </div>
                                <div className="p-4 space-y-3">
                                    {robotsData.map((robot) => (
                                        <div
                                            key={robot.id}
                                            className="glass-light rounded-xl p-4 hover:neon-border transition-all duration-300"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-white text-sm">{robot.id}</span>
                                                <span
                                                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${robot.status === 'delivering'
                                                            ? 'bg-neon-green/10 text-neon-green'
                                                            : robot.status === 'idle'
                                                                ? 'bg-aura-500/10 text-aura-300'
                                                                : 'bg-amber-500/10 text-amber-400'
                                                        }`}
                                                >
                                                    {robot.status}
                                                </span>
                                            </div>
                                            {/* Battery Bar */}
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-dark-700 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-500 ${robot.battery > 60
                                                                ? 'bg-neon-green'
                                                                : robot.battery > 30
                                                                    ? 'bg-amber-400'
                                                                    : 'bg-red-400'
                                                            }`}
                                                        style={{ width: `${robot.battery}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-dark-400 w-10 text-right">
                                                    {robot.battery}%
                                                </span>
                                            </div>
                                            <p className="text-xs text-dark-400 mt-2">
                                                {robot.deliveries} deliveries today
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default AdminDashboard;
