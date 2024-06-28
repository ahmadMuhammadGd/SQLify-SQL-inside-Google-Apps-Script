import Table from "./getTables.js";
import alasql from 'alasql';

export default class SQLify {
    constructor() {
        this.tableModule = new Table();
        this.alasqlInstance = alasql;
    }
};