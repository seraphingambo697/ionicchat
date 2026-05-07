import { useState, useEffect } from "react";
import { Preferences } from "@capacitor/preferences";

const PREF_KEY = "app_theme";

function applyTheme(dark: boolean) {
  document.body.classList.toggle("dark", dark);
}

export function useTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    Preferences.get({ key: PREF_KEY }).then(({ value }) => {
      const dark = value === "dark";
      setIsDark(dark);
      applyTheme(dark);
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
    await Preferences.set({ key: PREF_KEY, value: next ? "dark" : "light" });
  };

  return { isDark, toggleTheme };
}
