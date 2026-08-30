---
layout: page
title: publications
permalink: /publications/
description: Complete public publication record in reverse chronological order, with Chinese Academy of Sciences Q1 journal papers highlighted first.
nav: true
nav_order: 3
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}?v=20260830b">

{% assign selected_publications = site.data.publications | where: 'selected', true %}
{% assign public_publications = site.data.publications | where: 'public', true %}

<p class="author-note"><strong>*</strong> Corresponding author; <strong>†</strong> co-first author.</p>

<section aria-labelledby="selected-publications-heading">
  <h2 id="selected-publications-heading">selected publications</h2>
  <p class="selected-publications-note">Journal papers classified in CAS Q1. Every thumbnail is an original figure from the paper, linked to its publisher source.</p>
  <div class="selected-publications-list">
    {% for publication in selected_publications %}
      <article class="selected-publication">
        <figure class="selected-publication-figure">
          <img
            src="{{ publication.preview | relative_url }}"
            alt="{{ publication.preview_alt | default: publication.title | escape }}"
            width="240"
            height="160"
            loading="{% if forloop.first %}eager{% else %}lazy{% endif %}"
          >
          {% if publication.preview_source_url %}
            <figcaption><a href="{{ publication.preview_source_url }}">Original paper figure</a></figcaption>
          {% endif %}
        </figure>
        <div>
          <h3>{{ publication.title }}</h3>
          <p class="publication-authors">{{ publication.citation_authors_html }}</p>
          <p class="publication-venue"><em>{{ publication.venue }}</em>, {{ publication.year }}.</p>
          <p class="publication-actions">
            {% if publication.url %}<a href="{{ publication.url }}">Paper</a>{% endif %}
            {% if publication.doi %}<a href="https://doi.org/{{ publication.doi }}">DOI</a>{% endif %}
            <a href="#{{ publication.id }}">Citation</a>
          </p>
        </div>
      </article>
    {% endfor %}
  </div>
</section>

<section aria-labelledby="full-publication-list-heading">
  <h2 id="full-publication-list-heading">full publication list</h2>
  <div class="publication-search">
    <label for="publication-filter">Search by title, author, venue, year, or keyword</label>
    <input id="publication-filter" type="search" autocomplete="off" placeholder="Type to filter {{ public_publications.size }} publications">
    <p id="publication-filter-status" role="status" aria-live="polite">Showing all {{ public_publications.size }} publications.</p>
  </div>

{% assign publications_by_year = public_publications | group_by: 'year' %}
{% assign citation_index = 0 %}
  <div id="publication-list" class="citation-groups">
    {% for year_group in publications_by_year %}
      <section class="citation-year-group" data-publication-year-group>
        <h3>{{ year_group.name }}</h3>
        <ol class="citation-list" start="{{ public_publications.size | minus: citation_index }}" reversed>
          {% for publication in year_group.items %}
            {% assign citation_index = citation_index | plus: 1 %}
            <li
              id="{{ publication.id }}"
              class="publication-entry"
              data-publication-entry
              data-search="{{ publication.title | append: ' ' | append: publication.author_line | append: ' ' | append: publication.venue | append: ' ' | append: publication.year | append: ' ' | append: publication.tags | downcase | escape }}"
            >
              <span class="citation-authors">{{ publication.citation_authors_html }}</span>,
              “<span class="citation-title">{{ publication.title }}</span>,”
              <em>{{ publication.venue }}</em>{% if publication.volume %}, vol. {{ publication.volume }}{% endif %}{% if publication.issue %}, no. {{ publication.issue }}{% endif %}{% if publication.pages %}, {{ publication.pages }}{% endif %}, {{ publication.year }}.
              <span class="citation-actions">
                {% if publication.url %}<a href="{{ publication.url }}">Paper</a>{% endif %}
                {% if publication.doi %}<a href="https://doi.org/{{ publication.doi }}">DOI</a>{% endif %}
                <button type="button" class="copy-citation" data-copy-citation>Copy</button>
              </span>
              <details class="publication-metrics">
                <summary>Metrics</summary>
                <span>Citations: {{ publication.citations | default: 0 }}</span>
                {% if publication.verification.if_value %}<span>IF {{ publication.verification.if_value }} ({{ publication.verification.if_year }})</span>{% endif %}
                {% if publication.verification.jcr_quartile %}<span>JCR {{ publication.verification.jcr_quartile }} ({{ publication.verification.jcr_year }})</span>{% endif %}
                {% if publication.verification.cas_quartile %}<span>CAS {{ publication.verification.cas_quartile }} ({{ publication.verification.cas_year }})</span>{% endif %}
              </details>
            </li>
          {% endfor %}
        </ol>
      </section>
    {% endfor %}
  </div>
</section>

<script src="{{ '/assets/js/publication-filter.js' | relative_url }}" defer></script>
