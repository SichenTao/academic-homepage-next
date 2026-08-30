---
layout: page
title: services
permalink: /services/
description: Editorial work, conference organization, and peer review.
nav: true
nav_order: 4
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}">

<div class="direct-list-page">
  <section>
    <h2>Editorial roles</h2>
    <ul>
      {% for item in site.data.services.editorial_roles %}
        <li><span class="year">{{ item.period }}</span>: {{ item.title }}, <span class="title">{{ item.organization }}</span>.</li>
      {% endfor %}
    </ul>
  </section>

  <section>
    <h2>Conference organization</h2>
    <ul>
      {% for item in site.data.services.conference_organization %}
        <li>
          <span class="year">{{ item.period }}</span>: {{ item.title }},
          {% if item.url %}<a class="title" href="{{ item.url }}">{{ item.organization }}</a>{% else %}<span class="title">{{ item.organization }}</span>{% endif %}.
        </li>
      {% endfor %}
    </ul>
  </section>

  <section>
    <h2>Reviewing</h2>
    <ul>
      {% for item in site.data.services.reviewing %}
        <li><span class="year">{{ item.tag }}</span>: <a class="title" href="{{ item.url }}">{{ item.label }}</a>.</li>
      {% endfor %}
    </ul>
  </section>
</div>
