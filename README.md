# PB-Abschlussprojekt: Kühlschrank-Management-App

## Einleitung
Dies ist das Abschlussprojekt für das Programming-Basics Modul.
Es enthält neben dieser README, die die Aufgabe beschreibt, noch einige zusätzliche Ordner.

### Vorgegebene Dateistruktur
- `src/` -> Dieser Ordner enthält den gesamten Code des Projekts. Dazu gehören
    - `index.html` -> Die HTML-Datei, die das gesamte Markup der GUI enhält.
    - `css/` -> In diesem Ordner befindet sich alles nötige CSS für die GUI.
    - `img/` -> In diesem Ordner befinden sich alle für die GUI nötigen Bild-Dateien.
    - `js/` -> Der Ordner für alle Javascript-Dateien:
        - `main.js` -> Die haupt Javascript Datei, die bereits einigen hilfreichen Code enthält und für die Regelung aller Nutzer-Interaktionen auf der GUI enthalten soll.
        - `fridge.js` -> Eine extra-Datei für die benötigte Kühlschrank-Klasse, die für die Datenstruktur benötigt wird.
        - `product.js` -> Eine extra-Datei für die benötigte Produkt-Klasse, die für die Datenstruktur benötigt wird.
- `docs/` -> Dieser Ordner dient als Ablageort aller nötigen Dokumentationsdateien.
- `.gitignore` -> Diese Datei wird von `git` ausgewertet. `git` ignoriert alle darin enthaltenen Dateien und Ordner.

Halte diese Dateistruktur möglichst sauber. Solltest du weitere Dateien brauchen, lege sie möglichst in einem geeigneten Ordner ab.
Solltest du Dateien oder Ordner haben, die du zwar in deiner lokalen Projekt-Kopie benötigst, aber nicht ins Repository laden möchtest, füge sie zur `.gitignore`-Datei hinzu, damit sie von `git` ignoriert werden.

## Projektbeschreibung
Das folgende Bild zeigt einen Screenshot der GUI für die Kühlschrank-Management-App.
![Fridge Management App Screenshot](readme_assets/fridge-management_screenshot.png)

### Szenario
Innerhalb eines größeren Projekts entsteht eine Web-App zur Verwaltung eine Kühlschranks. <br>
Das GUI-Design Team hat bereits anhand der Projektvorgabe eine GUI designt, wie in der oberen Abbildung zu sehen.

Du als versierter Javascript Frontend-Entwickler sollst nun die GUI mit Leben befüllen wobei du die nötige Datenstruktur erstellst und die GUI-Elemente mit Funktionen zum Manipulieren dieser Datenstruktur verbindest. <br>
Um das zu bewerkstelligen hast du nun knapp eine Woche Zeit, also ran an die Arbeit ;-)

### Spezifikationen
#### **Die GUI**
Die Nutzoberfläche wurde mit Bootstrap erstellt und lässt sich in **vier** grobe Teile unterteilen:
- In der **linken Spalte** befindet sich der Info-Bereich. Dieser zeigt einige Kennzahlen des verwalteten Kühlschranks an. Dazu zählen die gesamte Kühlschrankkapazität, die Anzahl der im Kühlschrank eingelagerten Produkte, die noch freie Kapazität, die Anzahl der Produkte, die am nächsten Tag ablaufen, die Anzahl der abgelaufenen Produkte, das Volumen des kleinsten Produkts und das Volumen des größten Produkts.
Jedes der Badges für die entsprechende Zahl, wurde mit einer ID im Markup hinterlegt, so dass sie komfortable aus dem Javascript heraus angesprochen werden können.
- Die **rechte Spalte** dient als Kontrollpult des Kühlschrank. Sie beinhaltet Knöpfe zum Ausführen verschiedener Funktionen des Kühlschranks. Dazu zählen:
    - Clean -> Diese Funktion soll alle abgelaufenen Produkte aus dem Kühlschrank entfernen.
    - Sort -> Diese Funktion sortiert den Inhalt des Kühlschranks in aufsteigender Richtung nach dem Verfallsdatum der Produkte.
    - Defrost -> Diese Funktion entfernt alle Produkte aus dem Kühlschrank.
    - Func-1 -> Dieser Knopf ist frei-programmierbar für weitere Funktionalität.
    - Func-2 -> Dieser Knopf ist frei-programmierbar für weitere Funktionalität.


- Die **mittlere Spalte** stellt den Kühlschrank mit den eingelagerten Produkten dar. Darin werden die Produkte als Kacheln mit den wichtigsten Informationen und einem Löschknopf hinterlegt.

- Der **untere Bereich** besteht aus einer Hinzufüge-Maske für neue einzulagernde Produkte sowie einem Preset-Bereich, wo sich Voreinstellungen für die Eingabemaske auf die Knöpfe hinterlegen lassen.

#### **Die Datenstruktur**
Zur internen Abbildung der Daten soll eine Klassenbasierte Datenstruktur erstellt werden. <br>

