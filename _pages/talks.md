---
layout: page
title: talks
permalink: /talks/
description: Invited talks, lectures, and research presentations.
nav: true
nav_order: 5
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}?v=20260831b">

<div class="direct-list-page talks-list">
  <ul>
    {% for talk in site.data.talks %}
      <li>
        <span class="year">{{ talk.date }}</span>:
        {% if talk.url %}<a class="title" href="{{ talk.url }}">“{{ talk.title }}”</a>{% else %}<span class="title">“{{ talk.title }}”</span>{% endif %},
        {{ talk.type }}, {{ talk.event }}, {{ talk.host }}{% if talk.location %}, {{ talk.location }}{% endif %}.
        {% if talk.description %}<span class="award-detail">{{ talk.description }}</span>{% endif %}
      </li>
    {% endfor %}
  </ul>
</div>
