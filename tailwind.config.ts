import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            container: {
                center: true,
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1440px'
                }
            },
            colors: {
                white: {
                    DEFAULT: 'var(--white)',
                    light: '#ffffff'
                },
                black: {
                    DEFAULT: 'var(--black)',
                    dark: '#000000'
                },
                blue: 'var(--blue)',
                green: 'var(--green)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                gray: {
                    '100': 'var(--gray-100)',
                    '200': 'var(--gray-200)',
                    '300': 'var(--gray-300)',
                    '400': 'var(--gray-400)',
                    '500': 'var(--gray-500)',
                    '600': 'var(--gray-600)',
                    '700': 'var(--gray-700)'
                },
                yellow: {
                    '100': 'var(--yellow-100)',
                    '200': 'var(--yellow-200)',
                    '300': 'var(--yellow-300)',
                    '400': 'var(--yellow-400)',
                    '500': 'var(--yellow-500)',
                    '600': 'var(--yellow-600)',
                    '700': 'var(--yellow-700)',
                    '800': 'var(--yellow-800)',
                    '900': 'var(--yellow-900)'
                },
                red: {
                    '100': 'var(--red-100)',
                    '200': 'var(--red-200)',
                    '300': 'var(--red-300)',
                    '400': 'var(--red-400)',
                    '500': 'var(--red-500)',
                    '600': 'var(--red-600)',
                    '700': 'var(--red-700)',
                    '800': 'var(--red-800)',
                    '900': 'var(--red-900)'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [require('tailwindcss-animate')]
};

export default config;
