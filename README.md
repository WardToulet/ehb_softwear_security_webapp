# Softwear Security Webapp

## Packages

- [Server](./packages/server/README.md)
- [Types](./packages/server/README.md)
- [Webapp](./packages/webapp/README.md)

## Opdracht

Bouw een web applicatie met volgende eigenschappen:

- [X] alle interacties tussen browser en web server gebeuren over HTTPS;
- [X] gebruikers kunnen zich registreren;
- [X] geregistreerde gebruikers kunnen zich aanmelden waardoor ze toegang krijgen
  tot bijkomende functionaliteit;
- [ ] voldoet aan de wettelijke eisen omtrent persoonlijke gegevensbescherming;
- [X] neemt maatregelen tegen veel voorkomende risico's;
- [ ] maakt gebruik van een REST API  met toegangscontrole.

### HTTPS

- [X] bij een HTTP request naar het domein van je landing page van je toepassing
  wordt een 301 response (Moved Permanently) teruggestuurd met een redirect
  naar een equivalente HTTPS URL;

- [ ] geen mixed content:
  - [ ] bovenstaande vereiste impliceert reeds dat alle content van het
      origin domein over HTTPS moet worden verstuurd;
  - [ ] indien je toepassing ook content bevat van andere hosts, dan moeten die
  hosts bij een poging om een HTTP request te versturen
    - [ ] ofwel de connectie weigeren,
    - [ ] ofwel ook een 301 response met een equivalente redirect terugsturen;

- [ ] je domein krijgt minstens een A score bij de SSL Labs server test;
  (Koppelingen naar een externe site.)

- [ ] je gebruikt DNS CAA;
- [ ] iedere respons bevat een Strict-Transport-Security header;
- [ ] het gebruikte domein staat in de HSTS preload list of wacht op toevoeging.

### Registratie

Nieuwe gebruikers moeten zich kunnen registreren voor je toepassing.
Deze functionaliteit mag integraal deel uitmaken van de toepassing,
of je kan gebruik maken van een Identity Provider (IdP).

Minimale vereisten bij registratie:

- [X] de gebruiker kan een gebruikersnaam en wachtwoord ingeven.
  Eventueel kan het email adres gelden als gebruikersnaam.
  Bijkomende authenticatievormen zijn optioneel;
- [X] alle 'printable' ASCII karakters worden aanvaard in het wachtwoord;
- [X] het wachtwoord wordt enkel aanvaard als het minstens 7 karakters bevat;
- [X] het is mogelijk om het wachtwoord te plakken
  (zodat gebruikers een password manager kunnen gebruiken);
- [X] vaak gebruikte wachtwoorden worden geweigerd.
  Een wachtwoord wordt beschouwd als vaak gebruikt indien de HIBP API
  hiervoor aangeeft dat het meer dan 300 keer voorkwam in eerdere inbraken;
- [ ] de gebruiker moet bij registratie een email adres opgeven.

Indien de toepassing zelf registratie implementeert,
dien je ervoor te zorgen dat wachtwoorden niet in plaintext worden opgeslagen.
In plaats hiervan wordt een salt en de hash van een concatenatie van de salt
en het wachtwoord opgeslagen. Gebruik van Argon2 of bcrypt wordt aanbevolen.

### Aanmelden

Indien registratie deel uitmaakt van de toepassing moet
ze zelf ook authenticatie doen. Zoniet laat je dit over aan de IdP.

Minimale vereisten bij aanmelden:

- [X] bij herhaalde mislukte pogingen verhoogt het tijdsinterval tussen pogingen
  exponentieel;
- [X] het is mogelijk om het wachtwoord te plakken
  (zodat gebruikers een password manager kunnen gebruiken);
- [X] er kan pas ingelogd worden als de gebruiker aangetoond heeft dat hij of zij
  het email adres opgegeven tijdens registratie onder controle heeft;
- [X] het scherm gepresenteerd door de applicatie geeft duidelijk aan
  of de gebruiker al dan niet aangemeld is;
- [ ] na aanmelden kan de gebruiker zijn of haar gegevens opvragen.

### Bescherming persoonlijke gegevens

De webtoepassing moet conform zijn met de wetgeving, in casu de AVG en ePrivacy richtlijn.
Privacyverklaring

Iedere pagina van de webtoepassing bevat een duidelijk zichtbare link naar de
privacyverklaring die de gebruiker informeert over persoonsgegevensverwerking.
Voor de inhoud, zie de privacyverklaring checklist in de FAQ-brochure voor KMO's
(Koppelingen naar een externe site.).

### Toestemming

Noodzakelijke cookies behoeven geen toestemming onder de ePrivacy richtlijn,
andere trackers wel. Indien je er dus gebruik van maakt, zorg er dan voor dat

- [ ] de gebruiker hiervan op de hoogte wordt gebracht met een duidelijke
  beschrijving van de verzamelde informatie en het doel hiervan;
