export function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function getTimeSince(isoString) {
    const seconds = Math.floor((new Date() - new Date(isoString)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

export function getStatusColor(status) {
    const colors = {
        new: { bg: 'bg-neon-cyan/10', text: 'text-neon-cyan', dot: 'bg-neon-cyan' },
        preparing: { bg: 'bg-neon-orange/10', text: 'text-neon-orange', dot: 'bg-neon-orange' },
        ready: { bg: 'bg-neon-green/10', text: 'text-neon-green', dot: 'bg-neon-green' },
        completed: { bg: 'bg-aura-500/10', text: 'text-aura-400', dot: 'bg-aura-400' },
        cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400' },
    };
    return colors[status] || colors.new;
}
