import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Bot,
    ChefHat,
    Settings,
    BarChart3,
    Users,
    Package,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/', label: 'Robot Control', icon: Bot },
    { path: '/kitchen', label: 'Kitchen Display', icon: ChefHat },
    { type: 'divider' },
    { path: '/admin/analytics', label: 'Analytics', icon: BarChart3, disabled: true },
    { path: '/admin/staff', label: 'Staff', icon: Users, disabled: true },
    { path: '/admin/inventory', label: 'Inventory', icon: Package, disabled: true },
    { type: 'divider' },
    { path: '/admin/settings', label: 'Settings', icon: Settings, disabled: true },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`
        glass h-[calc(100vh-4rem)] sticky top-16 border-r border-dark-700/50
        transition-all duration-300 ease-out
        ${collapsed ? 'w-16' : 'w-60'}
      `}
        >
            <div className="flex flex-col h-full p-3">
                {/* Toggle */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="self-end mb-4 p-1.5 rounded-lg hover:bg-dark-700/50 text-dark-400 hover:text-white transition-colors"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                {/* Menu Items */}
                <nav className="flex flex-col gap-1 flex-1">
                    {menuItems.map((item, i) => {
                        if (item.type === 'divider') {
                            return <hr key={i} className="border-dark-700/50 my-2" />;
                        }
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.path}
                                to={item.disabled ? '#' : item.path}
                                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${item.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                  ${isActive && !item.disabled
                                        ? 'bg-aura-600/20 text-aura-300 border border-aura-500/20'
                                        : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                                    }
                `}
                                onClick={(e) => item.disabled && e.preventDefault()}
                            >
                                <Icon size={18} />
                                {!collapsed && <span>{item.label}</span>}
                            </NavLink>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
