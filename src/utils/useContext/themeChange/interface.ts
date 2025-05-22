export interface TypeThemeContextProps {
  toggleMode?: () => void;
  toggleTheme: (colorName: string) => void;
  labelTheme: string;
}