Um den **Kühlschrank** abzubilden soll die Klasse `Fridge` aus `src/js/fridge.js` genutzt werden. <br>
Die Klasse sollte im Konstruktor eine `capacity` als Ganzzahl entgegen nehmen und diese der Instanz zuordenen. <br>
Zusätzlich benötigt die Klasse ein Datenfeld zur Speicherung der im Kühlschrank enthaltenen Produkte.
Hierfür würde sich zunächst ein Array anbieten.

Um die einzelnen eingelagerten **Produkte** abzubilden, soll die Klasse `Product` aus `src/js/product.js` genutzt werden. <br>
Die Klasse sollte über den Konstruktor folgende Daten entgegen nehmen und der Instanz zuordnen:
- Den Namen des Produkts als String
- Das Volumen des Produkts als Ganzzahl
- Das Ablaufdatum des Produkts als Datum

Zur Vereinfachung wird als Einheit für das Volumen die imaginäre Einheit `VU` genutzt.

Beim Anlegen neuer Produkte soll nun also eine neue Instanz der Klasse `Product` entstehen und, falls im Kühlschrank noch genug freies Volumen dafür übrig ist, zu dem Array in der Instanz der Klasse `Fridge` eingespeichert werden.


#### **Benötigte Funktionalität**
Für die Verwaltung der Produkte im Kühlschrank werden einige Funktionen erwartet:
- Das Hinzufügen neuer Produkte, wofür das Formular im **unteren Bereich der GUI** verwendet wird.
- Das Entfernen einzelner bereits eingelagerter Produkte, wofür der Löschknopf auf den **Produkt-Kacheln in der mittleren Spalte** verwendet wird.
- Das Entfernen aller bereits abgelaufener Produkte, wofür der `Clean`-Knopf in **der rechten Spalte** der GUI verwendet wird.
- Das Sortieren aller Produkte nach Ablaufdatum in aufsteigender Reihenfolge (also ältestes Datum zuerst), wofür der `Sort`-Knopf in **der rechten Spalte** der GUI verwendet wird.
- Das Entfernen ALLER eingelagerten Produkte, wofür der `Defrost`-Knopf in **der rechten Spalte** der GUI verwendet wird.

**BONUS**: Eventuell möchte man einige Voreinstellungen zum Hinzufügen von Produkten haben, die per Knopfdruck vorgefertigte Werte für `Name` und `Volume` in die Maske eintragen, so dass nurnoch ein Ablaufdatum händisch hinzugefügt werden soll.

Für die Überwachung des Kühlschrank Status sind einige Anzeigewerte **in der linken Spalte** der GUI vorgesehen:
- Die Gesamtkapazität des Kühlschranks, also das in der Kühlschrank-Instanz hinterlegte Gesamtvolumen (`Fridge capacity`).
- Die Anzahl der bereits eingelagerten Produkte (`Amount products`).
- Die freie Kapazität des Kühlschranks, also wieviel Volumen im Kühlschrank noch frei ist (`Free capacity`).
- Die Anzahl der Produkte, die in einem Tag verfallen (`Until tomorrow`).
- Die Anzahl der Produkte, die bereits abgelaufen sind (`Expired Products`).
- Das Volumen des kleinsten Produkts, also das Produkt mit dem kleinsten Volumen (`Smallest product`).
- Das Volumen des größten Produkts, also das Produkt mit dem größten Volumen (`Biggest product`).

Vergiss nicht, dass bei einer Änderung der Daten, auch diese Anzeigen aktualisiert werden sollten.


### Vorgehensweise
1. Nachdem du diese Projektbeschreibung durchgelesen hast, mache dich zunächst mit der GUI bekannt indem du das Projekt startest und sie dir im Browser ansiehst.
Die Knöpfe werden natürlich zunächst keine Funktion haben, denn dies ist ja dein Job ;-)<br>
Dieser Schritt verleiht dir einen Überblick der App und des Funktionsumfangs.


2. Wenn du die GUI soweit verstanden hast, solltest du dir die Projekt- und Codestruktur im Codeeditor ansehen und dich damit vertraut machen.<br>
Das Projekt besteht aus mehreren Dateien, weshalb es wichtig ist einen Überblick darüber zu behalten, welche Datei welchem Zweck dient.
    > Ordnung ist das halbe Leben.

    So wie dieser Satz oft den Alltag passt, hat dieser Grundsatz auch seine Richtigkeit beim Coden.
    Versuche also möglichst deinen Code bereits von Anfang an sauber und übersichtlich zu strukturieren, sowie sinnvolle Kommentare zu schreiben (ja, auch diese sind Gegenstand der Bewertung der Abgabe).

3. Möchtest du nun also mit dem Coden beginnen, empfiehlt es sich, sich erst einmal um die Datenstruktur, also die Klassen `Fridge` und `Product` zu kümmern.<br>
Vervollständige die bereitgestellten Klassen und teste sie ausgiebig in der Browser Konsole.
Erst wenn die Datenstruktur stimmt und die dazugehörigen Methoden zuverlässig funktionieren, kannst du dich beruhigt um den Anschluss an die GUI kümmern und wissen, dass mögliche Fehler nicht in den Daten liegen, was das beheben dieser erheblich einfacher macht.

