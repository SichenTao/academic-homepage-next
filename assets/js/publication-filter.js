(() => {
  const filter = document.querySelector("#publication-filter");
  const filterStatus = document.querySelector("#publication-filter-status");
  const entries = [...document.querySelectorAll("[data-publication-entry]")];
  const groups = [...document.querySelectorAll("[data-publication-year-group]")];

  if (filter && filterStatus && entries.length > 0) {
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
      filterStatus.textContent = query ? `Showing ${visible} of ${entries.length} publications.` : `Showing all ${entries.length} publications.`;
    };
    filter.addEventListener("input", update);
  }

  const writeClipboard = async (value) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
    const fallback = document.createElement("textarea");
    fallback.value = value;
    fallback.setAttribute("readonly", "");
    fallback.style.position = "fixed";
    fallback.style.opacity = "0";
    document.body.append(fallback);
    fallback.select();
    const copied = document.execCommand("copy");
    fallback.remove();
    if (!copied) throw new Error("Clipboard copy failed");
  };

  document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy-value], [data-copy-source]");
    if (!button) return;

    const sourceId = button.dataset.copySource;
    const source = sourceId ? document.getElementById(sourceId) : null;
    const value = source ? source.value : button.dataset.copyValue;
    if (!value) return;

    const label = button.dataset.copyLabel || button.textContent.trim();
    const liveStatus = document.querySelector("#publication-copy-status");
    try {
      await writeClipboard(value);
      button.textContent = "COPIED";
      if (liveStatus) liveStatus.textContent = `${label} copied to clipboard.`;
      window.setTimeout(() => {
        button.textContent = label;
      }, 1400);
    } catch {
      button.textContent = "COPY FAILED";
      if (liveStatus) liveStatus.textContent = `${label} could not be copied.`;
      window.setTimeout(() => {
        button.textContent = label;
      }, 1800);
    }
  });
})();
