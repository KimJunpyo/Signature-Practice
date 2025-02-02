import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  onToggle: () => void;
}

const themeContext = createContext<ThemeContextType>({
  theme: "light",
  onToggle: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <themeContext.Provider value={{ theme, onToggle: handleChangeTheme }}>
      {children}
    </themeContext.Provider>
  );
};

const ThemeComponent = () => {
  const { theme, onToggle } = useContext(themeContext);
  return (
    <div style={{ backgroundColor: theme === "light" ? "yellow" : "grey" }}>
      <h1>{theme}</h1>
      <button onClick={onToggle}>change</button>
    </div>
  );
};

export { ThemeProvider, ThemeComponent };
