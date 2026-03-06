import { Zap } from 'lucide-react';

function Footer() {
    return (
        <footer className="glass border-t border-dark-700/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-aura-500 to-neon-cyan flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-medium gradient-text">AURA System</span>
                    </div>
                    <p className="text-xs text-dark-400">
                        © {new Date().getFullYear()} Project AURA — Smart Robot-Assisted Restaurant System
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
