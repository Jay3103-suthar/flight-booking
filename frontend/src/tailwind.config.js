// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // 1. Point to your main index file
    "./index.html",
    
    // 2. Scan all files in the src directory with these extensions 
    //    (js, ts, jsx, tsx) for Tailwind classes. THIS IS CRUCIAL!
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // This is where you can customize your design tokens (colors, spacing, etc.)
    extend: {
      // Example of adding a custom color:
      // colors: {
      //   'custom-blue': '#1da1f2',
      // },
    },
  },
  plugins: [
    // Add any official or custom Tailwind plugins here
    // Example: require('@tailwindcss/forms'),
  ],
}
