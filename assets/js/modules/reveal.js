const THRESHOLD = 0.4;

export function initReveal() {
  // Tells the <head> fallback that the reveal is under control, so it won't
  // unhide everything on load.
  document.documentElement.dataset.revealReady = "true";

  const targets = document.querySelectorAll("[data-reveal]");
  if (targets.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { threshold: THRESHOLD },
  );

  targets.forEach((target) => observer.observe(target));
}
