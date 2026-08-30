---
layout: page
title: contact
permalink: /contact/
description: Institutional contact details and verified academic profiles.
nav: true
nav_order: 6
---

<link rel="stylesheet" href="{{ '/assets/css/sichen.css' | relative_url }}">

<section class="contact-primary">
  <h2>Contact information</h2>
  <dl>
    <dt>Position</dt>
    <dd>Assistant Professor</dd>
    <dt>Affiliation</dt>
    <dd>Research Division on Supercomputing Systems, Cyberscience Center, Tohoku University</dd>
    <dt>Laboratory</dt>
    <dd>High Performance Computing Laboratory</dd>
    <dt>Location</dt>
    <dd>Sendai, Japan</dd>
    <dt>Email</dt>
    <dd><a href="mailto:sichen.tao@tohoku.ac.jp">sichen.tao@tohoku.ac.jp</a></dd>
  </dl>
</section>

<section class="profile-links" aria-labelledby="verified-profiles-heading">
  <h2 id="verified-profiles-heading">Verified profiles</h2>
  <ul>
    {% for profile in site.data.profiles %}
      <li><span class="profile-tag">{{ profile.tag }}</span> <a href="{{ profile.url }}">{{ profile.title }}</a> — {{ profile.description }}</li>
    {% endfor %}
  </ul>
</section>
