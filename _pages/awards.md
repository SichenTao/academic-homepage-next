---
layout: page
title: awards
permalink: /awards/
description: Selected competition results, fellowships, scholarships, and research recognition.
nav: true
nav_order: 6
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}">

<div class="direct-list-page awards-list">
  <ul>
    {% for award in site.data.awards %}
      <li>
        <span class="year">{{ award.date }}</span>:
        {% if award.url %}<a class="title" href="{{ award.url }}">{{ award.title }}</a>{% else %}<span class="title">{{ award.title }}</span>{% endif %}.
        {% if award.description %}<span class="award-detail">{{ award.description }}</span>{% endif %}
      </li>
    {% endfor %}
  </ul>
</div>
