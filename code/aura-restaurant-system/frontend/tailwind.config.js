/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'system-ui', 'sans-serif'],
            },
            colors: {
                aura: {
                    50: '#f0f4ff',
                    100: '#dbe4ff',
                    200: '#bac8ff',
                    300: '#91a7ff',
                    400: '#748ffc',
                    500: '#5c7cfa',
                    600: '#4c6ef5',
                    700: '#4263eb',
                    800: '#3b5bdb',
                    900: '#364fc7',
                    950: '#1a2a6c',
                },
                neon: {
                    cyan: '#00f5ff',
                    blue: '#4c6ef5',
                    purple: '#7c3aed',
                    pink: '#ec4899',
                    green: '#10b981',
                    orange: '#f59e0b',
                },
                dark: {
                    50: '#e6e8ec',
                    100: '#c2c7d0',
                    200: '#9ba3b2',
                    300: '#747f94',
                    400: '#576478',
                    500: '#3a495d',
                    600: '#344255',
                    700: '#2c374b',
                    800: '#252d41',
                    900: '#181e30',
                    950: '#0d1117',
                },
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-in-right': 'slideInRight 0.3s ease-out',
                'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
                'shimmer': 'shimmer 2s linear infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(76, 110, 245, 0.5), 0 0 20px rgba(76, 110, 245, 0.2)' },
                    '100%': { boxShadow: '0 0 10px rgba(76, 110, 245, 0.8), 0 0 40px rgba(76, 110, 245, 0.4)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInRight: {
                    '0%': { opacity: '0', transform: 'translateX(20px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                pulseSoft: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
};
