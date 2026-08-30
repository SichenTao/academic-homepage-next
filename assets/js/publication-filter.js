(() => {
  const filter = document.querySelector("#publication-filter");
  const status = document.querySelector("#publication-filter-status");
  const entries = [...document.querySelectorAll("[data-publication-entry]")];
  const groups = [...document.querySelectorAll("[data-publication-year-group]")];
  if (!filter || !status || entries.length === 0) return;

  const update = () => {
    const query = filter.value.trim().toLocaleLowerCase();
    let visible = 0;
    entries.forEach((entry) => {
      const match = !query || (entry.dataset.search || "").includes(query);
      entry.hidden = !match;
      if (match) visible += 1;
    });
    groups.forEach((group) => {
      group.hidden = !group.querySelector("[data-publication-entry]:not([hidden])");
    });
    status.textContent = query ? `Showing ${visible} of ${entries.length} publications.` : `Showing all ${entries.length} publications.`;
  };

  filter.addEventListener("input", update);

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-citation]");
    if (!button) return;
    const entry = button.closest("[data-publication-entry]");
    if (!entry) return;
    const copy = entry.cloneNode(true);
    copy.querySelectorAll(".citation-actions, .publication-metrics, .publication-metric-line").forEach((node) => node.remove());
    const citation = copy.textContent.replace(/\s+/g, " ").trim();
    try {
      await navigator.clipboard.writeText(citation);
      const original = button.textContent;
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    } catch {
      button.textContent = "Select text";
    }
  });
})();
