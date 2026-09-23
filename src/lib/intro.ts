export const INTRO_KEY = "studio:intro-seen";
export const INTRO_DURATION = 1.9;

/** Runs before paint so returning visitors never see the preloader curtain flash. */
export const introScript = `try{if(sessionStorage.getItem("${INTRO_KEY}")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("intro-seen")}catch(e){}`;
