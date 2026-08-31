const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const requireText = (contents, expected, label) => {
  if (!contents.includes(expected)) throw new Error(`${label}: missing ${expected}`);
};

const publications = read("_pages/publications.md");
const homepage = read("_includes/homepage_selected_papers.liquid");
const entry = read("_includes/publication_entry.liquid");
const metrics = read("_includes/publication_metrics.liquid");
const css = read("assets/css/sichen.css");
const js = read("assets/js/publication-filter.js");

requireText(publications, "publication_entry.liquid", "publications page");
requireText(homepage, "publication_entry.liquid", "homepage selected publications");
requireText(entry, "publication.abstract", "shared publication entry");
requireText(entry, "publication_stage", "publication stage rendering");
requireText(entry, "publication.article_number", "article number rendering");
requireText(entry, "Show detailed abstract", "clear Abstract action tooltip");
requireText(entry, 'data-copy-label="doi"', "lowercase doi copy action");
requireText(entry, "Copy doi:", "doi value tooltip");
requireText(entry, "Choose a preferred citation format", "hover-open citation menu prompt");
requireText(entry, 'data-copy-success-label="doi copied"', "doi copy success label");
requireText(entry, "Copy - BibTeX", "BibTeX-first menu action");
requireText(entry, "Copy - IEEE citation text", "IEEE citation menu action");
requireText(entry, "Copy - Nature citation text", "Nature citation menu action");
requireText(entry, "Data &amp; Code", "unified artifacts menu");

const citationOrder = ["Copy - BibTeX", "Copy - IEEE citation text", "Copy - Nature citation text"].map((label) => entry.indexOf(label));
if (citationOrder.some((index) => index < 0) || !(citationOrder[0] < citationOrder[1] && citationOrder[1] < citationOrder[2])) {
  throw new Error("Cite This actions must stay ordered as BibTeX, IEEE, then Nature");
}
requireText(entry, 'data-copy-source="cite-ieee-', "IEEE copy source binding");
requireText(entry, "copy_payload.ieee | escape", "IEEE preview uses the copied payload");
requireText(entry, 'data-copy-source="cite-nature-', "Nature copy source binding");
requireText(entry, "copy_payload.nature | escape", "Nature preview uses the copied payload");
requireText(css, ".publication-author-list em", "default author emphasis");
requireText(css, "border-bottom: 1px solid currentColor", "default author underline");
requireText(css, ".publication-action-tooltip", "DOI tooltip style");
requireText(css, ".publication-action-menu-panel", "publication action menu style");
requireText(entry, "publication-abstract-toggle", "abstract disclosure button");
requireText(css, ".publication-abstract-panel", "abstract panel stays below the action row");
requireText(css, ".publication-citation-preview", "citation preview style");
requireText(js, "navigator.clipboard", "clipboard interaction");
requireText(js, 'button.setAttribute("aria-expanded"', "accessible abstract disclosure state");
requireText(js, "positionCitationPreview", "viewport-aware citation preview placement");
requireText(js, "menuPreviews", "all previews in one menu share viewport-aware placement");
requireText(js, 'event.key !== "Escape"', "keyboard menu dismissal");
requireText(metrics, "metric_basis contains 'acceptance'", "accepted-paper metrics");

if (metrics.includes("== publication_year")) {
  throw new Error("metrics must not be hidden solely because publication and metric years differ");
}
if (metrics.includes("Verified metrics:")) {
  throw new Error("metrics must not include the redundant Verified metrics prefix");
}
if (!fs.existsSync(path.join(root, "_data/publication_citations.yml"))) {
  throw new Error("generated IEEE/Nature/BibTeX copy data is missing");
}

const citationPayloads = read("_data/publication_citations.yml");
requireText(citationPayloads, "nature:", "generated Nature citation data");

console.log("Publication style contract: PASS");
