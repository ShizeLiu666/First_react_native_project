/** @type {import('tailwindcss').Config} */
module.exports = {
  // Content paths: Tell Tailwind where to look for class names
  // It scans these files and only includes the styles you actually use
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  
  // Presets: Load NativeWind preset for React Native compatibility
  presets: [require("nativewind/preset")],
  
  theme: {
    extend: {
      // Custom color palette
      colors: {
        // Brand primary color (orange) - Usage: bg-primary, text-primary
        primary: "#FE8C00",
        
        // White shades
        white: {
          DEFAULT: "#ffffff",  // Pure white - Usage: bg-white
          100: "#fafafa",      // Off-white (lightest) - Usage: bg-white-100
          200: "#FE8C00",      // Note: This is orange, might need adjustment
        },
        
        // Gray shades (lower numbers = lighter, higher numbers = darker)
        gray: {
          100: "#878787",  // Medium gray - Usage: text-gray-100
          200: "#878787",  // Same as 100 (consider differentiating)
        },
        
        // Dark theme colors
        dark: {
          100: "#181C2E",  // Dark blue-gray - Usage: bg-dark-100
        },
        
        // Status colors for feedback
        error: "#F14141",    // Red for errors - Usage: text-error
        success: "#2F9B65",  // Green for success - Usage: text-success
      },
      
      // Custom font families
      // Note: These fonts need to be loaded in your app before use
      fontFamily: {
        quicksand: ["Quicksand-Regular", "sans-serif"],          // Usage: font-quicksand
        "quicksand-bold": ["Quicksand-Bold", "sans-serif"],      // Usage: font-quicksand-bold
        "quicksand-semibold": ["Quicksand-SemiBold", "sans-serif"], // Usage: font-quicksand-semibold
        "quicksand-medium": ["Quicksand-Medium", "sans-serif"],  // Usage: font-quicksand-medium
      },
    },
  },
  
  // Additional Tailwind plugins (none currently)
  plugins: [],
};