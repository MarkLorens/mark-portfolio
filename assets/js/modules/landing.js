/* Landing page only — mirrors the original design's `state.hover` value onto
   [data-hover] so CSS can dim the sibling panel. Each panel's own hover/focus
   effects are pure CSS and keep working if this script never runs. */

const landing = document.querySelector("[data-landing]");

if (landing) {
  const panels = landing.querySelectorAll("[data-panel]");

  panels.forEach((panel) => {
    const side = panel.dataset.panel;
    const activate = () => {
      landing.dataset.hover = side;
    };
    const deactivate = () => {
      delete landing.dataset.hover;
    };

    panel.addEventListener("mouseenter", activate);
    panel.addEventListener("mouseleave", deactivate);
    panel.addEventListener("focus", activate);
    panel.addEventListener("blur", deactivate);
  });
}
