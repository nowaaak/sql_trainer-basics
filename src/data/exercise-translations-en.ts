import type { ExerciseTranslationMap } from './types'

export const exerciseTranslationsEn: ExerciseTranslationMap = {
  1: {
    title: 'Create table - Customers',
    description: `
      <p>Create a table <strong>Kunden</strong> with the following columns:</p>
      <ul>
        <li><code>KundenID</code> - integer, primary key, auto-increment</li>
        <li><code>Vorname</code> - text (50 characters)</li>
        <li><code>Nachname</code> - text (50 characters)</li>
        <li><code>Email</code> - text (100 characters)</li>
      </ul>
    `,
    hints: [
      'Start with CREATE TABLE followed by the table name',
      'Do not forget to define the primary key',
      'Use the correct data types: INT for IDs, VARCHAR for text',
      'AUTO_INCREMENT is used for automatically increasing IDs',
    ],
  },
  2: {
    title: 'Create table - Products',
    description: `
      <p>Create a table <strong>Produkte</strong> with:</p>
      <ul>
        <li><code>ProduktID</code> - integer, primary key</li>
        <li><code>Bezeichnung</code> - text (100 characters), NOT NULL</li>
        <li><code>Preis</code> - decimal number (10,2)</li>
        <li><code>Lagerbestand</code> - integer, default: 0</li>
      </ul>
    `,
    hints: [
      'DECIMAL(10,2) allows 10 total digits with 2 decimal places',
      'NOT NULL prevents empty values',
      'DEFAULT sets a value when nothing is provided',
    ],
  },
  3: {
    title: 'Add column',
    description: `
      <p>Add a new column <code>Telefon</code> to the existing table <strong>Kunden</strong>.</p>
      <p>The column should store text up to 20 characters.</p>
    `,
    hints: [
      'ALTER TABLE is used to change table structures',
      'ADD adds a new column',
      'Do not forget the data type',
    ],
  },
  4: {
    title: 'Drop column',
    description: `
      <p>Remove the column <code>Fax</code> from the table <strong>Lieferanten</strong>.</p>
    `,
    hints: [
      'ALTER TABLE is used to change table structures',
      'DROP removes a column or table',
      'The COLUMN keyword is optional',
    ],
  },
  5: {
    title: 'Rename / modify column',
    description: `
      <p>Change the data type of the column <code>Gehalt</code> in the table <strong>Mitarbeiter</strong> from INT to DECIMAL(10,2).</p>
    `,
    hints: [
      'ALTER TABLE ... MODIFY COLUMN changes a column type',
      'DECIMAL(10,2) is recommended for money values',
      'Depending on the SQL dialect: MODIFY COLUMN or ALTER COLUMN',
    ],
  },
  6: {
    title: 'Insert row',
    description: `
      <p>Insert a new customer into the table <strong>Kunden</strong>:</p>
      <ul>
        <li>Vorname: Max</li>
        <li>Nachname: Mustermann</li>
        <li>Email: max@example.com</li>
      </ul>
      <p><em>Note: KundenID is assigned automatically (AUTO_INCREMENT).</em></p>
    `,
    hints: [
      'INSERT INTO table_name ... VALUES ...',
      'With AUTO_INCREMENT you do not need to provide the ID',
      'Text values must be wrapped in quotes',
      'You can list columns explicitly: INSERT INTO table (column1, column2) VALUES ...',
    ],
  },
  7: {
    title: 'Update row',
    description: `
      <p>Update the email address of the customer with <strong>KundenID = 5</strong>.</p>
      <p>The new email should be <code>neue.email@example.com</code>.</p>
    `,
    hints: [
      'UPDATE table_name SET column = value WHERE condition',
      'IMPORTANT: Without WHERE, ALL rows will be changed',
      'The WHERE clause filters the target row',
    ],
  },
  8: {
    title: 'Delete row',
    description: `
      <p>Delete the customer with <strong>KundenID = 10</strong> from the table <strong>Kunden</strong>.</p>
    `,
    hints: [
      'DELETE FROM table_name WHERE condition',
      'IMPORTANT: Without WHERE, ALL rows will be deleted',
      'Check the WHERE condition carefully',
    ],
  },
  9: {
    title: 'Update multiple values',
    description: `
      <p>Update the following values for the product with <strong>ProduktID = 3</strong>:</p>
      <ul>
        <li>Preis to <code>29.99</code></li>
        <li>Lagerbestand to <code>100</code></li>
      </ul>
    `,
    hints: [
      'Separate multiple columns with commas: SET column1 = value1, column2 = value2',
      'Do not forget the WHERE condition',
      'Write decimal numbers with a dot: 29.99',
    ],
  },
  10: {
    title: 'Query all data',
    description: `
      <p>Query <strong>all columns</strong> for all customers from the table <strong>Kunden</strong>.</p>
    `,
    hints: [
      'SELECT chooses columns',
      '* stands for all columns',
      'FROM specifies the table',
    ],
  },
  11: {
    title: 'Query specific columns',
    description: `
      <p>Query only <strong>Vorname</strong> and <strong>Nachname</strong> for all customers.</p>
    `,
    hints: [
      'List columns separated by commas',
      'Do not use * here - specify the exact columns',
      'Order: SELECT columns FROM table',
    ],
  },
  12: {
    title: 'WHERE condition',
    description: `
      <p>Query all products whose <strong>Preis is greater than 50</strong>.</p>
    `,
    hints: [
      'WHERE filters the result set',
      'Use the > operator for "greater than"',
      'Numbers are written without quotes',
    ],
  },
  13: {
    title: 'Multiple conditions (AND)',
    description: `
      <p>Query all products whose <strong>Preis is between 10 and 50</strong> (inclusive).</p>
      <p>Use AND to combine the conditions.</p>
    `,
    hints: [
      'AND combines two conditions (both must be true)',
      'Use >= and <= for inclusive comparisons',
      'Alternative: BETWEEN ... AND ... also works',
    ],
  },
  14: {
    title: 'LIKE operator',
    description: `
      <p>Query all customers whose <strong>Nachname starts with "M"</strong>.</p>
    `,
    hints: [
      'LIKE enables pattern matching in text',
      '% is a wildcard for any number of characters',
      '"M%" finds everything that starts with M',
    ],
  },
  15: {
    title: 'BETWEEN operator',
    description: `
      <p>Query all orders whose <strong>Bestelldatum is between 2024-01-01 and 2024-12-31</strong>.</p>
    `,
    hints: [
      'BETWEEN ... AND ... checks a value range',
      'Date format: YYYY-MM-DD (for example 2024-01-01)',
      'BETWEEN includes both boundary values',
    ],
  },
  16: {
    title: 'Aggregate function COUNT',
    description: `
      <p>Count the <strong>number of all customers</strong> in the table.</p>
    `,
    hints: [
      'COUNT() counts rows',
      'COUNT(*) counts all rows',
      'COUNT(column) counts only rows where the column is not NULL',
    ],
  },
  17: {
    title: 'Aggregate function SUM',
    description: `
      <p>Calculate the <strong>sum of all Gesamtbetrag values</strong> in the orders table.</p>
    `,
    hints: [
      'SUM() adds all values in a column',
      'SUM(column) calculates the sum of the given column',
      'Aggregate functions are used inside SELECT',
    ],
  },
  18: {
    title: 'Aggregate function AVG',
    description: `
      <p>Calculate the <strong>average price</strong> of all products.</p>
    `,
    hints: [
      'AVG() calculates the average',
      'AVG(column) requires a numeric column',
      'NULL values are ignored by AVG',
    ],
  },
  19: {
    title: 'Arithmetic operators',
    description: `
      <p>Calculate the <strong>gross price</strong> for each product (Preis + 19% VAT).</p>
      <p>Show Bezeichnung and the calculated gross price.</p>
    `,
    hints: [
      'You can calculate directly in SELECT: Preis * 1.19',
      'Or: Preis + (Preis * 0.19)',
      'Use AS to name the calculated result',
    ],
  },
  20: {
    title: 'INNER JOIN - Basics',
    description: `
      <p>Connect the tables <strong>Bestellungen</strong> and <strong>Kunden</strong>.</p>
      <p>Show all orders together with the matching customer names (<code>Vorname</code>, <code>Nachname</code>).</p>
    `,
    hints: [
      'INNER JOIN connects two tables through a shared column',
      'Syntax: table1 JOIN table2 ON table1.column = table2.column',
      'KundenID is the foreign key that links the tables',
    ],
  },
  21: {
    title: 'LEFT JOIN',
    description: `
      <p>Show <strong>all customers</strong> together with their orders.</p>
      <p>Customers <strong>without orders</strong> must also be shown.</p>
    `,
    hints: [
      'LEFT JOIN keeps all rows from the left table',
      'Even if there is no matching row in the right table',
      'Kunden must be on the left side (FROM Kunden LEFT JOIN Bestellungen)',
    ],
  },
  22: {
    title: 'RIGHT JOIN',
    description: `
      <p>Show <strong>all orders</strong> with the matching customer data.</p>
      <p>Orders from deleted customers should still appear.</p>
    `,
    hints: [
      'RIGHT JOIN keeps all rows from the right table',
      'Even if there is no matching row in the left table',
      'Bestellungen must be on the right side',
    ],
  },
  23: {
    title: 'JOIN with condition',
    description: `
      <p>Show all orders from the <strong>year 2024</strong> together with customer names.</p>
      <p>Join Bestellungen and Kunden and filter by Bestelldatum.</p>
    `,
    hints: [
      'First JOIN, then WHERE for the filter',
      'For year-based filtering: YEAR(Bestelldatum) = 2024',
      'Or: Bestelldatum BETWEEN "2024-01-01" AND "2024-12-31"',
    ],
  },
  24: {
    title: 'Multiple JOINs',
    description: `
      <p>Show for each order item: <strong>customer name, product name, and quantity</strong>.</p>
      <p>You need to connect three tables.</p>
    `,
    hints: [
      'You need several JOINs in sequence',
      'Bestellpositionen connects Bestellungen with Produkte',
      'Path: Kunden -> Bestellungen -> Bestellpositionen -> Produkte',
      'Each JOIN needs its own ON condition',
    ],
  },
  25: {
    title: 'JOIN with aliases',
    description: `
      <p>Connect <strong>Mitarbeiter</strong> and <strong>Abteilungen</strong>.</p>
      <p>Use aliases (<code>m</code> for Mitarbeiter, <code>a</code> for Abteilungen).</p>
      <p>Show: employee name and department name.</p>
    `,
    hints: [
      'Aliases are defined after the table name: FROM Mitarbeiter m',
      'You can use AS or leave it out: Mitarbeiter AS m or Mitarbeiter m',
      'Use aliases when referencing columns: m.Name, a.Abteilungsname',
    ],
  },
  26: {
    title: 'Self JOIN',
    description: `
      <p>Find all <strong>employees together with their managers</strong>.</p>
      <p>The table contains a column <code>VorgesetzterID</code> that points to another Mitarbeiter row.</p>
      <p>Show: employee name and manager name.</p>
    `,
    hints: [
      'A self JOIN connects a table with itself',
      'You need different aliases for the same table',
      'Example: FROM Mitarbeiter m JOIN Mitarbeiter v ON m.VorgesetzterID = v.MitarbeiterID',
    ],
  },
  27: {
    title: 'LEFT JOIN with NULL check',
    description: `
      <p>Find all <strong>customers who have never placed an order</strong>.</p>
      <p>Use LEFT JOIN and check for NULL in the orders table.</p>
    `,
    hints: [
      'LEFT JOIN keeps all customers, even without orders',
      'Customers without orders will have NULL in the order columns',
      'Check with: WHERE Bestellungen.BestellID IS NULL',
    ],
  },
  28: {
    title: 'JOIN with aggregation',
    description: `
      <p>Show the <strong>number of orders for each customer</strong>.</p>
      <p>Customers without orders should still be shown as 0.</p>
    `,
    hints: [
      'Use LEFT JOIN so customers without orders still appear',
      'COUNT() counts the orders per customer',
      'GROUP BY groups the result by customer',
    ],
  },
  29: {
    title: 'JOIN with SUM',
    description: `
      <p>Calculate the <strong>total revenue per customer</strong>.</p>
      <p>Show the customer name and the sum of all order amounts.</p>
    `,
    hints: [
      'SUM(Gesamtbetrag) adds up all order amounts',
      'GROUP BY groups by customer',
      'JOIN connects customers with their orders',
    ],
  },
  30: {
    title: 'Products without orders',
    description: `
      <p>Find all <strong>products that have never been ordered</strong>.</p>
    `,
    hints: [
      'LEFT JOIN keeps all products, even without order items',
      'Products without orders will have NULL in Bestellpositionen',
      'WHERE ... IS NULL filters the unordered products',
    ],
  },
  31: {
    title: 'Suppliers and products',
    description: `
      <p>Show all <strong>products together with their supplier name</strong>.</p>
    `,
    hints: [
      'JOIN connects Produkte with Lieferanten through LieferantID',
      'SELECT the required columns from both tables',
      'ON defines the join condition',
    ],
  },
  32: {
    title: 'Employees and projects',
    description: `
      <p>Show all <strong>employees together with their assigned projects</strong>.</p>
      <p>The relationship is stored in a linking table <code>MitarbeiterProjekte</code>.</p>
    `,
    hints: [
      'You need two JOINs: Mitarbeiter -> MitarbeiterProjekte -> Projekte',
      'The linking table connects the two main tables',
      'This is a typical many-to-many relationship',
    ],
  },
  33: {
    title: 'Count categories and products',
    description: `
      <p>Show each <strong>category together with the number of its products</strong>.</p>
      <p>Categories without products should still appear as 0.</p>
    `,
    hints: [
      'Use LEFT JOIN so categories without products still appear',
      'COUNT(ProduktID) counts only existing products (not NULL)',
      'Use GROUP BY for the category grouping',
    ],
  },
  34: {
    title: 'Complete order details',
    description: `
      <p>Create a <strong>complete order overview</strong> with:</p>
      <ul>
        <li>customer name</li>
        <li>order date</li>
        <li>product name</li>
        <li>quantity</li>
        <li>unit price</li>
      </ul>
    `,
    hints: [
      'You need 3 JOINs to connect all 4 tables',
      'Path: Kunden -> Bestellungen -> Bestellpositionen -> Produkte',
      'Select the required columns from each table',
    ],
  },
  35: {
    title: 'Find top customers',
    description: `
      <p>Find the <strong>customers with the highest total revenue</strong>.</p>
      <p>Sort the result by revenue in descending order.</p>
    `,
    hints: [
      'SUM(Gesamtbetrag) calculates the revenue per customer',
      'GROUP BY groups by customer',
      'ORDER BY ... DESC sorts descending',
    ],
  },
  36: {
    title: 'Create table - Orders',
    description: `
      <p>Create a table <strong>Bestellungen</strong> with:</p>
      <ul>
        <li><code>BestellID</code> - integer, primary key, auto-increment</li>
        <li><code>KundenID</code> - integer, foreign key referencing <strong>Kunden(KundenID)</strong></li>
        <li><code>Bestelldatum</code> - date, NOT NULL</li>
        <li><code>Gesamtbetrag</code> - decimal number (10,2), default: 0</li>
      </ul>
    `,
    hints: [
      'Define the columns and data types first',
      'Do not forget PRIMARY KEY for BestellID',
      'FOREIGN KEY (KundenID) REFERENCES Kunden(KundenID)',
    ],
  },
  37: {
    title: 'Create table - Order items',
    description: `
      <p>Create a table <strong>Bestellpositionen</strong> with:</p>
      <ul>
        <li><code>BestellID</code> - integer, foreign key referencing Bestellungen</li>
        <li><code>ProduktID</code> - integer, foreign key referencing Produkte</li>
        <li><code>Menge</code> - integer, NOT NULL</li>
      </ul>
      <p>Use a <strong>composite primary key</strong> made of BestellID and ProduktID.</p>
    `,
    hints: [
      'Composite key: PRIMARY KEY (BestellID, ProduktID)',
      'Each foreign key needs a REFERENCES target table',
      'Define all columns before the constraints',
    ],
  },
  38: {
    title: 'Drop table',
    description: `
      <p>Delete the table <strong>Archiv</strong> if it exists.</p>
    `,
    hints: [
      'DROP TABLE removes a table completely',
      'IF EXISTS avoids errors if the table does not exist',
    ],
  },
  39: {
    title: 'Insert multiple rows',
    description: `
      <p>Insert three products into the table <strong>Produkte</strong>:</p>
      <ul>
        <li>Tastatur, 49.99, Lagerbestand 25</li>
        <li>Maus, 19.99, Lagerbestand 60</li>
        <li>Monitor, 179.99, Lagerbestand 10</li>
      </ul>
    `,
    hints: [
      'You can insert multiple rows with one INSERT using several VALUES groups',
      'Text values need quotes',
      'The order of values must match the column list',
    ],
  },
  40: {
    title: 'Insert row with column list',
    description: `
      <p>Insert one order:</p>
      <ul>
        <li>KundenID: 2</li>
        <li>Bestelldatum: 2024-06-15</li>
        <li>Gesamtbetrag: 199.90</li>
      </ul>
      <p>Use a <strong>column list</strong> in the INSERT statement.</p>
    `,
    hints: [
      'Column list: INSERT INTO Bestellungen (KundenID, Bestelldatum, Gesamtbetrag)',
      'Dates use the format YYYY-MM-DD',
      'Numbers are written without quotes',
    ],
  },
  41: {
    title: 'Increase price by percentage',
    description: `
      <p>Increase the <strong>Preis of all products</strong> in category 2 by 10%.</p>
    `,
    hints: [
      'UPDATE Produkte SET Preis = Preis * 1.1',
      'Use WHERE KategorieID = 2 to limit the update',
      'Without WHERE, all products would be changed',
    ],
  },
  42: {
    title: 'Delete old orders',
    description: `
      <p>Delete all orders that are <strong>before 2024-01-01</strong>.</p>
    `,
    hints: [
      'DELETE FROM Bestellungen WHERE Bestelldatum < ...',
      'Dates use the format YYYY-MM-DD',
      'Pay attention to the WHERE condition',
    ],
  },
  43: {
    title: 'INNER JOIN - Products and categories',
    description: `
      <p>Join <strong>Produkte</strong> with <strong>Kategorien</strong>.</p>
      <p>Show the product name and the category name.</p>
    `,
    hints: [
      'INNER JOIN only returns matching rows',
      'ON Produkte.KategorieID = Kategorien.KategorieID',
      'SELECT the required columns from both tables',
    ],
  },
  44: {
    title: 'INNER JOIN - Orders and items',
    description: `
      <p>Show all <strong>Bestellpositionen</strong> together with the matching <strong>BestellID</strong>.</p>
      <p>Join <strong>Bestellungen</strong> and <strong>Bestellpositionen</strong> using INNER JOIN.</p>
    `,
    hints: [
      'Use INNER JOIN on BestellID',
      'FROM Bestellungen INNER JOIN Bestellpositionen',
      'SELECT the required columns',
    ],
  },
  45: {
    title: 'INNER JOIN - Orders in 2024',
    description: `
      <p>Show all <strong>orders from the year 2024</strong> together with customer names.</p>
      <p>Join Kunden and Bestellungen using INNER JOIN and filter by date.</p>
    `,
    hints: [
      'INNER JOIN Kunden <-> Bestellungen',
      'Filter with WHERE Bestelldatum ... 2024',
      'Example: BETWEEN 2024-01-01 AND 2024-12-31',
    ],
  },
  46: {
    title: 'INNER JOIN - Employees in Sales',
    description: `
      <p>Show all <strong>employees from the department "Vertrieb"</strong>.</p>
      <p>Join Mitarbeiter and Abteilungen using INNER JOIN and filter by department name.</p>
    `,
    hints: [
      'INNER JOIN Mitarbeiter <-> Abteilungen',
      'WHERE Abteilungsname = \'Vertrieb\'',
      'SELECT for example Name and Abteilungsname',
    ],
  },
  47: {
    title: 'INNER JOIN - Suppliers from Berlin',
    description: `
      <p>Show all <strong>products from suppliers in Berlin</strong>.</p>
      <p>Join Lieferanten and Produkte using INNER JOIN.</p>
    `,
    hints: [
      'Use INNER JOIN on LieferantID',
      'Filter with WHERE Stadt = \'Berlin\'',
      'SELECT the required columns',
    ],
  },
  48: {
    title: 'INNER JOIN - Items with quantity >= 5',
    description: `
      <p>Show all <strong>order items</strong> with Menge >= 5.</p>
      <p>Join Bestellpositionen and Produkte using INNER JOIN.</p>
    `,
    hints: [
      'INNER JOIN Bestellpositionen <-> Produkte',
      'WHERE Menge >= 5',
      'SELECT for example Bezeichnung and Menge',
    ],
  },
  49: {
    title: 'LEFT JOIN - Suppliers with products',
    description: `
      <p>Show all <strong>Lieferanten</strong> and their <strong>Produkte</strong>.</p>
      <p>Suppliers without products should still appear.</p>
    `,
    hints: [
      'LEFT JOIN keeps all Lieferanten, even without products',
      'Lieferanten must be on the left side',
      'ON Lieferanten.LieferantID = Produkte.LieferantID',
    ],
  },
  50: {
    title: 'LEFT JOIN - Categories with products',
    description: `
      <p>Show all <strong>Kategorien</strong> together with their products.</p>
      <p>Categories without products should still appear.</p>
    `,
    hints: [
      'LEFT JOIN: Kategorien on the left, Produkte on the right',
      'ON Kategorien.KategorieID = Produkte.KategorieID',
      'That way categories without products still appear',
    ],
  },
  51: {
    title: 'LEFT JOIN - Employees without projects',
    description: `
      <p>Find all <strong>employees without a project assignment</strong>.</p>
      <p>Use LEFT JOIN and check for NULL in the linking table.</p>
    `,
    hints: [
      'LEFT JOIN Mitarbeiter -> MitarbeiterProjekte',
      'Employees without projects will have NULL in the linking table',
      'WHERE MitarbeiterProjekte.ProjektID IS NULL',
    ],
  },
  52: {
    title: 'LEFT JOIN - Orders without items',
    description: `
      <p>Find all <strong>orders without order items</strong>.</p>
      <p>Use LEFT JOIN and check for NULL.</p>
    `,
    hints: [
      'LEFT JOIN Bestellungen -> Bestellpositionen',
      'Orders without items will have NULL values',
      'WHERE Bestellpositionen.PositionID IS NULL',
    ],
  },
  53: {
    title: 'LEFT JOIN - Customers with orders',
    description: `
      <p>Show all <strong>Kunden</strong> together with their orders.</p>
      <p>Customers without orders should still appear.</p>
    `,
    hints: [
      'LEFT JOIN keeps all customers',
      'ON Kunden.KundenID = Bestellungen.KundenID',
      'SELECT the required columns',
    ],
  },
  54: {
    title: 'RIGHT JOIN - Products and order items',
    description: `
      <p>Show all <strong>Bestellpositionen</strong> including product data.</p>
      <p>Use RIGHT JOIN so that every order item is included.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Bestellpositionen',
      'ON Produkte.ProduktID = Bestellpositionen.ProduktID',
      'That way all order items remain visible',
    ],
  },
  55: {
    title: 'RIGHT JOIN - Departments with employees',
    description: `
      <p>Show all <strong>Abteilungen</strong> together with their employees.</p>
      <p>Use RIGHT JOIN so that every department appears.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Abteilungen',
      'ON Mitarbeiter.AbteilungID = Abteilungen.AbteilungID',
      'That way all departments are kept',
    ],
  },
  56: {
    title: 'RIGHT JOIN - Orders with customers',
    description: `
      <p>Show all <strong>Bestellungen</strong> together with customer names.</p>
      <p>Use RIGHT JOIN so that every order is included.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Bestellungen',
      'ON Kunden.KundenID = Bestellungen.KundenID',
      'That way all orders remain visible',
    ],
  },
  57: {
    title: 'RIGHT JOIN - Products with suppliers',
    description: `
      <p>Show all <strong>Produkte</strong> together with supplier names.</p>
      <p>Use RIGHT JOIN so that every product appears.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Produkte',
      'ON Lieferanten.LieferantID = Produkte.LieferantID',
      'That way all products remain visible',
    ],
  },
  58: {
    title: 'RIGHT JOIN - Products with categories',
    description: `
      <p>Show all <strong>Produkte</strong> together with their categories.</p>
      <p>Use RIGHT JOIN so that every product is included.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Produkte',
      'ON Kategorien.KategorieID = Produkte.KategorieID',
      'That way all products remain visible',
    ],
  },
  59: {
    title: 'RIGHT JOIN - Projects with assignments',
    description: `
      <p>Show all <strong>Projekte</strong> together with their employee assignments.</p>
      <p>Use RIGHT JOIN so that every project appears.</p>
    `,
    hints: [
      'With RIGHT JOIN, the right table is Projekte',
      'ON MitarbeiterProjekte.ProjektID = Projekte.ProjektID',
      'That way all projects are kept',
    ],
  },
} as const