- [X] alle trackers die niet essentieel zijn voor de dienst geleverd door de
  applicatie door de gebruiker kunnen geweigerd worden;
- [X] ook bij een weigering moet de gebruiker toegang krijgen tot
  de diensten geleverd door de toepassing;
- [ ] voor elke toestemming volgende informatie wordt bijgehouden:
  - [ ] wie heeft de toestemming gegeven?
  - [ ] wanneer werd de toestemming verleend?
  - [ ] welk formulier werd gebruikt om toestemming te geven? Wat werd ingevuld?
  - [ ] toestemmingen kunnen even gemakkelijk herroepen als gegeven worden.

De verzuimwaarde dient steeds de privacy-veilige keuze te zijn, m.a.w. er wordt
geen toestemming gegeven.

### Uitoefenen van rechten

Implementeer minstens volgende wettelijke rechten van betrokkenen indien je
verwerkingsgrond het vereist:

- [ ] inzage
- [ ] rectificatie
- [ ] wissen
- [ ] gegevensoverdraagbaarheid
- [ ] voorzie de mogelijkheid om eigen gegevens te downloaded in een
  machine-leesbaar formaat zoals bv. JSON, YAML, XML of CSV, bezwaar.
- [ ] Idealiter biedt de toepassing een duidelijke user interface aan voor het
  uitoefenen van elk recht. In een aantal gevallen kan er echter ook aan
  voldaan worden door manuele procedures.
  De privacyverklaring moet deze procedures dan duidelijk beschrijven,
  inclusief contactgegevens van de verantwoordelijke voor de uitvoering.
In elk geval dient het uitoefenen van de rechten van betrokkenen testbaar zijn.

### Verwerkingsregister

Leg een verwerkingsregister aan. Dit hoeft wettelijk niet publiek beschikbaar
te zijn. Voor deze opdracht wordt er echter wel geëist dat het
verwerkingsregister kan geraadpleegd worden in de Git repository.
In het README document in de root staat een verwijzing naar het
verwerkingsregister.

Het verwerkingsregister bevat minstens de informatie aangegeven in de slides
van de gastdocent, ir. Grimme Bogaerts.

Maatregelen tegen courante aanvallen

Dit onderdeel wordt gequoteerd op de kwaliteit van de maatregelen genomen op
volgende vlakken:

- [X] vermijden gebruik van third-party componenten met beveiligingsproblemen,
- [X] afschermen van geheimen,
- [ ] bescherming tegen allerlei aanvallen, ondermeer
  - [ ] XSS
  - [ ] CSRF
  - [X] code injectie

### Componenten met beveiligingsproblemen

De meeste webtoepassingen maken, terecht, gebruik van componenten geschreven
door derden. Dit is aangewezen, omdat

- gebruik van bestaande code je toelaat om een toepassing sneller te ontwikkelen,
- veelgebruikte, goedgeteste componenten waarschijnlijk robuuster zijn dan wat
  je zelf kan ontwikkelen binnen het bestek van de opdracht.

Anderzijds kunnen afhankelijkheden (dependencies) op andermans code ook
beveiligingsproblemen introduceren. Het komt erop aan die zo snel mogelijk te
ontdekken en op te lossen. De evaluatie houdt rekening met

- [ ] de lijst van gekende kwetsbaarheden in je toepassing.
  Minder is beter. Maar ook belangrijk is de ernst (severity)
  van de kwetsbaarheden.
- [ ] De CVSS score van de NVD is hierbij een goed richtcijfer.
  In principe mogen er geen kwetsbaarheden met ernst High of Critical voorkomen.
- [ ] de maatregelen die je getroffen hebt om ze snel mogelijk op de hoogte gebracht
  te worden van eventueel nieuw ontdekte kwetsbaarheden.

### Geheimen

Een toepassing maakt veelal gebruik van geheimen, bv.

- cryptografische sleutels,
- credentials van gebruikers,
- credentials voor services zoals gegevensbanken en REST APIs.

Wanneer zulke geheimen in handen vallen van een aanvaller,
kunnen de vertrouwelijkheid en integriteit van de communicatie of toevertrouwde
gegevens niet meer gewaarborgd worden.

Voor deze opdracht houden we rekening met aanvallers die toegang kunnen verkrijgen

- tot de toepassing via het internet;
- tot de git repo van de toepassing.

We laten een aanvaller die toegang heeft tot de runtime in de back-end
buiten beschouwing. Geheimen die bv bewaard worden in omgevingsvariabelen
in de back-end blijven dus buiten bereik.
Anderzijds houdt ons threat model wel degelijk rekening met een aanvaller die
de toepassing downloadt en, eventueel gebruik makend van reverse engineering
technieken, geheimen probeert te ontfutselen.

Wat dus moet vermeden worden:

- geheimen in plaintext onder versiebeheer.
  De aanvaller heeft immers toegang tot de git repo;
- generatie van front-end code die geheimen bevat in de back-end.
  De aanvaller kan immers die code reverse engineeren of er een statische
  analyse op uitvoeren;
