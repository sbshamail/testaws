/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
function generateOpacityVariants(baseColor) {
  const variants = {};
  const opacityValues = [0.5, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  opacityValues.forEach((value) => {
    variants[value] = `hsla(var(--${baseColor}), 0.${value})`;
  });
  return variants;
}
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: "400px",
      xs: "480px", // Extra small devices (phones)
      sm: "640px", // Small devices (landscape phones)
      md: "800px",
      lg: "1024px",
      xlg: "1152px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1900px",
      full: "100%",
      sidebar: "1024px",
    },
    border: "hsl(var(--border))",
    input: "hsl(var(--input))",
    ring: "hsl(var(--ring))",

    extend: {
      colors: {
        siteBlue: "#00b7ff",
        siteBlueHover: "#0097cc",
        siteLoginColor: "#9BA7C9",
        siteHighLight: "#0a5d77",
        siteOrange: "#ff9900",
        // inputBackgroundColor: "#F4F4F4",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: {
          DEFAULT: "hsl(var(--ring))",
          ...generateOpacityVariants("ring"),
        },

        effect: {
          DEFAULT: "hsla(var(--ring),0.05)",
          sm: "hsla(var(--ring),0.02)",
          md: "hsla(var(--ring),0.1)",
          lg: "hsla(var(--ring),0.15)",
          xl: "hsla(var(--ring),0.20)",
          "2xl": "hsla(var(--ring),0.25)",
        },
        main: {
          DEFAULT: "hsl(var(--main))",
          ...generateOpacityVariants("main"),
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          ...generateOpacityVariants("background"),
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          ...generateOpacityVariants("foreground"),
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          ...generateOpacityVariants("primary"),
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        disable: {
          DEFAULT: "hsl(var(--disable))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        layout: {
          DEFAULT: "hsl(var(--layout))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          ...generateOpacityVariants("accent"),
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      zIndex: {
        selection: "var(--selection)",
        popOver: "var(--popOver)",
        navbar: "var(--navbar)",
        sidebar: "var(--sidebar)",
        drawer: "var(--drawer)",
        modal: "var(--modal)",
      },
      animation: {
        modalIn: "modalIn 0.3s ease-out forwards",
        dance: "dance 0.6s ease-in-out infinite",
      },
      keyframes: {
        modalIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        dance: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#00B7FF",
            },
          },
        },
      },
    }),
  ],
};