4. Sobald du dich an die GUI machst, empfehle ich dir, bereits einige Produkte in deiner `Fridge`-Instanz zu hinterlegen, mit denen du gut testen kannst.<br>
Kümmere dich in erster Linie um das Anzeigen der Daten (Statuszahlen in der linken Spalte und Produktkacheln im mittleren Bereich). Am besten, du schreibst dir eine Funktion, die in einem Rutsch alle veränderlichen Daten in die GUI rendert damit du diese nach jeder Datenmanipulation bedenkenlos aufrufen kannst und sie dir die gesamte Anzeige neurendert.<br>
Dies wird sicherlich eine recht große Funktion, du kannst sie gerne in einige kleine Hilfsfunktionen unterteilen.<br>
In der `src/js/main.js` befindet sich bereits eine hilfreiche Funktion `createNewProductCard`, die anhand der übergebenen Daten eine Produkt-Kachel erstellt und als Rückgabewert zurückliefert. Nutze diese, denn sie spart dir einiges an Aufwand.

5. Wenn du mit der allgemeinen Render-Funktion fertig bist, könntest du dich an die Funktionalität der Hinzufüge-Maske machen. Hole dir dazu die nötigen Referenzen auf die Datenfelder sowie den Bestätigungsknopf und hänge letzterem einen `EventListener` an, in dem du die vom Nutzer eingegebenen Daten validierst (also auf Vollständigkeit und Richtigkeit prüfst) und daraus eine neue `Product`-Instanz erstellst. Diese darf natürlich nur in der `Fridge`-Instanz eingespeichert werden, wenn der Kühlschrank noch genug freies Volumen hat.

6. Wenn du dir durch ausgiebige Tests sicher bist, dass das Hinzufügen neuer Produkte gut funktioniert, mache dich an das Entfernen einzelner Produkte.
Die Funktion `createNewProductCard` sieht als Parameter ein `deleteCallback` vor, das aufgerufen wird, wenn der Löschknopf geklickt wird.<br>
Gehe also noch einmal an den Codeteil, der deine Produktkacheln rendert und übergebe der Funktion ein zum Löschen nötiges Callback.

7. Nachdem das Hinzufügen und Löschen gut funktioniert, kannst du dich an **die rechte Spalte** der GUI machen und den jeweiligen Knöpfen die zuvorbeschriebene Funktionalität verleihen.<br>
**Auch hier gilt:** _Manipuliere vor allem die Daten und lasse dann die GUI den Datensatz rendern. Mit dieser Vorgehensweise ersparst du dir lästiges Hinzufügen, Bearbeiten und Entfernen einzelner GUI-Elemente._

8. Die Aufgabe lässt viel Raum für Erweiterungen offen. Solltest du mit allem fertig sein und noch Zeit für Erweiterungen wie z.B. die Voreinstellungen haben, kannst du dich gerne an diese machen.
All das ist allerdings BONUS und sollte erst bearbeitet werden, wenn die Grundfunktionalität bereits fehlerfrei funktioniert. <br>
Für etwas Inspiration oder Rat kannst du dich natürlich gerne an den Lehrer und den Assistenzlehrer wenden.

Siehe diesen Fahrplan als starke Empfehlung jedoch nicht zwingend als absolute Maßgabe an.
Programmieren ist eine kreative Tätigkeit, was bedeutet, dass leichte Abweichung von diesem Vorgehen absolut normal sind, sofern es dir deine Arbeit erleichtert und dich zum Ziel bringt.

### Dokumentation
Zum Projekt soll auch eine kleine Reflektion als Markdown Datei mitgeliefert werden.
Beschreibe darin dein Vorgehen bei der Entwicklung sowie die folgenden drei Fragen:
- Was lief besonders gut?
- Was lief nicht so gut?
- Was würde ich beim nächsten mal anders machen in Bezug auf meine Herangehensweise bzw. Arbeitsweise?

Die Datei sollte im Ordner `docs/` hinterlegt werden und mit ins Repository eures Projekts eingecheckt werden.

### Projektpräsentation
Zum Projektabschluss wird eine kleine Präsentation deines Projektes stattfinden.

Im Zuge der Präsentation sollst du die Funktionsweise deines Projekts vorzeigen und evtl. auf Besonderheiten eingehen.

Gib dem Publikum außerdem einen Einblick in die Projektstruktur und deinen Code. Erläutere besondere Lösungen gerne.

Die Präsentation soll so ablaufen als würdest du als Entwickler uns als Auftraggeber deine Lösung verkaufen wollen. Lustige Werbesprüche müssen nicht sein, aber der Enthausiasmus sollte vorhanden sein.
Zeige uns warum wir von deiner Lösung überzeugt sein sollten.

Folien sind keine Pflicht, aber dürfen gerne erstellt werden. Sei ruhig kreativ und plane deine Präsentation.
Überlege dir schon vorher gute Beispiele und übe deine Präsentation.



Bei Fragen sind der Lehrer und der Assistenzlehrer natürlich immer ansprechbar.

Viel Erfolg!