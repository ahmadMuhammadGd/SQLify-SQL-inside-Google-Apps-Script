//remove this line if you run this example with appscript
//use only when using node js
import './dist/bundle.js'

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