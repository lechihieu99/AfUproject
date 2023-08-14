/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black-200': '#0000004d',
      'white': '#ffffff',
      'white-200': '#ffffff4d',
      'blue-velvet': '#313466',
      'blue-velvet-500': '#31346680',
      'blue-velvet-200': '#31346633',
      'greyblue': '#504096',
      'greyblue-500': '#50409680',
      'greyblue-200': '#50409633',
      'purple-velvet': '#964EC2',
      'pink-velvet': '#FF7BBF'
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    }),
  ],
}

