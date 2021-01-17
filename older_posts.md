---
layout: default
title: Antonio's blog - older posts
---

<ul>
  {% assign blogposts = site.posts | sort: 'date' %}
  {% for post in blogposts offset:4 %}
    <li>
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
</ul>