- ophalen van geheimen door de front-end of doorgeven van geheimen aan
  de front-end. De aanvaller kan immers die code reverse engineeren of er
  een dynamische analyse op uitvoeren.
  Geheimen specifiek bedoeld om de gebruiker toegang te geven
  tot de functionaliteit van de toepassing vormen een uitzondering.
  Voorbeelden hiervan zijn authenticatie cookies en security tokens.

Maatregelen tegen typische web vulnerabilities

In een voorgaande paragraaf wordt vereist dat de componenten gebruikt door
de toepassing vrij zijn van ernstige kwetsbaarheden.
Maar ook de code die je zelf hebt geschreven moet veilig zijn.
Hierbij wordt geverifieerd of

- er geen duidelijke fouten werden gemaakt,
  bv. concatenatie van user input aan een SQL query string,
- indien je scripts of stylesheets van een third party betrekt,
  deze tegen manipulatie beschermd zijn,
- redelijke maatregelen werden getroffen om tenminste
  volgende aanvallen tegen te gaan
  - [ ] CSRF,
  - [ ] XSS,
  - [ ] XSSI,
  - [ ] Clickjacking,
  - [ ] SQL injection,
  - [ ] Command injection,
  - [ ] HTML injection,
  - [ ] CSS injection.

### REST APIs

De toepassing maakt gebruik van één of meerdere REST APIs.
Deze zijn bereikbaar op het publieke netwerk.
Deze vereiste geldt zowel voor SPAs
als voor toepassingen die op een server draaien.
In dat laatste geval zou voor een reële toepassing kunnen overwogen worden
om de API niet op het publieke netwerk te publiceren,
maar dat is geen optie voor deze opdracht:

de APIs moeten ook los van de toepassing bereikbaar zijn voor testen.

#### Methods

- [ ] Elke API biedt minstens de CRUD, oplijst en meta-informatie operaties aan
  zoals beschreven in de slides.
- [ ] Elke `OPTIONS` succesvolle respons bevat minstens de headers
  `Access-Control-Allow-Headers`, `Access-Control-Allow-Methods`,
  `Access-Control-Allow-Origin` en Vary met hun correcte waarden.
  De waarde van `Access-Control-Allow-Origin` is de origin van de request.
  Een ontbrekende, ongeldige of null origin request header
  resulteert in een error respons.
- [ ] Voor elke soort van resource wordt in de repo's README gedocumenteerd welke
  operaties zijn toegestaan vanuit welke origin.
- [ ] Vaak zijn REST API zelf-documenterend.
  Dit is niet expliciet vereist voor deze opdracht,
  buiten het oplijsten van resources en beschikbaar stellen van
  een `OPTIONS` methode op elke resource met minstens volgende response headers:
  - [ ] `Access-Control-Allow-Headers`
  - [ ] `Access-Control-Allow-Methods`
  - [ ] `Access-Control-Allow-Origin`

#### Media types

- [ ] De REST APIs implementeren correcte content negotiation:
  de content-type van de response komt overeen met het media type met
  het hoogste gewicht in de Accept header dat wordt aangeboden voor de resource.
  Indien geen van de media types in de Accept header beschikbaar is,
  dan stuurt de resource server status code `406` terug.
- [ ] Het `application/json` media type wordt aangeboden voor alle resources.

#### Status codes

De APIs gebruiken response status codes conform met de tabel in de slides.
Eventuele afwijkingen worden gedocumenteerd in README.

#### Toegangscontrole

- [ ] Elke API past rate limiting toe via een client-specifieke API key.
  De API key voor test clients wordt gepubliceerd in README.
- [ ] De keuze van een toegangscontrolestrategie is vrij
  je bent dus vrij te kiezen of je cookies of tokens gebruikt.
  In beide gevallen wordt verwacht dat je een goede bescherming voorziet.
- [ ] README beschrijft een toegangscontrole policy:
  wie mag welke operaties op welke resources uitvoeren.
  Minimaal behelst deze policy:
  - [ ] voor alle operaties behalve het oplijsten van collecties moet de gebruiker
    aangemeld zijn;
  - [ ] er is een onderscheid tussen gewone gebruikers,
    die we verder 'gebruikers' zullen noemen, en toepassingsbeheerders,
    die we verder 'beheerders' zullen noemen;
  - [ ] een resource aangemaakt door een gebruiker kan niet
    door een andere gebruiker verwijderd worden, terwijl een beheerder dit wel kan;
  - [ ] een beheerder kan geen resources aanmaken.
  - [ ] De toegangscontrole policy wordt effectief afgedwongen op de publieke
    toegangspunten voor de APIs.

### Indienen

Dien de URL van een Git repository met de code van je oplossing.
Naast de code bevat de repo ook een README in de root directory met
- [ ] een korte beschrijving van de toepassing;
- [ ] een publieke URL waar de toepassing beschikbaar is.
