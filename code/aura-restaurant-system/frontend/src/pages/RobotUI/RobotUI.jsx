import { useState, useCallback } from 'react';
import {
    ShoppingCart,
    Plus,
    Minus,
    Send,
    Sparkles,
    Flame,
    Leaf,
    IceCreamCone,
    Coffee,
    UtensilsCrossed,
    X,
    Check,
    Bot,
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import useOrderStore from '../../store/useOrderStore';

// import BurgerImg from '../../assets/gourmet-burger.png';
// import LobsterImg from '../../assets/lobster-risotto.png';

// ── Menu Data ──
const categories = [
    { id: 'popular', label: 'Popular', icon: Flame, color: 'from-orange-500 to-red-500' },
    { id: 'mains', label: 'Mains', icon: UtensilsCrossed, color: 'from-aura-500 to-aura-400' },
    { id: 'healthy', label: 'Healthy', icon: Leaf, color: 'from-emerald-500 to-green-400' },
    { id: 'desserts', label: 'Desserts', icon: IceCreamCone, color: 'from-pink-500 to-rose-400' },
    { id: 'drinks', label: 'Drinks', icon: Coffee, color: 'from-amber-500 to-yellow-400' },
];

const menuItems = [
    { id: 1, name: 'Truffle Wagyu Burger', price: 28.99, category: 'popular', emoji: '🍔', time: '15 min', rating: 4.9 },
    { id: 2, name: 'Lobster Risotto', price: 34.50, category: 'popular', emoji: '🦞', time: '20 min', rating: 4.8 },
    { id: 3, name: 'Dragon Roll Sushi', price: 22.00, category: 'popular', emoji: '🍣', time: '12 min', rating: 4.7 },
    { id: 4, name: 'Grilled Salmon Fillet', price: 26.50, category: 'mains', emoji: '🐟', time: '18 min', rating: 4.6 },
    { id: 5, name: 'Herb Crusted Lamb', price: 32.00, category: 'mains', emoji: '🍖', time: '25 min', rating: 4.8 },
    { id: 6, name: 'Mushroom Ravioli', price: 19.50, category: 'mains', emoji: '🍝', time: '14 min', rating: 4.5 },
    { id: 7, name: 'Quinoa Buddha Bowl', price: 16.00, category: 'healthy', emoji: '🥗', time: '10 min', rating: 4.4 },
    { id: 8, name: 'Acai Power Bowl', price: 14.50, category: 'healthy', emoji: '🫐', time: '8 min', rating: 4.5 },
    { id: 9, name: 'Avocado Poke Bowl', price: 18.00, category: 'healthy', emoji: '🥑', time: '10 min', rating: 4.6 },
    { id: 10, name: 'Molten Lava Cake', price: 12.00, category: 'desserts', emoji: '🍫', time: '12 min', rating: 4.9 },
    { id: 11, name: 'Crème Brûlée', price: 10.50, category: 'desserts', emoji: '🍮', time: '10 min', rating: 4.7 },
    { id: 12, name: 'Tiramisu Tower', price: 13.00, category: 'desserts', emoji: '🍰', time: '8 min', rating: 4.8 },
    { id: 13, name: 'Matcha Latte', price: 6.50, category: 'drinks', emoji: '🍵', time: '4 min', rating: 4.3 },
    { id: 14, name: 'Fresh Mango Smoothie', price: 8.00, category: 'drinks', emoji: '🥭', time: '5 min', rating: 4.5 },
    { id: 15, name: 'Sparkling Rose Lemonade', price: 7.50, category: 'drinks', emoji: '🍋', time: '3 min', rating: 4.4 },
];

function RobotUI() {
    const [activeCategory, setActiveCategory] = useState('popular');
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [tableNumber, setTableNumber] = useState('T1');
    const addOrder = useOrderStore((state) => state.addOrder);

    const filteredItems = menuItems.filter((item) => item.category === activeCategory);

    const addToCart = useCallback((item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((itemId) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === itemId);
            if (existing && existing.quantity > 1) {
                return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i));
            }
            return prev.filter((i) => i.id !== itemId);
        });
    }, []);

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    const handlePlaceOrder = () => {
        if (cart.length === 0) return;
        addOrder({ items: cart, tableNumber });
        setOrderPlaced(true);
        setTimeout(() => {
            setCart([]);
            setShowCart(false);
            setOrderPlaced(false);
        }, 2500);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-animated relative pb-24">
            {/* ── Header ── */}
            <div className="px-4 pt-6 pb-4 sm:px-8">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
                            <Bot className="text-neon-cyan" size={32} />
                            AURA Menu
                        </h1>
                        <p className="text-dark-300 mt-1 text-sm">
                            Touch to order • Robot-delivered to your table
                        </p>
                    </div>
                    {/* Table Selector */}
                    <div className="glass rounded-2xl px-4 py-2 flex items-center gap-2">
                        <span className="text-xs text-dark-400">Table</span>
                        <select
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="bg-transparent text-white font-bold text-lg focus:outline-none cursor-pointer"
                        >
                            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].map((t) => (
                                <option key={t} value={t} className="bg-dark-900">
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* ── Categories (Touch-friendly horizontal scroll) ── */}
            <div className="px-4 sm:px-8 mb-6">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(({ id, label, icon: Icon, color }) => (
                        <button
                            key={id}
                            onClick={() => setActiveCategory(id)}
                            className={`
                touch-target flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl
                text-sm font-semibold transition-all duration-300
                ${activeCategory === id
                                    ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105`
                                    : 'glass text-dark-300 hover:text-white active:scale-95'
                                }
              `}
                        >
                            <Icon size={20} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Menu Grid (Touch-friendly large cards) ── */}
            <div className="px-4 sm:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => {
                        const inCart = cart.find((i) => i.id === item.id);
                        return (
                            <div
                                key={item.id}
                                className="glass rounded-2xl overflow-hidden group hover:neon-border transition-all duration-300 animate-slide-up"
                            >
                                {/* Image/Emoji hero */}
                                <div className="h-40 flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900 relative overflow-hidden">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <span className="text-6xl group-hover:scale-110 transition-transform duration-500">
                                            {item.emoji}
                                        </span>
                                    )}
                                    <div className="absolute top-3 right-3 glass-light px-2 py-1 rounded-full text-xs text-neon-cyan font-medium z-10">
                                        ⭐ {item.rating}
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-display text-lg font-bold text-white mb-1">{item.name}</h3>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl font-bold gradient-text">${item.price.toFixed(2)}</span>
                                        <span className="text-xs text-dark-400">⏱ {item.time}</span>
                                    </div>

                                    {/* Add to Cart Controls (Touch-friendly 48px targets) */}
                                    {inCart ? (
                                        <div className="flex items-center justify-between">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="touch-target w-12 h-12 rounded-xl bg-dark-700 hover:bg-red-500/20 text-dark-200 hover:text-red-400 transition-all active:scale-90"
                                            >
                                                <Minus size={20} />
                                            </button>
                                            <span className="text-xl font-bold text-white min-w-[3rem] text-center">
                                                {inCart.quantity}
                                            </span>
                                            <button
                                                onClick={() => addToCart(item)}
                                                className="touch-target w-12 h-12 rounded-xl bg-aura-600 hover:bg-aura-500 text-white transition-all active:scale-90"
                                            >
                                                <Plus size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="neon"
                                            size="lg"
                                            className="w-full"
                                            onClick={() => addToCart(item)}
                                        >
                                            <Plus size={18} />
                                            Add to Order
                                        </Button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Floating Cart Button ── */}
            {cartCount > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
                    <button
                        onClick={() => setShowCart(true)}
                        className="flex items-center gap-4 bg-gradient-to-r from-aura-600 to-aura-500 text-white px-8 py-4 rounded-2xl shadow-2xl shadow-aura-600/40 hover:shadow-aura-500/60 transition-all active:scale-95"
                    >
                        <ShoppingCart size={22} />
                        <span className="font-bold text-lg">{cartCount} items</span>
                        <span className="bg-white/20 px-4 py-1 rounded-xl font-bold">
                            ${cartTotal.toFixed(2)}
                        </span>
                    </button>
                </div>
            )}

            {/* ── Cart Overlay ── */}
            {showCart && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowCart(false)} />
                    <div className="relative w-full sm:max-w-md glass rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
                        {orderPlaced ? (
                            <div className="py-12 text-center animate-slide-up">
                                <div className="w-20 h-20 mx-auto rounded-full bg-neon-green/20 flex items-center justify-center mb-4">
                                    <Check size={40} className="text-neon-green" />
                                </div>
                                <h3 className="font-display text-2xl font-bold text-white mb-2">Order Placed!</h3>
                                <p className="text-dark-300">Your robot is preparing to deliver 🤖</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
                                        <ShoppingCart className="text-aura-400" size={24} />
                                        Your Order
                                    </h2>
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className="touch-target w-10 h-10 rounded-xl bg-dark-700 hover:bg-dark-600 text-dark-300 hover:text-white transition-all flex items-center justify-center"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>

                                <div className="space-y-3 mb-6">
                                    {cart.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 bg-dark-800/50 rounded-xl p-3"
                                        >
                                            <span className="text-2xl">{item.emoji}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white text-sm truncate">{item.name}</p>
                                                <p className="text-xs text-dark-400">${item.price.toFixed(2)} each</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-8 h-8 rounded-lg bg-dark-700 hover:bg-red-500/20 text-dark-300 hover:text-red-400 transition-all flex items-center justify-center active:scale-90"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart(item)}
                                                    className="w-8 h-8 rounded-lg bg-aura-600 hover:bg-aura-500 text-white transition-all flex items-center justify-center active:scale-90"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-dark-700 pt-4 mb-4">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className="text-dark-200">Total</span>
                                        <span className="gradient-text text-xl">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button
                                    variant="primary"
                                    size="xl"
                                    className="w-full"
                                    onClick={handlePlaceOrder}
                                >
                                    <Send size={20} />
                                    Place Order — Table {tableNumber}
                                    <Sparkles size={16} className="text-neon-cyan" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default RobotUI;
