//remove this line if you run this example with appscript
//use only when using node js
import '../src/entry.js'

let data = [
    ['name', 'age'],
    ['alex', 15],
    ['bob', 25],
    ['alice', 10],
    ['john', 20],
    ['doe', 18],
];

const sqlify = new SQLify();
sqlify.load2DArrayAsTable('example_table', data) //create the table if not exists

let query = `
    SELECT * FROM example_table AS members
    WHERE members.age > ?;

    SELECT * FROM example_table AS members
    WHERE members.name = ?;
`;

const result = sqlify.execSQL(query, [18, 'bob']); //parameters are optional
console.log(`\nResult:`);
console.log(result);

const result2DArray = sqlify.getGASfriendlyResults(result[1]) //getting GAS friendly output for the second result
console.log(`\nresult2DArray:`);
console.log(result2DArray);