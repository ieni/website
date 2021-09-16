---
title: "Nieuws"
lead: "Het laatste nieuws van de vakvereniging."
layout: page
header: "/assets/img/content/news_page_header.jpg"
order: 3
---

{::options parse_block_html="true" /}
{% for post in site.posts %}
{% include date_locale.html %}
## {{ post.title }}
**Op {{ post_date }} door {{ post.author }}**

{{ post.content | strip_html | truncate: 400 }}

[Lees Meer &raquo;]({{ post.url | relative_url }})
{% endfor %}
