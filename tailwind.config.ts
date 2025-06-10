import { Config } from 'tailwindcss';
const config: Config = {
    content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            // Custom utilities
            boxShadow: {
                'button-inset': 'inset 0 -2px 4px rgba(0,0,0,0.2)',
            },
            borderWidth: {
                '6': '6px',
            },
            translate: {
                '4px': '4px',
            }
        }
    },
    plugins: [
        function ({ addComponents }) {
            addComponents({
                '.square-button': {
                    '@apply w-20 h-20 bg-gray-200 border-b-[6px] border-r-[6px] border-gray-500 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-800 hover:bg-gray-300 transition-all': {},
                    'box-shadow': 'inset 0 -2px 4px rgba(0,0,0,0.2)',
                    '&:active': {
                        '@apply border-b-[2px] border-r-[2px]': {},
                        'transform': 'translateY(4px)',
                    }
                }
            })
        }
    ],
};
export default config;