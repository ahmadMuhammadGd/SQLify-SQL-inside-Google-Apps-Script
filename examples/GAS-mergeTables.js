// This script performs data merging and rewriting operations in a Google Sheets spreadsheet.
const config = {
    AgeSrcRange: {
        firstRow: 7,
        firstCol: 2,
        lastCol: 4
    },
    AgeDestRange: {
        firstRow: 7,
        firstCol: 6,
        lastCol: 7
    }
}

// Function to rewrite data in a specified range of a sheet
function rewriteData(sheetObject, data2d, tableConfig) {
    console.log(data2d);

    // Calculate dimensions of the data to write
    const row_N = data2d.length;
    const col_N = data2d[0].length;

    // Define parameters for writing data
    const writeRangeParams = [
        tableConfig.firstRow, // First row to start writing
        tableConfig.firstCol, // First column to start writing
        row_N,                // Number of rows to write
        col_N                 // Number of columns to write
    ];

    console.log(row_N, col_N, writeRangeParams);

    // Define parameters for clearing old data
    const clearRangeParams = [
        tableConfig.firstRow,                          // First row to start clearing
        tableConfig.firstCol,                          // First column to start clearing
        sheetObject.getLastRow() - tableConfig.firstRow, // Number of rows to clear
        col_N                                           // Number of columns to clear
    ];

    // Get range objects for clearing and writing data
    const rangeClear = sheetObject.getRange(...clearRangeParams);
    const rangeWrite = sheetObject.getRange(...writeRangeParams);

    // Clear old data and set new data in the sheet
    rangeClear.clearContent(); // Clearing old data
    rangeWrite.setValues(data2d); // Setting new data
}

// Function to merge data from source and destination 2D arrays using SQL-like operations
function merge(src2DArray, dest2DArray) {
    const sqlify = new SQLify();

    // Load source and destination data into SQLify tables
    sqlify.load2DArrayAsTable('src', src2DArray);
    sqlify.load2DArrayAsTable('dest', dest2DArray);
    sqlify.load2DArrayAsTable('tempT', dest2DArray); // Temporary table for operations

    // SQL-like query to perform data merging operations
    const query1 = `
        -- Truncate temporary table
        TRUNCATE TABLE tempT;
  
        -- Insert updated rows into temporary table
        INSERT INTO tempT
        SELECT dest.id, src.Age
        FROM dest
        INNER JOIN src
        ON dest.id = src.id;
        
        -- Insert records from target table which do not exist in source table
        INSERT INTO tempT
        SELECT * FROM dest d
        WHERE d.id NOT IN (SELECT id FROM src);
  
        -- Insert records from source table which do not exist in target table 
        INSERT INTO tempT 
        SELECT * FROM src
        WHERE src.id NOT IN (SELECT id FROM dest);
    `;

    // Execute the SQL query
    sqlify.execSQL(query1);

    // Retrieve and return results from the temporary table
    const res = sqlify.execSQL('SELECT * FROM tempT;');
    return sqlify.getGASfriendlyResults(res);
}

// Function to read data from specified ranges in the sheet
function readData(sheetObject) {
    // Function to break down configuration and calculate range parameters
    const breakConfig = (sheetObject, rangeKey) => {
        const lastRow = sheetObject.getLastRow();
        const selectedConfig = config[rangeKey];
        return [
            selectedConfig.firstRow,                           // First row of the range
            selectedConfig.firstCol,                           // First column of the range
            lastRow - selectedConfig.firstRow + 1,             // Number of rows in the range
            selectedConfig.lastCol - selectedConfig.firstCol + 1 // Number of columns in the range
        ];
    };

    // Read data from specified ranges using configuration
    return {
        sourceData: sheetObject.getRange(...breakConfig(sheetObject, 'AgeSrcRange')).getValues(),
        destData: sheetObject.getRange(...breakConfig(sheetObject, 'AgeDestRange')).getValues()
    };
}

// Main function to execute the entire process
function main() {
    const sheetName = "Sheet1";
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);

    // Check if the sheet exists; throw error if not
    if (!sheet) {
        Logger.log(`Sheet ${sheetName} doesn't exist.`);
        throw new Error("Sheet does not exist");
    }

    // Read data from the sheet
    const extracted = readData(sheet);
    const srcData = extracted.sourceData;
    const destData = extracted.destData;

    // Merge source and destination data using SQL-like operations
    const result = merge(srcData, destData);

    // Rewrite merged data into the destination range
    rewriteData(sheet, result, config.AgeDestRange);
}
