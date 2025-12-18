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
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				'display': ['Inter', 'system-ui', 'sans-serif'],
			},
			// Spacing scale from design guidelines
			spacing: {
				'none': '0px',
				'xs': '4px',
				'sm': '8px',
				'md': '12px',
				'lg': '16px',
				'xl': '28px',
				'full': '1000px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// Brand/Primary colors
				brand: {
					DEFAULT: 'hsl(var(--brand))',
					foreground: 'hsl(var(--brand-foreground))',
					container: 'hsl(var(--brand-container))',
					soft: 'hsl(var(--brand-soft))',
					bold: 'hsl(var(--brand-bold))',
					'on-container': 'hsl(var(--on-brand-container))',
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
				// UI/Surface colors
				surface: {
					DEFAULT: 'hsl(var(--surface))',
					'interface-light': 'hsl(var(--interface-light))',
					'interface-dark': 'hsl(var(--interface-dark))',
				},
				divider: {
					light: 'hsl(var(--divider-light))',
					dark: 'hsl(var(--divider-dark))',
				},
				// Text colors
				text: {
					primary: 'hsl(var(--text-primary))',
					secondary: 'hsl(var(--text-secondary))',
					tertiary: 'hsl(var(--text-tertiary))',
				},
				// Success colors
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					container: 'hsl(var(--success-container))',
					soft: 'hsl(var(--success-soft))',
					bold: 'hsl(var(--success-bold))',
					'on-container': 'hsl(var(--on-success-container))',
				},
				// Warning colors
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					container: 'hsl(var(--warning-container))',
					soft: 'hsl(var(--warning-soft))',
					bold: 'hsl(var(--warning-bold))',
					'on-container': 'hsl(var(--on-warning-container))',
				},
				// Error colors
				error: {
					DEFAULT: 'hsl(var(--error))',
					foreground: 'hsl(var(--error-foreground))',
					container: 'hsl(var(--error-container))',
					soft: 'hsl(var(--error-soft))',
					bold: 'hsl(var(--error-bold))',
					'on-container': 'hsl(var(--on-error-container))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				// Extra colors
				pink: {
					DEFAULT: 'hsl(var(--pink))',
					container: 'hsl(var(--pink-container))',
					soft: 'hsl(var(--pink-soft))',
					bold: 'hsl(var(--pink-bold))',
					'on-container': 'hsl(var(--on-pink-container))',
				},
				violet: {
					DEFAULT: 'hsl(var(--violet))',
					container: 'hsl(var(--violet-container))',
					soft: 'hsl(var(--violet-soft))',
					bold: 'hsl(var(--violet-bold))',
					'on-container': 'hsl(var(--on-violet-container))',
				},
				blue: {
					DEFAULT: 'hsl(var(--blue))',
					container: 'hsl(var(--blue-container))',
					soft: 'hsl(var(--blue-soft))',
					bold: 'hsl(var(--blue-bold))',
					'on-container': 'hsl(var(--on-blue-container))',
				},
				teal: {
					DEFAULT: 'hsl(var(--teal))',
					container: 'hsl(var(--teal-container))',
					soft: 'hsl(var(--teal-soft))',
					bold: 'hsl(var(--teal-bold))',
					'on-container': 'hsl(var(--on-teal-container))',
				},
				green: {
					DEFAULT: 'hsl(var(--green))',
					container: 'hsl(var(--green-container))',
					soft: 'hsl(var(--green-soft))',
					bold: 'hsl(var(--green-bold))',
					'on-container': 'hsl(var(--on-green-container))',
				},
				orange: {
					DEFAULT: 'hsl(var(--orange))',
					container: 'hsl(var(--orange-container))',
					soft: 'hsl(var(--orange-soft))',
					bold: 'hsl(var(--orange-bold))',
					'on-container': 'hsl(var(--on-orange-container))',
				},
				yellow: {
					DEFAULT: 'hsl(var(--yellow))',
					container: 'hsl(var(--yellow-container))',
					soft: 'hsl(var(--yellow-soft))',
					bold: 'hsl(var(--yellow-bold))',
					'on-container': 'hsl(var(--on-yellow-container))',
				},
				red: {
					DEFAULT: 'hsl(var(--red))',
					container: 'hsl(var(--red-container))',
					soft: 'hsl(var(--red-soft))',
					bold: 'hsl(var(--red-bold))',
					'on-container': 'hsl(var(--on-red-container))',
				},
				coral: {
					DEFAULT: 'hsl(var(--coral))',
					container: 'hsl(var(--coral-container))',
					soft: 'hsl(var(--coral-soft))',
					bold: 'hsl(var(--coral-bold))',
					'on-container': 'hsl(var(--on-coral-container))',
				},
				// Shadcn mapped tokens
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
				// Elevation shadows from design guidelines
				'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 2px 3px 1px rgba(0, 0, 0, 0.05)',
				'elevation-2': '0 2px 2px 1px rgba(0, 0, 0, 0.04), 0 3px 6px 2px rgba(0, 0, 0, 0.05)',
				'elevation-3': '0 2px 3px 0 rgba(0, 0, 0, 0.05), 0 4px 8px 3px rgba(0, 0, 0, 0.06)',
				'elevation-4': '0 2px 3px 0 rgba(0, 0, 0, 0.05), 0 6px 10px 4px rgba(0, 0, 0, 0.06)',
				'elevation-5': '0 4px 4px 0 rgba(0, 0, 0, 0.05), 0 8px 12px 6px rgba(0, 0, 0, 0.06)',
				'bottom-sheet': '0 -4px 4px 0 rgba(0, 0, 0, 0.05), 0 -8px 12px 6px rgba(0, 0, 0, 0.06)',
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