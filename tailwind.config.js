import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // habilita dark mode por classe
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                // Vermelho institucional IESB
                primary: {
                    light: '#E63946',
                    DEFAULT: '#D71920',
                    dark: '#B31217',
                },
                // Fundos
                background: {
                    light: '#FFFFFF', // fundo claro
                    dark: '#0D1117',  // fundo escuro (azul quase preto)
                },
                // Superfícies (cartões, caixas)
                surface: {
                    light: '#F9FAFB', // cinza claro para cards
                    dark: '#1E2734',  // cinza azulado para cards dark
                },
                // Texto
                text: {
                    light: '#111827', // quase preto no light
                    dark: '#E5E7EB',  // cinza claro no dark
                },
            },
            fontFamily: {
                sans: ['Roboto', ...defaultTheme.fontFamily.sans], // Fonte usada pelo IESB
            },
        },
    },

    plugins: [forms],
};
