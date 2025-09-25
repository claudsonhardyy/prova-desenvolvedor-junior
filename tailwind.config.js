import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // dark mode controlado via classe
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#ef4444', // vermelho claro
                    DEFAULT: '#dc2626', // vermelho principal IESB
                    dark: '#b91c1c', // vermelho mais forte
                },
                background: {
                    light: '#ffffff',
                    dark: '#1a1a1a',
                },
                text: {
                    light: '#111827',
                    dark: '#f9fafb',
                },
            },
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms],
};
