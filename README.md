# Remote work nodejs & react

## Ausführung
Entwickelt wurde dieses Projekt mit Nodejs, Typescript, sqlite und React.
Zum starten den API Key noch in movieApiService unter api_key eintragen. Den wollte ich jetzt nicht einchecken. Den API Key kann euch Carsten geben.
Dann "npm run start" aufrufen. Dies startet die React app und den express nodejs server.

## Zeitbuchung
- Konzeption: 1h
- Recherche: 1h
- Implementation Backend: 3h30m
- Implementation React Fronten: 2h
- Tests: 30m
- Readme: 30m

Zeit gesamt: 8h30m
Mittagspause: ca. 1h

## Anmerkungen
- Den Refresh von der API habe ich auf Server Ebene eingebunden, da die sqlite DB eher als Server cache fungiert. Aus diesem Grund wird die DB auch truncated anstatt die einzelnen Datensätze zu prüfen und dann upzudaten, removen oder inserten.
- Die images der Filme sind als path in der DB eingspeichert. Da wir hier keinen API key benötigen können wir das cachen der Bilder dem Browser überlassen.
- Die images der Filme baue ich im Controller noch etwas weiter zusammen, das könnte auch auf ein Businessmodel ausgelagert werden.
- Die Movie Database will explizit mit dem Text und ihrem Logo auf der Seite referenziert werden bei API Nutzung. Also nicht wundern über das Logo.
- Die Favoritenfunktion habe ich jetzt im localStorage implementiert damit das nicht sofort wieder verschwindet wenn neugeladen wird oder der User den Browser schließt. 
- Dieses mal war kein explizites paging gewünscht, daher erstmal nicht implementiert.

Insgesamt eine spannende Challenge für den ersten wirklichen Einstieg, abgesehen von den Tutorials die letzten paar Tage, in die verschiedenen neuen Techniken.
Cool waren definitiv die React Komponenten und das Knex modul für das linq to sql feeling.
Da aktuell noch die Erfahrung fehlt ist es gewiss nicht dem Best Practice entsprechend. Da setze ich mich aber auch weiterhin dran um mehr Erfahrungen zu sammeln.
Vielleicht dann sogar im Academy Team. :D
