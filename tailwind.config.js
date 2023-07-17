/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },

                // Greens
                'green-100': '#50B2C0',
                'green-200': '#255D6A',
                'green-300': '#0A313C',

                // Purples
                'purple-100': '#8381D9',
                'purple-200': '#2A2879',

                // Grays
                'gray-100': '#F8F9FC',
                'gray-200': '#E6E8F2',
                'gray-300': '#D1D6E4',
                'gray-400': '#8D95AF',
                'gray-500': '#303F73',
                'gray-600': '#252D4A',
                'gray-700': '#181C2A',
                'gray-800': '#0E1116',

                'gradient-horizontal':
                    'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
                'gradient-vertical':
                    'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
            },
            backgroundImage: {
                'gradient-horizontal':
                    'linear-gradient(90deg, #7FD1CC 0%, #9694F5 100%)',
                'gradient-vertical':
                    'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
                'hero-navigation': 'url("/images/bg-sidebar.png")',
                'hero-login': 'url("/images/bg-hero.png")',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: 0 },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: 0 },
                },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
            },
        },
    },
    plugins: [require('tailwindcss-animate')],
}
