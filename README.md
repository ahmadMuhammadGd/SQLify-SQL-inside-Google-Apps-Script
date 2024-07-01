# SQLify-AppsScript
<p align="center">
  <img src="assets/logo/logo.jpg" alt="SQLify for Apps Script Logo">
</p>

## Introduction
SQLify for Apps Script simplifies data manipulation tasks within Google Apps Script by integrating SQL capabilities. It allows you to handle data more efficiently, leveraging the power of SQL queries directly within your Apps Script projects.

## What is New
- **Enhanced Table Loading:** Improved methods for loading 2D arrays into SQL tables.
- **Improved Integration:** Streamlined integration with AlaSQL, ensuring seamless data operations within Apps Script workflows.
## Features
- **Efficient Data Handling**: Seamlessly manage and manipulate data using SQL queries in your Google Apps Script environment.
- **Data Validation**: Ensure data integrity with built-in validation for input data structures.

## Database Integration
SQLify utilizes AlaSQL as its SQL engine, extending its functionalities tailored specifically for Google Apps Script workflows.

> **Note**: Please ensure compatibility with [supported AlaSQL statements](https://github.com/alasql/alasql/wiki/Supported-SQL-statements) before usage.

## Getting Started

### Installation
1. Copy the contents of `./dist/bundle.js` into your Apps Script project's module or code editor.

### Usage
Initialize `SQLify` in your Apps Script:
```javascript
const sqlify = new SQLify();
```
Certainly! Here's an improved "Methods Provided" section for the README:

---

## Methods Provided

SQLify for Apps Script offers a range of methods to streamline data manipulation and SQL query execution within Google Apps Script environments:

### Loading Data into a SQL Table

#### `load2DArrayAsTable(tableName, array2D)`

Converts a 2D array of tabular data into a SQL table within AlaSQL.

- **Parameters:**
  - `tableName`: Name of the SQL table to create if not exists.
  - `array2D`: 2D array representing tabular data.

- **Usage Example:**
  ```javascript
  const data = [
      ['Name', 'Age'],
      ['Alex', 15],
      ['Bob', 25],
      ['Alice', 10],
      ['John', 20],
      ['Doe', 18],
  ];
  
  sqlify.load2DArrayAsTable('Members', data);
  ```

### Executing SQL Queries

#### `execSQL(query, params?)`

Executes an SQL query using AlaSQL, optionally with parameters for prepared statements.

- **Parameters:**
  - `query`: SQL query string.
  - `params` (optional): Parameters for prepared statements.

- **Returns:**
  - Query results.

- **Usage Example:**
  ```javascript
  const query = `
      SELECT * FROM Members
      WHERE Age > 18;
  `;
  
  const result = sqlify.execSQL(query);
  ```

### Converting Query Results to 2D Array

#### `getGASfriendlyResults(results)`

Converts AlaSQL query results into a 2D array format suitable for processing in Google Apps Script.

- **Parameters:**
  - `results`: Query results from AlaSQL.

- **Returns:**
  - 2D array formatted data.

- **Usage Example:**
  ```javascript
  const query = `
      SELECT * FROM Members
      WHERE Age > 18;
  `;
  
  const result = sqlify.execSQL(query);
  const result2DArray = sqlify.getGASfriendlyResults(result);
  ```

### Loading JSON Data into a SQL Table

#### `loadJsonAsTable(tableName, jsonData)`

Validates and loads JSON data into a SQL table within AlaSQL.

- **Parameters:**
  - `tableName`: Name of the SQL table to create or update.
  - `jsonData`: JSON object or array representing tabular data.

- **Usage Example:**
  ```javascript
  const jsonData = [
      { Name: 'Alex', Age: 15 },
      { Name: 'Bob', Age: 25 },
      { Name: 'Alice', Age: 10 },
      { Name: 'John', Age: 20 },
      { Name: 'Doe', Age: 18 },
  ];
  
  sqlify.loadJsonAsTable('Members', jsonData);
  ```

---


### Example Usage

```javascript
// Example usage in Google Apps Script
function main(){
  const data = [
      ['Name', 'Age'],
      ['Alex', 15],
      ['Bob', 25],
      ['Alice', 10],
      ['John', 20],
      ['Doe', 18],
  ];

  const sqlify = new SQLify();
  sqlify.load2DArrayAsTable('Members', data);

  const query = `
      SELECT * FROM Members
      WHERE Age > 18;
  `;

  const result = sqlify.execSQL(query);
  const result2DArray = sqlify.getGASfriendlyResults(result);

  console.log(`Query Result:`);
  console.log(result);
  console.log(`Formatted Result:`);
  console.log(result2DArray);
  // Output:
  // Query Result:
  // [ { Name: 'Bob', Age: 25 }, { Name: 'John', Age: 20 } ]
  //
  // Formatted Result:
  // [ ['Name', 'Age'], ['Bob', 25], ['John', 20] ]
}
```
## Contributing
We welcome contributions to SQLify! Feel free to contribute.
