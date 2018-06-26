---
title: "Praktijkdag 3"
#lead: "Op 7 & 8 november is de derde pratijkdag. Dit keer in het teken van het nieuwe curriculum!" <- voeg een beschrijving van deze pagina toe.
layout: page
order: 3.5
header: "/assets/img/content/research_page_header.jpg"
---
Het programma voor de komende Praktijkdag zal tzt hier gepubliseerd worden. Kern van het programma is het nieuwe curriculum en de invulling van de keuzethema's. 

{% for project in site.projects %}
## [{{ project.title }} &raquo;]({{ project.url }})
{{ project.lead }}
{% endfor %}
