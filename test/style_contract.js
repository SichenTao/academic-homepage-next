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
requireText(entry, "<summary>Abstract</summary>", "clear Abstract action");
requireText(entry, 'data-copy-label="DOI"', "DOI copy action");
requireText(entry, "Copy DOI:", "DOI value tooltip");
requireText(entry, "<summary>Cite This</summary>", "unified citation menu");
requireText(entry, "Copy IEEE citation", "IEEE citation menu action");
requireText(entry, "Copy BibTeX", "BibTeX menu action");
requireText(entry, "Data &amp; Code", "unified artifacts menu");
requireText(css, ".publication-author-list em", "default author emphasis");
requireText(css, "border-bottom: 1px solid currentColor", "default author underline");
requireText(css, ".publication-action-tooltip", "DOI tooltip style");
requireText(css, ".publication-action-menu-panel", "publication action menu style");
requireText(js, "navigator.clipboard", "clipboard interaction");
requireText(js, 'event.key !== "Escape"', "keyboard menu dismissal");
requireText(metrics, "metric_basis contains 'acceptance'", "accepted-paper metrics");

if (metrics.includes("== publication_year")) {
  throw new Error("metrics must not be hidden solely because publication and metric years differ");
}
if (metrics.includes("Verified metrics:")) {
  throw new Error("metrics must not include the redundant Verified metrics prefix");
}
if (!fs.existsSync(path.join(root, "_data/publication_citations.yml"))) {
  throw new Error("generated IEEE/BibTeX copy data is missing");
}

console.log("Publication style contract: PASS");
