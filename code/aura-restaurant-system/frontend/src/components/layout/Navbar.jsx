import { NavLink, useLocation } from 'react-router-dom';
import { Bot, LayoutDashboard, ChefHat, Zap } from 'lucide-react';

const navItems = [
    { path: '/', label: 'Robot UI', icon: Bot },
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/kitchen', label: 'Kitchen', icon: ChefHat },
];

function Navbar() {
    const location = useLocation();

    return (
        <nav className="glass sticky top-0 z-50 border-b border-dark-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-aura-500 to-neon-cyan flex items-center justify-center shadow-lg shadow-aura-500/30">
                            <Zap size={20} className="text-white" />
                        </div>
                        <span className="font-display text-xl font-bold gradient-text tracking-tight">
                            AURA
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex items-center gap-1">
                        {navItems.map(({ path, label, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <NavLink
                                    key={path}
                                    to={path}
                                    className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300 ease-out
                    ${isActive
                                            ? 'bg-aura-600/20 text-aura-300 shadow-inner shadow-aura-500/10 border border-aura-500/20'
                                            : 'text-dark-300 hover:text-white hover:bg-dark-700/50'
                                        }
                  `}
                                >
                                    <Icon size={18} />
                                    <span className="hidden sm:inline">{label}</span>
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Status */}
                    <div className="hidden md:flex items-center gap-2 text-xs text-dark-400">
                        <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                        System Online
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
