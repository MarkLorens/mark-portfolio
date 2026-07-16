export function initPrint() {
  const button = document.querySelector("[data-print-resume]");
  if (!button) return;

  button.addEventListener("click", () => window.print());
}
