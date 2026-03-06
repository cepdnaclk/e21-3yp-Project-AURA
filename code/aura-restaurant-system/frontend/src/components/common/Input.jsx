import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', icon: Icon, ...props }, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-dark-200 mb-1.5">{label}</label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    ref={ref}
                    className={`
            w-full bg-dark-800/80 border border-dark-500 rounded-xl px-4 py-3
            text-dark-50 placeholder-dark-400
            focus:outline-none focus:border-aura-500 focus:ring-2 focus:ring-aura-500/20
            transition-all duration-200
            ${Icon ? 'pl-10' : ''}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
