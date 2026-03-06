import { forwardRef } from 'react';

const variants = {
    primary:
        'bg-gradient-to-r from-aura-600 to-aura-500 hover:from-aura-500 hover:to-aura-400 text-white shadow-lg shadow-aura-600/20',
    secondary:
        'bg-dark-700 hover:bg-dark-600 text-dark-100 border border-dark-500 hover:border-aura-500/40',
    danger:
        'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-600/20',
    ghost:
        'bg-transparent hover:bg-dark-700/50 text-dark-200 hover:text-white',
    neon:
        'bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan/60 shadow-lg shadow-neon-cyan/10',
};

const sizes = {
    sm: 'px-3 py-1.5 text-xs rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3.5 text-base rounded-xl',
    xl: 'px-8 py-4 text-lg rounded-2xl touch-target',
};

const Button = forwardRef(
    ({ variant = 'primary', size = 'md', children, className = '', disabled, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={`
          ${variants[variant]}
          ${sizes[size]}
          font-semibold transition-all duration-300 ease-out
          active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100
          btn-glow inline-flex items-center justify-center gap-2
          ${className}
        `}
                disabled={disabled}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
