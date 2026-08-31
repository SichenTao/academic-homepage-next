---
layout: page
title: publications
permalink: /publications/
description: Complete public publication record in reverse chronological order, with Chinese Academy of Sciences Q1 journal papers highlighted first.
nav: true
nav_order: 3
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}?v=20260831f">

{% assign selected_publications = site.data.publications | where: 'selected', true %}
{% assign public_publications = site.data.publications | where: 'public', true %}

<p class="author-note"><strong>*</strong> Corresponding author; <strong>†</strong> co-first author. Citation counts and journal metrics display their verification dates or metric years.</p>

<section aria-labelledby="selected-publications-heading">
  <h2 id="selected-publications-heading">selected publications</h2>
  <p class="selected-publications-note">Journal papers classified in CAS Q1. Every thumbnail is an original figure from the paper, linked to its source.</p>
  <div class="publication-record-list">
    {% for publication in selected_publications %}
      {% include publication_entry.liquid publication=publication anchor_prefix="selected-" eager=forloop.first %}
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
  <div id="publication-list" class="publication-year-groups">
    {% for year_group in publications_by_year %}
      <section class="publication-year-group" data-publication-year-group>
        <h3>{{ year_group.name }}</h3>
        <div class="publication-record-list">
          {% for publication in year_group.items %}
            {% include publication_entry.liquid publication=publication searchable=true %}
          {% endfor %}
        </div>
      </section>
    {% endfor %}
  </div>
</section>

<p id="publication-copy-status" class="publication-copy-status" role="status" aria-live="polite"></p>
<script src="{{ '/assets/js/publication-filter.js' | relative_url }}?v=20260831g" defer></script>
