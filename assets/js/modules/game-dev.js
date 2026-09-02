/* Game-dev portfolio only. Two independent, non-essential behaviors:
   - an exclusive accordion over the case-study rows (one open at a time)
   - a decorative contact-form "submit" (no backend — the real contact paths
     are the mailto/GitHub links beside it; this just mirrors the source
     design's own no-op form). */

const rows = document.querySelectorAll("[data-case-toggle]");

rows.forEach((row) => {
  const id = row.dataset.caseToggle;
  const detail = document.querySelector(`[data-case-detail="${id}"]`);
  const sign = row.querySelector("[data-case-sign]");
  if (!detail || !sign) return;

  row.addEventListener("click", () => {
    const opening = !detail.classList.contains("is-open");

    rows.forEach((otherRow) => {
      const otherId = otherRow.dataset.caseToggle;
      const otherDetail = document.querySelector(`[data-case-detail="${otherId}"]`);
      const otherSign = otherRow.querySelector("[data-case-sign]");
      if (!otherDetail || !otherSign) return;
      otherDetail.classList.remove("is-open");
      otherSign.textContent = "+";
    });

    if (opening) {
      detail.classList.add("is-open");
      sign.textContent = "−";
    }
  });
});

const form = document.querySelector("[data-gamedev-form]");
if (form) {
  const button = form.querySelector("button[type='submit']");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (button) button.textContent = "sent — talk soon";
  });
}
