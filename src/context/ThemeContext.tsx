import { createContext, useContext, useEffect, useState } from "react";

type Tema = "light" | "dark";

interface ThemeContextType {
  tema: Tema;
  toggleTema: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tema, setTema] = useState<Tema>(() => {
    return localStorage.getItem("tema") === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    if (tema === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("tema", tema);
  }, [tema]);

  function toggleTema() {
    setTema((temaActual) => (temaActual === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }

  return context;
}