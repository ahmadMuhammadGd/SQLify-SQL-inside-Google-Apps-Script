import Table from "./getTables.js";
import alasql from 'alasql';
import InputValidator from "./InputValidator.js";
export default class SQLify {
    constructor() {
        this.alasql = alasql;
    }

    load2DArrayAsTable(tableName, array2D){
        const tableHelper = new Table();
        const jsonData = tableHelper.get_table(array2D);
        this.loadJsonAsTable(tableName, jsonData);
    }

    loadJsonAsTable(tableName, jsonData){
        console.log(tableName, jsonData)
        
        const validator = new InputValidator();
        if (!validator.isValidTable(jsonData)){
            console.log(`the input:`, jsonData, `is not valid table.`)
            throw new Error("Invalid Table")
        }

        const columns = Object.keys(jsonData[0]).map(col => `${col} TEXT`).join(', ');
        const placeholders = Object.keys(jsonData[0]).map(() => '?').join(', ');
        
        this.alasql(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`);
        const insertStmt = this.alasql.compile(`INSERT INTO ${tableName} VALUES (${placeholders});`);
        
        jsonData.forEach(item => {
          insertStmt(Object.values(item));
        });
    }
    
    execSQL(query, params) {
        if (params) {
            return alasql(query, params);
        } else {
            return alasql(query);
        }
    }

    getGASfriendlyResults(results)
    {
        const tableHelper = new Table();
        return tableHelper.get_array(results);
    }
};