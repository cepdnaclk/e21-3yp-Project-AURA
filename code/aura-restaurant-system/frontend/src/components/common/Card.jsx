function Card({ children, className = '', hover = true, glow = false, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`
        glass rounded-2xl p-6
        ${hover ? 'hover:bg-dark-700/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-aura-600/5 cursor-pointer' : ''}
        ${glow ? 'neon-border animate-glow' : ''}
        transition-all duration-300 ease-out
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
        >
            {children}
        </div>
    );
}

export default Card;
