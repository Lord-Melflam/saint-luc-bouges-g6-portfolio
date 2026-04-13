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

  function capStatus(value) {
    if (value === "in-progress") return "In progress";
    if (value === "planned") return "Planned";
    return "Done";
  }

  function statusClass(value) {
    if (value === "in-progress") return "status-in-progress";
    if (value === "planned") return "status-planned";
    return "status-done";
  }

  function renderDeliverables() {
    const tableBody = document.getElementById("deliverables-body");
    if (!tableBody) return;
    const weekFilter = document.getElementById("filter-week");
    const queryInput = document.getElementById("filter-query");

    function draw() {
      const week = weekFilter.value;
      const q = ((queryInput && queryInput.value) ? queryInput.value : "").trim().toLowerCase();

      // Canonical source: same dataset as Annexes page, filtered on type=deliverable
      if (window.ANNEXES_DATA) {
        const rows = window.ANNEXES_DATA.filter((a) => {
          const w = week === "all" || String(a.week) === week;
          const t = a.type === "deliverable";
          const qq = q === "" || `${a.id} ${a.title} ${a.description} ${a.source}`.toLowerCase().includes(q);
          return w && t && qq;
        });
        if (rows.length === 0) {
          tableBody.innerHTML = `<tr><td colspan="6">No deliverables match the current filters.</td></tr>`;
          return;
        }
        tableBody.innerHTML = rows.map((a) => `
          <tr>
            <td>${a.id}</td>
            <td>W${a.week}</td>
            <td>${a.title}</td>
            <td>${a.description}</td>
            <td><a href="${a.file}" target="_blank" rel="noreferrer">Open deliverable</a></td>
            <td><code>${a.source}</code></td>
          </tr>
        `).join("");
        return;
      }

      // Fallback if annexes data is not loaded
      if (!window.PORTFOLIO_DATA) return;
      const rows = window.PORTFOLIO_DATA.deliverables.filter((d) => {
        const w = week === "all" || String(d.week) === week;
        const qq = q === "" || `${d.item} ${d.location}`.toLowerCase().includes(q);
        return w && qq;
      });
      tableBody.innerHTML = rows.map((d) => `<tr>
        <td>-</td><td>W${d.week}</td><td>${d.item}</td><td>${d.status || "done"}</td><td>-</td><td><code>${d.location}</code></td>
      </tr>`).join("");
    }

    weekFilter.addEventListener("change", draw);
    if (queryInput) queryInput.addEventListener("input", draw);
    draw();
  }

  function renderWeeks() {
    const host = document.getElementById("weeks-grid");
    if (!host || !window.PORTFOLIO_DATA) return;
    const streamFilter = document.getElementById("weeks-filter-stream");
    const minProgressFilter = document.getElementById("weeks-filter-progress");

    function draw() {
      const stream = streamFilter.value;
      const min = Number(minProgressFilter.value);
      const rows = window.PORTFOLIO_DATA.weeks.filter((w) => {
        const s = stream === "all" || w.stream === stream || w.stream === "all";
        return s && w.progress >= min;
      });

      host.innerHTML = rows.map((w) => `
        <article class="week-card">
          <h3>Week ${w.week}</h3>
          <p>${w.title}</p>
          <p class="small">Progress: ${w.progress}%</p>
          <div class="progress"><span style="width:${w.progress}%;"></span></div>
        </article>
      `).join("");
    }

    streamFilter.addEventListener("change", draw);
    minProgressFilter.addEventListener("change", draw);
    draw();
  }

  function renderAnnexes() {
    const body = document.getElementById("annexes-body");
    if (!body || !window.ANNEXES_DATA) return;
    const weekFilter = document.getElementById("annex-filter-week");
    const typeFilter = document.getElementById("annex-filter-type");
    const queryInput = document.getElementById("annex-filter-query");

    function typeLabel(value) {
      if (value === "cm") return "CM";
      if (value === "visit") return "Visit";
      if (value === "prototype") return "Prototype";
      if (value === "notes") return "Notes";
      return "Deliverable";
    }

    function draw() {
      const week = weekFilter.value;
      const type = typeFilter.value;
      const q = queryInput.value.trim().toLowerCase();
      const rows = window.ANNEXES_DATA.filter((a) => {
        const wk = week === "all" || String(a.week) === week;
        const tp = type === "all" || a.type === type;
        const qq = q === "" || `${a.id} ${a.title} ${a.description} ${a.source}`.toLowerCase().includes(q);
        return wk && tp && qq;
      });
      body.innerHTML = rows.map((a) => `
        <tr>
          <td>${a.id}</td>
          <td>W${a.week}</td>
          <td>${typeLabel(a.type)}</td>
          <td>${a.title}</td>
          <td>${a.description}</td>
          <td><a href="${a.file}" target="_blank" rel="noreferrer">Open annex</a></td>
          <td><code>${a.source}</code></td>
        </tr>
      `).join("");
    }

    weekFilter.addEventListener("change", draw);
    typeFilter.addEventListener("change", draw);
    queryInput.addEventListener("input", draw);
    draw();
  }

  renderDeliverables();
  renderWeeks();
  renderAnnexes();
})();
