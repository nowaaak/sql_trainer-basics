import type { Exercise } from './types'

export const exercises: Exercise[] = [
  // ─── DDL ─────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'ddl',
    title: 'Tabelle erstellen – Kunden',
    difficulty: 1,
    description: `
      <p>Erstelle eine Tabelle <strong>Kunden</strong> mit folgenden Spalten:</p>
      <ul>
        <li><code>KundenID</code> – Ganzzahl, Primärschlüssel, Auto-Increment</li>
        <li><code>Vorname</code> – Text (50 Zeichen)</li>
        <li><code>Nachname</code> – Text (50 Zeichen)</li>
        <li><code>Email</code> – Text (100 Zeichen)</li>
      </ul>
    `,
    schema: null,
    validation: {
      requiredKeywords: ['CREATE', 'TABLE', 'Kunden', 'KundenID', 'Vorname', 'Nachname', 'Email', 'PRIMARY KEY'],
      optionalKeywords: ['AUTO_INCREMENT', 'INT', 'VARCHAR'],
      hints: [
        'Beginne mit CREATE TABLE gefolgt vom Tabellennamen',
        'Vergiss nicht den Primärschlüssel zu definieren',
        'Achte auf die korrekten Datentypen: INT für IDs, VARCHAR für Text',
        'AUTO_INCREMENT wird für automatisch hochzählende IDs verwendet',
      ],
    },
  },
  {
    id: 2,
    category: 'ddl',
    title: 'Tabelle erstellen – Produkte',
    difficulty: 2,
    description: `
      <p>Erstelle eine Tabelle <strong>Produkte</strong> mit:</p>
      <ul>
        <li><code>ProduktID</code> – Ganzzahl, Primärschlüssel</li>
        <li><code>Bezeichnung</code> – Text (100 Zeichen), NOT NULL</li>
        <li><code>Preis</code> – Dezimalzahl (10,2)</li>
        <li><code>Lagerbestand</code> – Ganzzahl, Standard: 0</li>
      </ul>
    `,
    schema: null,
    validation: {
      requiredKeywords: ['CREATE', 'TABLE', 'Produkte', 'ProduktID', 'Bezeichnung', 'Preis', 'Lagerbestand', 'PRIMARY KEY'],
      optionalKeywords: ['NOT NULL', 'DEFAULT', 'DECIMAL', 'INT', 'VARCHAR'],
      hints: [
        'DECIMAL(10,2) erlaubt 10 Gesamtstellen mit 2 Nachkommastellen',
        'NOT NULL verhindert leere Werte',
        'DEFAULT setzt einen Standardwert wenn nichts angegeben wird',
      ],
    },
  },
  {
    id: 3,
    category: 'ddl',
    title: 'Spalte hinzufügen',
    difficulty: 1,
    description: `
      <p>Füge zur bestehenden Tabelle <strong>Kunden</strong> eine neue Spalte <code>Telefon</code> hinzu.</p>
      <p>Die Spalte soll Text (20 Zeichen) aufnehmen können.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['ALTER', 'TABLE', 'Kunden', 'ADD', 'Telefon'],
      optionalKeywords: ['VARCHAR', 'COLUMN'],
      hints: [
        'ALTER TABLE wird zum Ändern von Tabellenstrukturen verwendet',
        'ADD fügt eine neue Spalte hinzu',
        'Vergiss den Datentyp nicht',
      ],
    },
  },
  {
    id: 4,
    category: 'ddl',
    title: 'Spalte löschen',
    difficulty: 1,
    description: `
      <p>Entferne die Spalte <code>Fax</code> aus der Tabelle <strong>Lieferanten</strong>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Lieferanten',
          columns: [
            { name: 'LieferantID', type: 'INT', pk: true },
            { name: 'Firma', type: 'VARCHAR(100)' },
            { name: 'Telefon', type: 'VARCHAR(20)' },
            { name: 'Fax', type: 'VARCHAR(20)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['ALTER', 'TABLE', 'Lieferanten', 'DROP', 'Fax'],
      optionalKeywords: ['COLUMN'],
      hints: [
        'ALTER TABLE wird zum Ändern von Tabellenstrukturen verwendet',
        'DROP entfernt eine Spalte oder Tabelle',
        'Das Schlüsselwort COLUMN ist optional',
      ],
    },
  },
  {
    id: 5,
    category: 'ddl',
    title: 'Spalte umbenennen / ändern',
    difficulty: 2,
    description: `
      <p>Ändere in der Tabelle <strong>Mitarbeiter</strong> den Datentyp der Spalte <code>Gehalt</code> von INT zu DECIMAL(10,2).</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
            { name: 'Gehalt', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['ALTER', 'TABLE', 'Mitarbeiter', 'Gehalt', 'DECIMAL'],
      optionalKeywords: ['MODIFY', 'COLUMN', 'CHANGE', 'ALTER COLUMN'],
      hints: [
        'ALTER TABLE ... MODIFY COLUMN ändert den Datentyp',
        'DECIMAL(10,2) für Geldbeträge ist empfohlen',
        'Je nach SQL-Dialekt: MODIFY COLUMN oder ALTER COLUMN',
      ],
    },
  },
  {
    id: 36,
    category: 'ddl',
    title: 'Tabelle erstellen – Bestellungen',
    difficulty: 2,
    description: `
      <p>Erstelle eine Tabelle <strong>Bestellungen</strong> mit:</p>
      <ul>
        <li><code>BestellID</code> – Ganzzahl, Primärschlüssel, Auto-Increment</li>
        <li><code>KundenID</code> – Ganzzahl, Fremdschlüssel auf <strong>Kunden(KundenID)</strong></li>
        <li><code>Bestelldatum</code> – Datum, NOT NULL</li>
        <li><code>Gesamtbetrag</code> – Dezimalzahl (10,2), Standard: 0</li>
      </ul>
    `,
    schema: null,
    validation: {
      requiredKeywords: ['CREATE', 'TABLE', 'Bestellungen', 'BestellID', 'KundenID', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES'],
      optionalKeywords: ['AUTO_INCREMENT', 'DATE', 'DECIMAL', 'NOT NULL', 'DEFAULT', 'Kunden'],
      hints: [
        'Definiere zuerst die Spalten inkl. Datentypen',
        'PRIMARY KEY für BestellID nicht vergessen',
        'FOREIGN KEY (KundenID) REFERENCES Kunden(KundenID)',
      ],
    },
  },
  {
    id: 37,
    category: 'ddl',
    title: 'Tabelle erstellen – Bestellpositionen',
    difficulty: 3,
    description: `
      <p>Erstelle eine Tabelle <strong>Bestellpositionen</strong> mit:</p>
      <ul>
        <li><code>BestellID</code> – Ganzzahl, Fremdschlüssel auf Bestellungen</li>
        <li><code>ProduktID</code> – Ganzzahl, Fremdschlüssel auf Produkte</li>
        <li><code>Menge</code> – Ganzzahl, NOT NULL</li>
      </ul>
      <p>Lege einen <strong>zusammengesetzten Primärschlüssel</strong> aus BestellID und ProduktID fest.</p>
    `,
    schema: null,
    validation: {
      requiredKeywords: ['CREATE', 'TABLE', 'Bestellpositionen', 'BestellID', 'ProduktID', 'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES'],
      optionalKeywords: ['NOT NULL', 'Menge', 'Bestellungen', 'Produkte'],
      hints: [
        'Composite Key: PRIMARY KEY (BestellID, ProduktID)',
        'Jede FK braucht ein REFERENCES auf die Zieltabelle',
        'Definiere alle Spalten vor den Constraints',
      ],
    },
  },
  {
    id: 38,
    category: 'ddl',
    title: 'Tabelle löschen',
    difficulty: 1,
    description: `
      <p>Lösche die Tabelle <strong>Archiv</strong>, falls sie existiert.</p>
    `,
    schema: null,
    validation: {
      requiredKeywords: ['DROP', 'TABLE', 'Archiv'],
      optionalKeywords: ['IF EXISTS'],
      hints: [
        'DROP TABLE löscht eine Tabelle vollständig',
        'IF EXISTS verhindert Fehler, falls die Tabelle nicht existiert',
      ],
    },
  },

  // ─── DML ─────────────────────────────────────────────────────────────────
  {
    id: 6,
    category: 'dml',
    title: 'Datensatz einfügen',
    difficulty: 1,
    description: `
      <p>Füge einen neuen Kunden in die Tabelle <strong>Kunden</strong> ein:</p>
      <ul>
        <li>Vorname: Max</li>
        <li>Nachname: Mustermann</li>
        <li>Email: max@example.com</li>
      </ul>
      <p><em>Hinweis: Die KundenID wird automatisch vergeben (AUTO_INCREMENT).</em></p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT AUTO_INCREMENT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['INSERT', 'INTO', 'Kunden', 'VALUES', 'Max', 'Mustermann', 'max@example.com'],
      optionalKeywords: ['Vorname', 'Nachname', 'Email'],
      hints: [
        'INSERT INTO Tabellenname ... VALUES ...',
        'Bei AUTO_INCREMENT muss die ID nicht angegeben werden',
        'Textwerte müssen in Anführungszeichen stehen',
        'Spalten können explizit angegeben werden: INSERT INTO tabelle (spalte1, spalte2) VALUES ...',
      ],
    },
  },
  {
    id: 7,
    category: 'dml',
    title: 'Datensatz aktualisieren',
    difficulty: 2,
    description: `
      <p>Aktualisiere die Email-Adresse des Kunden mit der <strong>KundenID = 5</strong>.</p>
      <p>Die neue Email soll <code>neue.email@example.com</code> sein.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['UPDATE', 'Kunden', 'SET', 'Email', 'WHERE', 'KundenID', '5'],
      optionalKeywords: ['neue.email@example.com'],
      hints: [
        'UPDATE Tabellenname SET spalte = wert WHERE bedingung',
        'WICHTIG: Ohne WHERE werden ALLE Datensätze geändert!',
        'Die WHERE-Klausel filtert den gewünschten Datensatz',
      ],
    },
  },
  {
    id: 8,
    category: 'dml',
    title: 'Datensatz löschen',
    difficulty: 2,
    description: `
      <p>Lösche den Kunden mit der <strong>KundenID = 10</strong> aus der Tabelle <strong>Kunden</strong>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['DELETE', 'FROM', 'Kunden', 'WHERE', 'KundenID', '10'],
      optionalKeywords: [],
      hints: [
        'DELETE FROM Tabellenname WHERE bedingung',
        'WICHTIG: Ohne WHERE werden ALLE Datensätze gelöscht!',
        'Prüfe die WHERE-Bedingung sorgfältig',
      ],
    },
  },
  {
    id: 9,
    category: 'dml',
    title: 'Mehrere Werte aktualisieren',
    difficulty: 2,
    description: `
      <p>Aktualisiere für das Produkt mit <strong>ProduktID = 3</strong>:</p>
      <ul>
        <li>Preis auf <code>29.99</code></li>
        <li>Lagerbestand auf <code>100</code></li>
      </ul>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['UPDATE', 'Produkte', 'SET', 'Preis', 'Lagerbestand', 'WHERE', 'ProduktID', '3'],
      optionalKeywords: ['29.99', '100'],
      hints: [
        'Mehrere Spalten werden mit Komma getrennt: SET spalte1 = wert1, spalte2 = wert2',
        'Vergiss die WHERE-Bedingung nicht',
        'Dezimalzahlen mit Punkt schreiben: 29.99',
      ],
    },
  },
  {
    id: 39,
    category: 'dml',
    title: 'Mehrere Datensätze einfügen',
    difficulty: 2,
    description: `
      <p>Füge drei Produkte in die Tabelle <strong>Produkte</strong> ein:</p>
      <ul>
        <li>Tastatur, 49.99, Lagerbestand 25</li>
        <li>Maus, 19.99, Lagerbestand 60</li>
        <li>Monitor, 179.99, Lagerbestand 10</li>
      </ul>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['INSERT', 'INTO', 'Produkte', 'VALUES', 'Tastatur', 'Maus', 'Monitor'],
      optionalKeywords: ['Bezeichnung', 'Preis', 'Lagerbestand', '49.99', '19.99', '179.99'],
      hints: [
        'Mehrere Datensätze kannst du in einem INSERT mit mehreren VALUES-Teilen einfügen',
        'Textwerte brauchen Anführungszeichen',
        'Die Reihenfolge der Werte muss zur Spaltenliste passen',
      ],
    },
  },
  {
    id: 40,
    category: 'dml',
    title: 'Datensatz einfügen mit Spaltenliste',
    difficulty: 2,
    description: `
      <p>Füge eine Bestellung ein:</p>
      <ul>
        <li>KundenID: 2</li>
        <li>Bestelldatum: 2024-06-15</li>
        <li>Gesamtbetrag: 199.90</li>
      </ul>
      <p>Verwende eine <strong>Spaltenliste</strong> beim INSERT.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['INSERT', 'INTO', 'Bestellungen', 'KundenID', 'Bestelldatum', 'Gesamtbetrag', 'VALUES'],
      optionalKeywords: ['2', '2024-06-15', '199.90'],
      hints: [
        'Spaltenliste: INSERT INTO Bestellungen (KundenID, Bestelldatum, Gesamtbetrag)',
        'Datumswerte im Format YYYY-MM-DD',
        'Zahlen ohne Anführungszeichen',
      ],
    },
  },
  {
    id: 41,
    category: 'dml',
    title: 'Preisänderung in Prozent',
    difficulty: 2,
    description: `
      <p>Erhöhe den <strong>Preis aller Produkte</strong> der Kategorie 2 um 10%.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'KategorieID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['UPDATE', 'Produkte', 'SET', 'Preis', 'WHERE', 'KategorieID', '2'],
      optionalKeywords: ['*', '1.1', '+', '0.1'],
      hints: [
        'UPDATE Produkte SET Preis = Preis * 1.1',
        'Mit WHERE KategorieID = 2 nur die gewünschte Kategorie ändern',
        'Ohne WHERE würden alle Produkte geändert',
      ],
    },
  },
  {
    id: 42,
    category: 'dml',
    title: 'Alte Bestellungen löschen',
    difficulty: 2,
    description: `
      <p>Lösche alle Bestellungen, die <strong>vor dem 01.01.2024</strong> liegen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['DELETE', 'FROM', 'Bestellungen', 'WHERE', 'Bestelldatum', '<'],
      optionalKeywords: ['2024-01-01'],
      hints: [
        'DELETE FROM Bestellungen WHERE Bestelldatum < ...',
        'Datumswerte im Format YYYY-MM-DD',
        'Achte auf die WHERE-Bedingung',
      ],
    },
  },

  // ─── DQL ─────────────────────────────────────────────────────────────────
  {
    id: 10,
    category: 'dql',
    title: 'Alle Daten abfragen',
    difficulty: 1,
    description: `
      <p>Frage <strong>alle Spalten</strong> aller Kunden aus der Tabelle <strong>Kunden</strong> ab.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Kunden'],
      optionalKeywords: ['*'],
      hints: [
        'SELECT wählt Spalten aus',
        '* steht für alle Spalten',
        'FROM gibt die Tabelle an',
      ],
    },
  },
  {
    id: 11,
    category: 'dql',
    title: 'Bestimmte Spalten abfragen',
    difficulty: 1,
    description: `
      <p>Frage nur <strong>Vorname</strong> und <strong>Nachname</strong> aller Kunden ab.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'Vorname', 'Nachname', 'FROM', 'Kunden'],
      forbiddenKeywords: ['*'],
      hints: [
        'Spalten werden mit Komma getrennt aufgelistet',
        'Kein * verwenden – spezifische Spalten angeben',
        'Reihenfolge: SELECT spalten FROM tabelle',
      ],
    },
  },
  {
    id: 12,
    category: 'dql',
    title: 'WHERE-Bedingung',
    difficulty: 1,
    description: `
      <p>Frage alle Produkte ab, deren <strong>Preis größer als 50</strong> ist.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Produkte', 'WHERE', 'Preis', '>'],
      optionalKeywords: ['50', '*'],
      hints: [
        'WHERE filtert die Ergebnisse',
        'Vergleichsoperator > für "größer als"',
        'Zahlen ohne Anführungszeichen',
      ],
    },
  },
  {
    id: 13,
    category: 'dql',
    title: 'Mehrere Bedingungen (AND)',
    difficulty: 2,
    description: `
      <p>Frage alle Produkte ab, deren <strong>Preis zwischen 10 und 50 liegt</strong> (inklusive).</p>
      <p>Verwende AND zur Verknüpfung der Bedingungen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Produkte', 'WHERE', 'Preis', 'AND'],
      optionalKeywords: ['>=', '<=', '10', '50', 'BETWEEN', '*'],
      hints: [
        'AND verknüpft zwei Bedingungen (beide müssen wahr sein)',
        '>= und <= für "größer/kleiner gleich"',
        'Alternativ: BETWEEN ... AND ... ist auch möglich',
      ],
    },
  },
  {
    id: 14,
    category: 'dql',
    title: 'LIKE-Operator',
    difficulty: 2,
    description: `
      <p>Frage alle Kunden ab, deren <strong>Nachname mit "M" beginnt</strong>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Kunden', 'WHERE', 'Nachname', 'LIKE'],
      optionalKeywords: ['M%', '*'],
      hints: [
        'LIKE erlaubt Mustersuche in Texten',
        '% ist ein Platzhalter für beliebig viele Zeichen',
        "M% findet alles was mit M beginnt",
      ],
    },
  },
  {
    id: 15,
    category: 'dql',
    title: 'BETWEEN-Operator',
    difficulty: 2,
    description: `
      <p>Frage alle Bestellungen ab, deren <strong>Bestelldatum zwischen dem 01.01.2024 und 31.12.2024</strong> liegt.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Bestellungen', 'WHERE', 'Bestelldatum', 'BETWEEN', 'AND'],
      optionalKeywords: ['2024-01-01', '2024-12-31', '*'],
      hints: [
        'BETWEEN ... AND ... prüft auf einen Wertebereich',
        'Datumsformat: YYYY-MM-DD (z.B. 2024-01-01)',
        'BETWEEN ist inklusive der Grenzwerte',
      ],
    },
  },
  {
    id: 16,
    category: 'dql',
    title: 'Aggregatfunktion COUNT',
    difficulty: 2,
    description: `
      <p>Zähle die <strong>Anzahl aller Kunden</strong> in der Tabelle.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
            { name: 'Email', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'COUNT', 'FROM', 'Kunden'],
      optionalKeywords: ['*', 'KundenID'],
      hints: [
        'COUNT() zählt die Anzahl der Datensätze',
        'COUNT(*) zählt alle Zeilen',
        'COUNT(spalte) zählt nur Zeilen wo die Spalte nicht NULL ist',
      ],
    },
  },
  {
    id: 17,
    category: 'dql',
    title: 'Aggregatfunktion SUM',
    difficulty: 2,
    description: `
      <p>Berechne die <strong>Summe aller Gesamtbeträge</strong> der Bestellungen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'SUM', 'Gesamtbetrag', 'FROM', 'Bestellungen'],
      optionalKeywords: [],
      hints: [
        'SUM() addiert alle Werte einer Spalte',
        'SUM(spalte) berechnet die Summe der angegebenen Spalte',
        'Aggregatfunktionen werden im SELECT verwendet',
      ],
    },
  },
  {
    id: 18,
    category: 'dql',
    title: 'Aggregatfunktion AVG',
    difficulty: 2,
    description: `
      <p>Berechne den <strong>Durchschnittspreis</strong> aller Produkte.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'AVG', 'Preis', 'FROM', 'Produkte'],
      optionalKeywords: [],
      hints: [
        'AVG() berechnet den Durchschnitt',
        'AVG(spalte) – die Spalte muss numerisch sein',
        'NULL-Werte werden bei AVG ignoriert',
      ],
    },
  },
  {
    id: 19,
    category: 'dql',
    title: 'Rechenoperatoren',
    difficulty: 2,
    description: `
      <p>Berechne für jedes Produkt den <strong>Bruttopreis</strong> (Preis + 19% MwSt).</p>
      <p>Zeige Bezeichnung und den berechneten Bruttopreis.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
            { name: 'Lagerbestand', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'Bezeichnung', 'Preis', 'FROM', 'Produkte'],
      optionalKeywords: ['*', '1.19', '0.19', '+', 'AS', 'Bruttopreis'],
      hints: [
        'Du kannst direkt im SELECT rechnen: Preis * 1.19',
        'Oder: Preis + (Preis * 0.19)',
        'Mit AS kannst du dem Ergebnis einen Namen geben',
      ],
    },
  },

  // ─── JOINs – INNER ───────────────────────────────────────────────────────
  {
    id: 20,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Basics',
    difficulty: 2,
    description: `
      <p>Verknüpfe die Tabellen <strong>Bestellungen</strong> und <strong>Kunden</strong>.</p>
      <p>Zeige alle Bestellungen mit den zugehörigen Kundennamen (Vorname, Nachname).</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'KundenID'],
      optionalKeywords: ['INNER', 'Bestellungen', 'Kunden', 'Vorname', 'Nachname', '='],
      hints: [
        'INNER JOIN verknüpft zwei Tabellen über eine gemeinsame Spalte',
        'Syntax: tabelle1 JOIN tabelle2 ON tabelle1.spalte = tabelle2.spalte',
        'Die KundenID ist der Fremdschlüssel der die Tabellen verbindet',
      ],
    },
  },
  {
    id: 43,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Produkte und Kategorien',
    difficulty: 2,
    description: `
      <p>Verknüpfe <strong>Produkte</strong> mit <strong>Kategorien</strong>.</p>
      <p>Zeige die Produktbezeichnung und den Kategorienamen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kategorien',
          columns: [
            { name: 'KategorieID', type: 'INT', pk: true },
            { name: 'Kategoriename', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'KategorieID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'KategorieID'],
      optionalKeywords: ['Produkte', 'Kategorien', 'Bezeichnung', 'Kategoriename', '='],
      hints: [
        'INNER JOIN verknüpft nur passende Datensätze',
        'ON Produkte.KategorieID = Kategorien.KategorieID',
        'SELECT die gewünschten Spalten aus beiden Tabellen',
      ],
    },
  },
  {
    id: 44,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Bestellungen und Positionen',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Bestellpositionen</strong> mit der zugehörigen <strong>BestellID</strong>.</p>
      <p>Verknüpfe <strong>Bestellungen</strong> und <strong>Bestellpositionen</strong> per INNER JOIN.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'BestellID', type: 'INT', fk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'BestellID'],
      optionalKeywords: ['Bestellungen', 'Bestellpositionen', 'PositionID', 'Menge', '='],
      hints: [
        'INNER JOIN über BestellID',
        'FROM Bestellungen INNER JOIN Bestellpositionen',
        'SELECT die gewünschten Spalten',
      ],
    },
  },
  {
    id: 45,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Bestellungen im Jahr 2024',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Bestellungen aus dem Jahr 2024</strong> mit Kundennamen.</p>
      <p>Verknüpfe Kunden und Bestellungen per INNER JOIN und filtere nach Datum.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'WHERE', 'Bestelldatum', '2024'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'Vorname', 'Nachname', '=', 'BETWEEN'],
      hints: [
        'INNER JOIN Kunden ↔ Bestellungen',
        'Filtere mit WHERE Bestelldatum ... 2024',
        'Beispiel: BETWEEN 2024-01-01 AND 2024-12-31',
      ],
    },
  },
  {
    id: 46,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Mitarbeiter im Vertrieb',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Mitarbeiter aus der Abteilung "Vertrieb"</strong>.</p>
      <p>Verknüpfe Mitarbeiter und Abteilungen per INNER JOIN und filtere nach Abteilungsname.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
            { name: 'AbteilungID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Abteilungen',
          columns: [
            { name: 'AbteilungID', type: 'INT', pk: true },
            { name: 'Abteilungsname', type: 'VARCHAR(50)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'WHERE', 'Abteilungsname', 'Vertrieb'],
      optionalKeywords: ['Mitarbeiter', 'Abteilungen', 'Name', '='],
      hints: [
        'INNER JOIN Mitarbeiter ↔ Abteilungen',
        "WHERE Abteilungsname = 'Vertrieb'",
        'SELECT z.B. Name und Abteilungsname',
      ],
    },
  },
  {
    id: 47,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Lieferanten aus Berlin',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Produkte von Lieferanten aus Berlin</strong>.</p>
      <p>Verknüpfe Lieferanten und Produkte per INNER JOIN.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Lieferanten',
          columns: [
            { name: 'LieferantID', type: 'INT', pk: true },
            { name: 'Firma', type: 'VARCHAR(100)' },
            { name: 'Stadt', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'LieferantID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'WHERE', 'Stadt', 'Berlin'],
      optionalKeywords: ['Lieferanten', 'Produkte', 'Firma', 'Bezeichnung', '='],
      hints: [
        'INNER JOIN über LieferantID',
        "Filtere mit WHERE Stadt = 'Berlin'",
        'SELECT die gewünschten Spalten',
      ],
    },
  },
  {
    id: 48,
    category: 'joins',
    joinType: 'inner',
    title: 'INNER JOIN – Positionen mit Menge >= 5',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Bestellpositionen</strong> mit Menge >= 5.</p>
      <p>Verknüpfe Bestellpositionen mit Produkten per INNER JOIN.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'INNER', 'JOIN', 'ON', 'WHERE', 'Menge', '>=', '5'],
      optionalKeywords: ['Bestellpositionen', 'Produkte', 'ProduktID', 'Bezeichnung', '='],
      hints: [
        'INNER JOIN Bestellpositionen ↔ Produkte',
        'WHERE Menge >= 5',
        'SELECT z.B. Bezeichnung und Menge',
      ],
    },
  },

  // ─── JOINs – LEFT ────────────────────────────────────────────────────────
  {
    id: 21,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN',
    difficulty: 3,
    description: `
      <p>Zeige <strong>alle Kunden</strong> mit ihren Bestellungen.</p>
      <p>Auch Kunden <strong>ohne Bestellungen</strong> sollen angezeigt werden!</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'KundenID'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'Vorname', 'Nachname', '=', '*'],
      hints: [
        'LEFT JOIN zeigt alle Datensätze der linken Tabelle',
        'Auch wenn es keinen passenden Eintrag in der rechten Tabelle gibt',
        'Kunden muss links stehen (FROM Kunden LEFT JOIN Bestellungen)',
      ],
    },
  },
  {
    id: 27,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN mit NULL-Prüfung',
    difficulty: 3,
    description: `
      <p>Finde alle <strong>Kunden, die noch nie bestellt haben</strong>.</p>
      <p>Nutze LEFT JOIN und prüfe auf NULL in der Bestelltabelle.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'WHERE', 'NULL'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'KundenID', 'BestellID', 'IS', '='],
      hints: [
        'LEFT JOIN zeigt alle Kunden, auch ohne Bestellungen',
        'Kunden ohne Bestellungen haben NULL in den Bestellspalten',
        'Prüfe mit: WHERE Bestellungen.BestellID IS NULL',
      ],
    },
  },
  {
    id: 28,
    category: 'joins',
    joinType: 'left',
    title: 'JOIN mit Aggregation',
    difficulty: 3,
    description: `
      <p>Zeige für jeden Kunden die <strong>Anzahl seiner Bestellungen</strong>.</p>
      <p>Auch Kunden ohne Bestellungen sollen mit 0 angezeigt werden.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'COUNT', 'GROUP BY'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'KundenID', 'BestellID', 'Vorname', 'Nachname', '=', '*'],
      hints: [
        'LEFT JOIN damit auch Kunden ohne Bestellungen erscheinen',
        'COUNT() zählt die Bestellungen pro Kunde',
        'GROUP BY gruppiert die Ergebnisse nach Kunde',
      ],
    },
  },
  {
    id: 30,
    category: 'joins',
    joinType: 'left',
    title: 'Produkte ohne Bestellungen',
    difficulty: 2,
    description: `
      <p>Finde alle <strong>Produkte, die noch nie bestellt wurden</strong>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'BestellID', type: 'INT', fk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'WHERE', 'NULL'],
      optionalKeywords: ['Produkte', 'Bestellpositionen', 'ProduktID', 'IS', 'Bezeichnung', '='],
      hints: [
        'LEFT JOIN zeigt alle Produkte, auch ohne Bestellpositionen',
        'Produkte ohne Bestellungen haben NULL bei den Bestellpositionen',
        'WHERE ... IS NULL filtert die nicht bestellten Produkte',
      ],
    },
  },
  {
    id: 33,
    category: 'joins',
    joinType: 'left',
    title: 'Kategorien und Produkte zählen',
    difficulty: 3,
    description: `
      <p>Zeige jede <strong>Kategorie mit der Anzahl ihrer Produkte</strong>.</p>
      <p>Kategorien ohne Produkte sollen mit 0 angezeigt werden.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kategorien',
          columns: [
            { name: 'KategorieID', type: 'INT', pk: true },
            { name: 'Kategoriename', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'KategorieID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'COUNT', 'GROUP BY'],
      optionalKeywords: ['Kategorien', 'Produkte', 'KategorieID', 'Kategoriename', 'ProduktID', '=', '*'],
      hints: [
        'LEFT JOIN damit Kategorien ohne Produkte auch erscheinen',
        'COUNT(ProduktID) zählt nur vorhandene Produkte (nicht NULL)',
        'GROUP BY Kategorie für die Gruppierung',
      ],
    },
  },
  {
    id: 49,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN – Lieferanten mit Produkten',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Lieferanten</strong> und ihre <strong>Produkte</strong>.</p>
      <p>Auch Lieferanten ohne Produkte sollen angezeigt werden.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Lieferanten',
          columns: [
            { name: 'LieferantID', type: 'INT', pk: true },
            { name: 'Firma', type: 'VARCHAR(100)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'LieferantID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'LieferantID'],
      optionalKeywords: ['Lieferanten', 'Produkte', 'Firma', 'Bezeichnung', '='],
      hints: [
        'LEFT JOIN zeigt alle Lieferanten, auch ohne Produkte',
        'Lieferanten müssen links stehen',
        'ON Lieferanten.LieferantID = Produkte.LieferantID',
      ],
    },
  },
  {
    id: 50,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN – Kategorien mit Produkten',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Kategorien</strong> mit ihren Produkten.</p>
      <p>Kategorien ohne Produkte sollen trotzdem erscheinen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kategorien',
          columns: [
            { name: 'KategorieID', type: 'INT', pk: true },
            { name: 'Kategoriename', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'KategorieID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'KategorieID'],
      optionalKeywords: ['Kategorien', 'Produkte', 'Kategoriename', 'Bezeichnung', '='],
      hints: [
        'LEFT JOIN: Kategorien links, Produkte rechts',
        'ON Kategorien.KategorieID = Produkte.KategorieID',
        'So erscheinen auch Kategorien ohne Produkte',
      ],
    },
  },
  {
    id: 51,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN – Mitarbeiter ohne Projekte',
    difficulty: 3,
    description: `
      <p>Finde alle <strong>Mitarbeiter ohne Projektzuordnung</strong>.</p>
      <p>Nutze LEFT JOIN und prüfe auf NULL in der Zwischentabelle.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
          ],
        },
        {
          name: 'MitarbeiterProjekte',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', fk: true },
            { name: 'ProjektID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'WHERE', 'NULL'],
      optionalKeywords: ['Mitarbeiter', 'MitarbeiterProjekte', 'MitarbeiterID', 'ProjektID', 'IS', '='],
      hints: [
        'LEFT JOIN Mitarbeiter → MitarbeiterProjekte',
        'Mitarbeiter ohne Projekt haben NULL in der Zwischentabelle',
        'WHERE MitarbeiterProjekte.ProjektID IS NULL',
      ],
    },
  },
  {
    id: 52,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN – Bestellungen ohne Positionen',
    difficulty: 3,
    description: `
      <p>Finde alle <strong>Bestellungen ohne Bestellpositionen</strong>.</p>
      <p>Nutze LEFT JOIN und prüfe auf NULL.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'BestellID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'WHERE', 'NULL'],
      optionalKeywords: ['Bestellungen', 'Bestellpositionen', 'BestellID', 'IS', '='],
      hints: [
        'LEFT JOIN Bestellungen → Bestellpositionen',
        'Bestellungen ohne Positionen haben NULL',
        'WHERE Bestellpositionen.PositionID IS NULL',
      ],
    },
  },
  {
    id: 53,
    category: 'joins',
    joinType: 'left',
    title: 'LEFT JOIN – Kunden mit Bestellungen',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Kunden</strong> mit ihren Bestellungen.</p>
      <p>Auch Kunden ohne Bestellungen sollen erscheinen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'LEFT', 'JOIN', 'ON', 'KundenID'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'Vorname', 'Nachname', 'Bestelldatum', '='],
      hints: [
        'LEFT JOIN zeigt alle Kunden',
        'ON Kunden.KundenID = Bestellungen.KundenID',
        'SELECT die gewünschten Spalten',
      ],
    },
  },

  // ─── JOINs – RIGHT ───────────────────────────────────────────────────────
  {
    id: 22,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN',
    difficulty: 3,
    description: `
      <p>Zeige <strong>alle Bestellungen</strong> mit den zugehörigen Kundendaten.</p>
      <p>Auch Bestellungen von gelöschten Kunden sollen erscheinen!</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'KundenID'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'Vorname', 'Nachname', '=', '*'],
      hints: [
        'RIGHT JOIN zeigt alle Datensätze der rechten Tabelle',
        'Auch wenn es keinen passenden Eintrag in der linken Tabelle gibt',
        'Bestellungen muss rechts stehen',
      ],
    },
  },
  {
    id: 54,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Produkte und Bestellpositionen',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Bestellpositionen</strong> inklusive Produktdaten.</p>
      <p>Nutze RIGHT JOIN, sodass alle Positionen angezeigt werden.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'ProduktID'],
      optionalKeywords: ['Produkte', 'Bestellpositionen', 'Bezeichnung', 'Menge', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Bestellpositionen',
        'ON Produkte.ProduktID = Bestellpositionen.ProduktID',
        'So bleiben alle Positionen erhalten',
      ],
    },
  },
  {
    id: 55,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Abteilungen mit Mitarbeitern',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Abteilungen</strong> mit ihren Mitarbeitern.</p>
      <p>Nutze RIGHT JOIN, sodass alle Abteilungen erscheinen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
            { name: 'AbteilungID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Abteilungen',
          columns: [
            { name: 'AbteilungID', type: 'INT', pk: true },
            { name: 'Abteilungsname', type: 'VARCHAR(50)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'AbteilungID'],
      optionalKeywords: ['Mitarbeiter', 'Abteilungen', 'Name', 'Abteilungsname', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Abteilungen',
        'ON Mitarbeiter.AbteilungID = Abteilungen.AbteilungID',
        'So erscheinen alle Abteilungen',
      ],
    },
  },
  {
    id: 56,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Bestellungen mit Kunden',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Bestellungen</strong> mit den Kundennamen.</p>
      <p>Nutze RIGHT JOIN, sodass jede Bestellung angezeigt wird.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'KundenID'],
      optionalKeywords: ['Kunden', 'Bestellungen', 'Vorname', 'Nachname', 'Bestelldatum', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Bestellungen',
        'ON Kunden.KundenID = Bestellungen.KundenID',
        'So bleiben alle Bestellungen erhalten',
      ],
    },
  },
  {
    id: 57,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Produkte mit Lieferanten',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Produkte</strong> mit Lieferantennamen.</p>
      <p>Nutze RIGHT JOIN, sodass alle Produkte erscheinen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Lieferanten',
          columns: [
            { name: 'LieferantID', type: 'INT', pk: true },
            { name: 'Firma', type: 'VARCHAR(100)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'LieferantID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'LieferantID'],
      optionalKeywords: ['Lieferanten', 'Produkte', 'Firma', 'Bezeichnung', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Produkte',
        'ON Lieferanten.LieferantID = Produkte.LieferantID',
        'So erscheinen alle Produkte',
      ],
    },
  },
  {
    id: 58,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Produkte mit Kategorien',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Produkte</strong> mit ihren Kategorien.</p>
      <p>Nutze RIGHT JOIN, sodass alle Produkte angezeigt werden.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kategorien',
          columns: [
            { name: 'KategorieID', type: 'INT', pk: true },
            { name: 'Kategoriename', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'KategorieID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'KategorieID'],
      optionalKeywords: ['Kategorien', 'Produkte', 'Kategoriename', 'Bezeichnung', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Produkte',
        'ON Kategorien.KategorieID = Produkte.KategorieID',
        'So bleiben alle Produkte erhalten',
      ],
    },
  },
  {
    id: 59,
    category: 'joins',
    joinType: 'right',
    title: 'RIGHT JOIN – Projekte mit Zuordnung',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Projekte</strong> mit ihren Mitarbeiter-Zuordnungen.</p>
      <p>Nutze RIGHT JOIN, sodass alle Projekte erscheinen.</p>
    `,
    schema: {
      tables: [
        {
          name: 'MitarbeiterProjekte',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', fk: true },
            { name: 'ProjektID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Projekte',
          columns: [
            { name: 'ProjektID', type: 'INT', pk: true },
            { name: 'Projektname', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'RIGHT', 'JOIN', 'ON', 'ProjektID'],
      optionalKeywords: ['MitarbeiterProjekte', 'Projekte', 'Projektname', '='],
      hints: [
        'RIGHT JOIN: rechte Tabelle ist Projekte',
        'ON MitarbeiterProjekte.ProjektID = Projekte.ProjektID',
        'So erscheinen alle Projekte',
      ],
    },
  },

  // ─── JOINs – ADVANCED ────────────────────────────────────────────────────
  {
    id: 23,
    category: 'joins',
    joinType: 'advanced',
    title: 'JOIN mit Bedingung',
    difficulty: 3,
    description: `
      <p>Zeige alle Bestellungen aus dem <strong>Jahr 2024</strong> mit Kundennamen.</p>
      <p>Verknüpfe Bestellungen und Kunden und filtere nach dem Bestelldatum.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'WHERE', 'Bestelldatum', '2024'],
      optionalKeywords: ['INNER', 'Kunden', 'Bestellungen', 'KundenID', 'YEAR', 'BETWEEN', 'LIKE', '=', '*'],
      hints: [
        'Erst JOIN, dann WHERE für die Filterung',
        'Für Jahresfilter: YEAR(Bestelldatum) = 2024',
        'Oder: Bestelldatum BETWEEN "2024-01-01" AND "2024-12-31"',
      ],
    },
  },
  {
    id: 24,
    category: 'joins',
    joinType: 'advanced',
    title: 'Mehrfacher JOIN',
    difficulty: 3,
    description: `
      <p>Zeige für jede Bestellposition: <strong>Kundenname, Produktbezeichnung und Menge</strong>.</p>
      <p>Du musst drei Tabellen verknüpfen!</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'PositionID', type: 'INT', pk: true },
            { name: 'BestellID', type: 'INT', fk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON'],
      optionalKeywords: ['INNER', 'Kunden', 'Bestellungen', 'Bestellpositionen', 'Produkte', 'KundenID', 'BestellID', 'ProduktID', 'Vorname', 'Nachname', 'Bezeichnung', 'Menge', '='],
      multipleJoins: true,
      hints: [
        'Du brauchst mehrere JOINs hintereinander',
        'Bestellpositionen verbindet Bestellungen mit Produkten',
        'Pfad: Kunden → Bestellungen → Bestellpositionen → Produkte',
        'Jeder JOIN braucht eine eigene ON-Bedingung',
      ],
    },
  },
  {
    id: 25,
    category: 'joins',
    joinType: 'advanced',
    title: 'JOIN mit Alias',
    difficulty: 2,
    description: `
      <p>Verknüpfe <strong>Mitarbeiter</strong> und <strong>Abteilungen</strong>.</p>
      <p>Verwende Aliase (<code>m</code> für Mitarbeiter, <code>a</code> für Abteilungen).</p>
      <p>Zeige: Mitarbeitername und Abteilungsname.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
            { name: 'AbteilungID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Abteilungen',
          columns: [
            { name: 'AbteilungID', type: 'INT', pk: true },
            { name: 'Abteilungsname', type: 'VARCHAR(50)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'AbteilungID'],
      optionalKeywords: ['AS', 'm', 'a', 'Mitarbeiter', 'Abteilungen', 'Name', 'Abteilungsname', '='],
      hints: [
        'Aliase werden nach dem Tabellennamen definiert: FROM Mitarbeiter m',
        'Du kannst AS verwenden oder weglassen: Mitarbeiter AS m oder Mitarbeiter m',
        'Mit Alias referenzierst du Spalten: m.Name, a.Abteilungsname',
      ],
    },
  },
  {
    id: 26,
    category: 'joins',
    joinType: 'advanced',
    title: 'Self-JOIN',
    difficulty: 3,
    description: `
      <p>Finde alle <strong>Mitarbeiter mit ihren Vorgesetzten</strong>.</p>
      <p>Die Tabelle enthält eine Spalte <code>VorgesetzterID</code>, die auf einen anderen Mitarbeiter verweist.</p>
      <p>Zeige: Mitarbeitername und Name des Vorgesetzten.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
            { name: 'VorgesetzterID', type: 'INT', fk: true },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'Mitarbeiter', 'JOIN', 'ON'],
      optionalKeywords: ['LEFT', 'AS', 'm', 'v', 'MitarbeiterID', 'VorgesetzterID', 'Name', '='],
      hints: [
        'Ein Self-JOIN verknüpft eine Tabelle mit sich selbst',
        'Du brauchst verschiedene Aliase für dieselbe Tabelle',
        'z.B.: FROM Mitarbeiter m JOIN Mitarbeiter v ON m.VorgesetzterID = v.MitarbeiterID',
      ],
    },
  },
  {
    id: 29,
    category: 'joins',
    joinType: 'advanced',
    title: 'JOIN mit SUM',
    difficulty: 3,
    description: `
      <p>Berechne den <strong>Gesamtumsatz pro Kunde</strong>.</p>
      <p>Zeige Kundenname und Summe aller Bestellbeträge.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'SUM', 'GROUP BY'],
      optionalKeywords: ['LEFT', 'INNER', 'Kunden', 'Bestellungen', 'KundenID', 'Gesamtbetrag', 'Vorname', 'Nachname', '='],
      hints: [
        'SUM(Gesamtbetrag) addiert alle Bestellbeträge',
        'GROUP BY gruppiert nach Kunde',
        'JOIN verbindet Kunden mit ihren Bestellungen',
      ],
    },
  },
  {
    id: 31,
    category: 'joins',
    joinType: 'advanced',
    title: 'Lieferanten und Produkte',
    difficulty: 2,
    description: `
      <p>Zeige alle <strong>Produkte mit ihrem Lieferantennamen</strong>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Lieferanten',
          columns: [
            { name: 'LieferantID', type: 'INT', pk: true },
            { name: 'Firma', type: 'VARCHAR(100)' },
            { name: 'Stadt', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
            { name: 'LieferantID', type: 'INT', fk: true },
            { name: 'Preis', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'LieferantID'],
      optionalKeywords: ['INNER', 'Produkte', 'Lieferanten', 'Bezeichnung', 'Firma', '='],
      hints: [
        'JOIN verbindet Produkte mit Lieferanten über LieferantID',
        'SELECT die gewünschten Spalten aus beiden Tabellen',
        'ON definiert die Verknüpfungsbedingung',
      ],
    },
  },
  {
    id: 32,
    category: 'joins',
    joinType: 'advanced',
    title: 'Mitarbeiter und Projekte',
    difficulty: 3,
    description: `
      <p>Zeige alle <strong>Mitarbeiter mit ihren zugewiesenen Projekten</strong>.</p>
      <p>Die Zuordnung erfolgt über eine Zwischentabelle <code>MitarbeiterProjekte</code>.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Mitarbeiter',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', pk: true },
            { name: 'Name', type: 'VARCHAR(100)' },
          ],
        },
        {
          name: 'MitarbeiterProjekte',
          columns: [
            { name: 'MitarbeiterID', type: 'INT', fk: true },
            { name: 'ProjektID', type: 'INT', fk: true },
          ],
        },
        {
          name: 'Projekte',
          columns: [
            { name: 'ProjektID', type: 'INT', pk: true },
            { name: 'Projektname', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON'],
      optionalKeywords: ['INNER', 'Mitarbeiter', 'MitarbeiterProjekte', 'Projekte', 'MitarbeiterID', 'ProjektID', 'Name', 'Projektname', '='],
      multipleJoins: true,
      hints: [
        'Du brauchst zwei JOINs: Mitarbeiter → MitarbeiterProjekte → Projekte',
        'Die Zwischentabelle verbindet die beiden Haupttabellen',
        'Dies ist eine typische n:m Beziehung',
      ],
    },
  },
  {
    id: 34,
    category: 'joins',
    joinType: 'advanced',
    title: 'Bestelldetails komplett',
    difficulty: 3,
    description: `
      <p>Erstelle eine <strong>vollständige Bestellübersicht</strong> mit:</p>
      <ul>
        <li>Kundenname</li>
        <li>Bestelldatum</li>
        <li>Produktbezeichnung</li>
        <li>Menge</li>
        <li>Einzelpreis</li>
      </ul>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Bestelldatum', type: 'DATE' },
          ],
        },
        {
          name: 'Bestellpositionen',
          columns: [
            { name: 'BestellID', type: 'INT', fk: true },
            { name: 'ProduktID', type: 'INT', fk: true },
            { name: 'Menge', type: 'INT' },
            { name: 'Einzelpreis', type: 'DECIMAL(10,2)' },
          ],
        },
        {
          name: 'Produkte',
          columns: [
            { name: 'ProduktID', type: 'INT', pk: true },
            { name: 'Bezeichnung', type: 'VARCHAR(100)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON'],
      optionalKeywords: ['INNER', 'Kunden', 'Bestellungen', 'Bestellpositionen', 'Produkte', 'KundenID', 'BestellID', 'ProduktID', '='],
      multipleJoins: true,
      hints: [
        'Du brauchst 3 JOINs um alle 4 Tabellen zu verbinden',
        'Kunden → Bestellungen → Bestellpositionen → Produkte',
        'Wähle die benötigten Spalten aus allen Tabellen aus',
      ],
    },
  },
  {
    id: 35,
    category: 'joins',
    joinType: 'advanced',
    title: 'Top-Kunden finden',
    difficulty: 3,
    description: `
      <p>Finde die <strong>Kunden mit dem höchsten Gesamtumsatz</strong>.</p>
      <p>Sortiere absteigend nach Umsatz.</p>
    `,
    schema: {
      tables: [
        {
          name: 'Kunden',
          columns: [
            { name: 'KundenID', type: 'INT', pk: true },
            { name: 'Vorname', type: 'VARCHAR(50)' },
            { name: 'Nachname', type: 'VARCHAR(50)' },
          ],
        },
        {
          name: 'Bestellungen',
          columns: [
            { name: 'BestellID', type: 'INT', pk: true },
            { name: 'KundenID', type: 'INT', fk: true },
            { name: 'Gesamtbetrag', type: 'DECIMAL(10,2)' },
          ],
        },
      ],
    },
    validation: {
      requiredKeywords: ['SELECT', 'FROM', 'JOIN', 'ON', 'SUM', 'GROUP BY', 'ORDER BY', 'DESC'],
      optionalKeywords: ['INNER', 'LEFT', 'Kunden', 'Bestellungen', 'KundenID', 'Gesamtbetrag', 'Vorname', 'Nachname', '='],
      hints: [
        'SUM(Gesamtbetrag) berechnet den Umsatz pro Kunde',
        'GROUP BY gruppiert nach Kunde',
        'ORDER BY ... DESC sortiert absteigend',
      ],
    },
  },
]
