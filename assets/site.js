(function () {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) document.documentElement.setAttribute("data-theme", saved);

  window.setTheme = function (theme) {
    if (theme === "auto") {
      localStorage.removeItem("portfolio-theme");
      document.documentElement.removeAttribute("data-theme");
      return;
    }
    localStorage.setItem("portfolio-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  };

  const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  for (const a of document.querySelectorAll("nav a")) {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === page) a.classList.add("active");
  }
})();
