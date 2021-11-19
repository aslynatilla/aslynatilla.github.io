---
layout: default
title: Antonio's blog - older posts
---

<ul>
  {% assign blogposts = site.posts | sort: 'date' %}
  {% for post in blogposts offset:4 %}
    <li>
      <h2 class="header-common-style"><a href="{{ post.url }}">{{ post.title }}</a></h2>
      {{ post.excerpt }}
    </li>
  {% endfor %}
  {% if blogposts.size < 4 %}
    <h2 class="header-common-style">There are no older posts.</h2>
  {% endif %}
</ul>