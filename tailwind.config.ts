import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Roboto', 'system-ui', 'sans-serif'],
				'display': ['Roboto', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// MD3 Surface colors
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					dim: 'hsl(var(--surface-dim))',
					bright: 'hsl(var(--surface-bright))',
					'container-lowest': 'hsl(var(--surface-container-lowest))',
					'container-low': 'hsl(var(--surface-container-low))',
					'container': 'hsl(var(--surface-container))',
					'container-high': 'hsl(var(--surface-container-high))',
					'container-highest': 'hsl(var(--surface-container-highest))',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					container: 'hsl(var(--primary-container))',
					'on-container': 'hsl(var(--on-primary-container))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					container: 'hsl(var(--secondary-container))',
					'on-container': 'hsl(var(--on-secondary-container))',
				},
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary))',
					foreground: 'hsl(var(--tertiary-foreground))',
					container: 'hsl(var(--tertiary-container))',
					'on-container': 'hsl(var(--on-tertiary-container))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
					container: 'hsl(var(--error-container))',
					'on-container': 'hsl(var(--on-error-container))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				outline: {
					DEFAULT: 'hsl(var(--outline))',
					variant: 'hsl(var(--outline-variant))',
				},
				// Circadian rhythm specific colors
				sleep: {
					DEFAULT: 'hsl(var(--sleep))',
					foreground: 'hsl(var(--sleep-foreground))',
					light: 'hsl(var(--sleep-light))'
				},
				'light-seek': {
					DEFAULT: 'hsl(var(--light-seek))',
					foreground: 'hsl(var(--light-seek-foreground))'
				},
				'light-avoid': {
					DEFAULT: 'hsl(var(--light-avoid))',
					foreground: 'hsl(var(--light-avoid-foreground))'
				},
				melatonin: {
					DEFAULT: 'hsl(var(--melatonin))',
					foreground: 'hsl(var(--melatonin-foreground))',
					light: 'hsl(var(--melatonin-light))'
				},
				caffeine: {
					DEFAULT: 'hsl(var(--caffeine))',
					foreground: 'hsl(var(--caffeine-foreground))',
					light: 'hsl(var(--caffeine-light))'
				},
				nap: {
					DEFAULT: 'hsl(var(--nap))',
					foreground: 'hsl(var(--nap-foreground))',
					light: 'hsl(var(--nap-light))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				'xs': 'var(--radius-xs)',
				'sm': 'var(--radius-sm)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'full': 'var(--radius-full)',
			},
			boxShadow: {
				// MD3 Elevation shadows
				'elevation-1': '0 1px 2px 0 hsl(var(--foreground) / 0.05)',
				'elevation-2': '0 1px 3px 0 hsl(var(--foreground) / 0.1), 0 1px 2px -1px hsl(var(--foreground) / 0.1)',
				'elevation-3': '0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -2px hsl(var(--foreground) / 0.1)',
				'elevation-4': '0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -4px hsl(var(--foreground) / 0.1)',
				'elevation-5': '0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)',
			},
			transitionTimingFunction: {
				'emphasized': 'var(--motion-easing-emphasized)',
				'emphasized-decelerate': 'var(--motion-easing-emphasized-decelerate)',
				'emphasized-accelerate': 'var(--motion-easing-emphasized-accelerate)',
				'standard': 'var(--motion-easing-standard)',
			},
			transitionDuration: {
				'short': 'var(--motion-duration-short)',
				'medium': 'var(--motion-duration-medium)',
				'long': 'var(--motion-duration-long)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'ripple': {
					'0%': { transform: 'scale(0)', opacity: '0.35' },
					'100%': { transform: 'scale(4)', opacity: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(4px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ripple': 'ripple 0.6s linear',
				'fade-in': 'fade-in 0.2s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
