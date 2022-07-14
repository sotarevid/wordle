/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.js",
    ],
    theme: {
        colors: {
            correct: '#CAFFBF',
            wrong: '#FFADAD',
            partial: '#FDFFB6',
            dark: '#464F51',
            light: '#f4f4f4',
            letter: '#555555',
            empty: '#A3A3A3',
            white: '#FFFFFF'
        },
        extend: {
            transitionProperty: {
                'bg': 'background-color',
            },
            transitionDuration: {
                '1200': '1200ms',
            }
        },
    },
    plugins: [],
}
