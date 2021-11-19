---
layout: default
title: Antonio's blog
---
# Latest Posts

<ul>
  {% assign blogposts = site.posts | sort: 'date' %}
  {% for post in blogposts limit:4 %}
    <li>
      <h2 class="header-common-style"><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <div style="text-align: right;">{{ post.date | date: "%d %b %y" }}</div>
      {{ post.excerpt }}
    </li>
    <br/>
  {% endfor %}
</ul>

<div class=button><a href="{{ url }}/older_posts.html">Older posts and more</a></div>