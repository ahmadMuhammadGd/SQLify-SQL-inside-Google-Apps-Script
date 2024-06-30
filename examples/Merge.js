//remove this line if you run this example with appscript
//use only when using node js
import '../src/entry.js'

var sourceTable = [
  { id: 1, Age: 25 },
  { id: 2, Age: 30 },
  { id: 4, Age: 30 },
];

var destinationTable = [
  {id: 1, Age:50}
];


const sqlify = new SQLify();
sqlify.loadJsonAsTable('src', sourceTable);
sqlify.loadJsonAsTable('dest', destinationTable);
sqlify.loadJsonAsTable('tempT', destinationTable);

const query1 = `
    -- truncating temp table
    TRUNCATE TABLE tempT;

    -- insert updated rows into temp table
    INSERT INTO tempT
    SELECT dest.id, src.Age
    FROM dest
    INNER JOIN src
    ON dest.id = src.id;
    
    -- insert records from target table which does not exists in source table
    INSERT INTO tempT
    SELECT * FROM dest d
    WHERE d.id NOT IN (SELECT id FROM src);

    -- insert records from source table which does not exists in target table 
    INSERT INTO tempT 
    SELECT * FROM src
    WHERE src.id NOT IN (SELECT id FROM dest);
    `;

sqlify.execSQL(query1);
const res = sqlify.execSQL('SELECT * FROM tempT;');
const GASfriendly = sqlify.getGASfriendlyResults(res)
console.log(GASfriendly)