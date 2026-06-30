const observerOptions = {
  threshold: 0.4,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("opacity-0");
  observer.observe(section);
});

document.querySelectorAll(".group").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});
