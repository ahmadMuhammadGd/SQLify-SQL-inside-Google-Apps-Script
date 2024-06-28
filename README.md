
# SQLify-AppsScript
<p align="center">
  <img src="assets/logo/logo.jpg" alt="SQLify for Apps Script Logo">
</p>

## Introduction
Handling data manipulation tasks in vanilla JavaScript can be cumbersome, often leading to debugging challenges and error-prone code. SQLify for Apps Script simplifies these tasks by bringing the power of SQL to data manipulation and management within Google Apps Script environments.

## Features
- **SQL Power**: Execute SQL queries directly within Google Apps Script using AlaSQL, enhancing data querying and manipulation capabilities.
- **Simplified Workflow**: Provides intuitive functions for converting data between formats and executing SQL queries effortlessly.

## Database Engine
SQLify for Apps Script utilizes AlaSQL as its database engine, extending its functionality with additional methods tailored for Apps Script workflows.

> **Important**: Before usage, ensure compatibility with [supported AlaSQL statements](https://github.com/alasql/alasql/wiki/Supported-SQL-statements).

## Setting Up

### Installation
1. Copy the contents of `./dist/bundle.js` into your Apps Script project's module or code editor.

### Usage
Instantiate `SQLify`:
  ```javascript
  const sqlify = new SQLify();
  ```

## Provided Methods

In Google Apps Script, data often originates from Google Sheets in a tabular format, like this:

|   | Name     | Age  |
|---|----------|------|
| 1 | Alex     | 15   |
| 2 | Bob      | 25   |
| 3 | Alice    | 10   |
| 4 | John     | 20   |
| 5 | Doe      | 18   |

When fetched in Apps Script, this data appears as a 2D array:

```plaintext
[['name', 'age'],
['alex', 15],
['bob', 25],
['alice', 10],
['john', 20],
['doe', 18]]
```

However, for operations with AlaSQL, this format may not be directly suitable.

#### Convert 2D Array to Key-Value Pairs

```javascript
sqlify.tableModule.get_table(Array2D);
```

- **Functionality**: Converts a 2D array representing tabular data into an array of objects where each object represents a row with column names as keys.
```javascript
// output example
[
  { name: 'alex', age: 15 },
  { name: 'bob', age: 25 },
  { name: 'alice', age: 10 },
  { name: 'john', age: 20 },
  { name: 'doe', age: 18 }
]
```
#### Convert Key-Value Pairs to 2D Array

```javascript
sqlify.tableModule.get_array(KeyValueArray);
```

- **Functionality**: Converts an array of objects (where each object represents a row with keys as column names) back into a 2D array format suitable for processing with AlaSQL.

#### Execute SQL Queries

```javascript
sqlify.alasqlInstance(query, [KeyValueArray]);
```

- **Functionality**: Executes SQL queries using AlaSQL, with data provided in the format converted by `get_table`. The query results are transformed back into a 2D array using `get_array`.

### Example Usage

```javascript
// Google Apps Script Example
function main(){
  let data = [
      ['name', 'age'],
      ['alex', 15],
      ['bob', 25],
      ['alice', 10],
      ['john', 20],
      ['doe', 18],
  ];

  const sqlify = new SQLify();
  const tableData = sqlify.tableModule.get_table(data);

  const query = `
      SELECT * FROM ? AS members
      WHERE members.age > 18;
  `;

  const result = sqlify.alasqlInstance(query, [tableData]);
  const result2DArray = sqlify.tableModule.get_array(result);

  console.log(`Result:`);
  console.log(result);
  console.log(`result2DArray:`);
  console.log(result2DArray);
  }
  // result:
  //  [ { name: 'bob', age: 25 }, { name: 'john', age: 20 } ]
  //
  // result2DArray:
  //  [ [ 'name', 'age' ], [ 'bob', 25 ], [ 'john', 20 ] ]
```
