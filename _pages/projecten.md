---
title: "Projecten"
#lead: "" <- voeg een beschrijving van deze pagina toe.
layout: page
order: 3.5
header: "/assets/img/content/research_page_header.jpg"
---

{% for project in site.projects %}
## [{{ project.title }} &raquo;]({{ project.url }})
{{ project.lead }}
{% endfor %}
