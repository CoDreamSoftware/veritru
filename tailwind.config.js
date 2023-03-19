/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', 
        './public/**/*.html',
    ],
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['Poppins'],
            },
        }
    },
}
