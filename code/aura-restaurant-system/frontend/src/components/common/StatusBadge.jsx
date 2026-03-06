import { getStatusColor } from '../../utils/helpers';

function StatusBadge({ status }) {
    const colors = getStatusColor(status);

    return (
        <span
            className={`
        inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider
        ${colors.bg} ${colors.text}
      `}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse-soft`} />
            {status}
        </span>
    );
}

export default StatusBadge;
