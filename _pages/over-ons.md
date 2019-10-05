---
title: "Over ons"
lead: "Sinds 1990 maakt i&i zich sterk voor een structureel aanbod van kwalitatief hoogwaardig onderwijs ten behoeve van informatica en digitale geletterdheid op alle basis- en middelbare scholen in Nederland."
header: "/assets/img/content/explain_page_header.jpg"
layout: page
order: 5
---

## Visie
i&i is ervan overtuigd dat informatica geen uitgesproken bètavak is. Het heeft zoveel facetten, van alfa tot bèta, dat iedere leerling binnen het vakgebied aan zijn of haar trekken kan komen. Informatica kan een heterogene groep leerlingen bedienen door de verschillende facetten die in de belangstellingssfeer van individuele leerlingen liggen, aan te bieden. Elke aspect van informatica kan adequaat, dat wil zeggen op kwalitatief aangepast havo en vwo-niveau, aangeboden worden.

Oorspronkelijk stonden de twee i’tjes in de verenigingsnaam i&i voor Informatica en Informatietechnologie in het voortgezet onderwijs. In de eerste jaren van haar bestaan stond de vereniging bekend als dé club vrijwilligers die de belangen van IT-coördinatoren behartigde. Inmiddels heeft de vereniging haar focus verlegd van de meer technische kant van de IT, naar de educatieve en didactische rol, met bijzondere aandacht voor de vernieuwingen rondom informatica en digitale geletterdheid.

## Doelgroep
De Vakvereniging i&i richt zich op docenten en medewerkers van zowel primair als voortgezet onderwijs. Zij is er voor docenten en iedereen die zich vanuit welke functie dan ook betrokken voelt bij informatica en digitale geletterdheid in het onderwijs.

i&i maakt zich sterk voor het bovenbouwvak informatica. Met overheid, beleidsmakers en opleidingsinstituten is geregeld overleg om onderhoud te plegen aan dit dynamische vak. i&i zet zich in voor een sterke positie van het vak in de Tweede Fase, vanuit de visie dat het vak voor de ontwikkeling van de Nederlandse maatschappij en economie van essentieel belang is.

Omdat de Vakvereniging i&i van mening is dat het vak informatica aan iedere school aangeboden moet kunnen worden, wordt gewerkt aan een plan dat ‘expert op afstand’ mogelijk moet maken. Daardoor kan een ervaren docent aan diverse scholen of locaties vele leerlingen tegelijk bedienen. We staan nog aan het begin van deze ontwikkeling, maar zullen er bij de overheid op aandringen dit als proef te faciliteren. De leerling is immers onze klant en als hij of zij voor informatica kiest, moeten we daaraan tegemoet komen. Wilt u hier meer over weten, neemt u dan contact op met het bestuur van de vereniging.

## Het Team
Het team van de Vakvereniging i&i bestaat uit (oud)-docenten die werkzaam zijn bij onderwijs-, of onderwijsgerelateerde, instellingen. Grote gemene deler van de bestuursleden is de overtuiging dat iedere leerling recht heeft op informaticaonderwijs.

{% assign members = site.team | sort:"order" %}
<div class="row members">
{% for member in members %}
  <div class="col-md-3 member">
    {% assign imageurl = '/assets/img/content/' | append member.name |append '.png' %}
    <img src="{{ imageurl | relative_url }}">
    <div class="name">{{ member.name }}</div>
    <div class="role">{{ member.role }}</div>
  </div>
{% endfor %}
</div>

## Privacy Statement 
Vakvereniging i&i heeft een privacy statement beschikbaar op de pagina [ieni.org/privacy](/privacy).

## Contact
<div class="row">
  <div class="col-md-6">
    <p>
      {{ site.legal }} is geregistreerd onder {{ site.kvk }}.
    </p>
    <p>
      Wilt u in contact komen met onze vakvereniging, dan staat het formulier hiernaast tot uw beschikking.
    </p>
  </div>
  <div class="col-md-6">
    {% include form-contact.html %}
  </div>
</div>
