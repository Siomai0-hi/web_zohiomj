const themeButton = document.querySelector("#theme-toggle");
const flipCards = document.querySelectorAll(".flip-card");

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeButton.setAttribute("aria-pressed", String(isDark));
  themeButton.setAttribute("aria-label", isDark ? "Гэрэлтэй горим асаах" : "Бараан горим асаах");
  localStorage.setItem("lab6-theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("lab6-theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

themeButton.addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

flipCards.forEach((card) => {
  const front = card.querySelector(".card-front");
  const back = card.querySelector(".card-back");
  const frontButton = front.querySelector(".flip-toggle");
  const backButton = back.querySelector(".flip-toggle");

  function showFace(showFront, moveFocus = false) {
    card.classList.toggle("is-flipped", !showFront);
    front.setAttribute("aria-hidden", String(!showFront));
    back.setAttribute("aria-hidden", String(showFront));
    front.inert = !showFront;
    back.inert = showFront;
    frontButton.setAttribute("aria-pressed", String(!showFront));
    backButton.setAttribute("aria-pressed", String(!showFront));

    if (moveFocus) {
      (showFront ? frontButton : backButton).focus({ preventScroll: true });
    }
  }

  frontButton.addEventListener("click", () => showFace(false, true));
  backButton.addEventListener("click", () => showFace(true, true));
});