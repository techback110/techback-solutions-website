export type Theme = "dark" | "light";
export const THEME_KEY = "studio:theme";

/** Runs before paint so the saved theme is applied without a flash. Dark is the brand default. */
export const themeScript = `try{var t=localStorage.getItem("${THEME_KEY}");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;
