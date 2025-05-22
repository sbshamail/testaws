import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
function generateOpacityVariants(baseColor: string) {
  const variants: any = {};
  const opacityValues = [80, 10, 20, 30, 40, 50, 60, 70, 90];

  opacityValues.forEach((value) => {
    variants[value] = `hsla(var(--${baseColor}), 0.${value})`;
  });
  return variants;
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "480px", // Extra small devices (phones)
      sm: "640px", // Small devices (landscape phones)
      md: "976px",
      lg: "1200px",
      xl: "1536px",
    },
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          ...generateOpacityVariants("background"),
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          ...generateOpacityVariants("foreground"),
        },
        effect: "hsla(var(--effect))",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          over: "hsl(var(--primary-over))",
          ...generateOpacityVariants("primary"),
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          over: "hsl(var(--secondary-over))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          ...generateOpacityVariants("accent"),
        },
        select: {
          background: {
            DEFAULT: "hsla(var(--primary) , 0.1)",
            open: "hsla(var(--primary),0.1)",
            match: "hsla(var(--primary),0.3)",
            over: "hsla(var(--primary),0.2)",
          },
          foreground: {
            DEFAULT: "hsla(var(--foreground),0.9)",
            match: "hsla(var(--foreground))",
          },
          icon: {
            DEFAULT: "hsla(var(--foreground),0.5)",
            match: "hsl(var(--primary))",
          },
        },

        ring: "hsl(var(--ring))",
        muted: "hsl(var(--muted))",
      },
      textShadow: {
        DEFAULT: "0 1px 2px hsl(var(--shadow),0.2)",
        md: "0 2px 4px hsl(var(--ring))",
        lg: "0 4px 8px  hsl(var(--ring))",
        xl: "0 8px 16px  hsl(var(--ring))",
      },
      zIndex: {
        selection: "var(--selection)",
        popOver: "var(--popOver)",
        drawer: "var(--drawer)",
        modal: "var(--modal)",
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
          },
        },
      }),
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-filters"),
    plugin(function ({ addUtilities, matchUtilities, theme }: any) {
      const newUtilities = {};

      matchUtilities(
        {
          "text-shadow": (value: any) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
export default config;
