import InputValidator from './InputValidator.js';
import ArrayUtils from './arrayUtils.js';

export default class Table {
    constructor() {
        this.validator = new InputValidator();
        this.arrUtils = new ArrayUtils();
    }

    get_table(arr) {
        if (!this.validator.is2DArray(arr) || !this.validator.isValidArray(arr)) {
            console.log(`invalid array:`, arr);
            throw new Error('Invalid array');
        }

        const cleanedArr = this.arrUtils.removeEmptyArrays(arr);

        const headers = cleanedArr[0];
        const content = cleanedArr.slice(1);

        if (!this.validator.is2DArray(content)) {
            return [headers];
        }

        return content.map(row => {
            let dict_row = {};
            headers.forEach((header, i) => {
                dict_row[header] = row[i];
            });
            return dict_row;
        });
    }

    get_array(dict) {
        if (!this.validator.isValidTable(dict)) {
            console.log(`Invalid Table:`, dict);
            throw new Error('invalid table')
        }

        const headers = Object.keys(dict[0]);
        const content = dict.map(row => Object.values(row));

        return [headers, ...content];
    }
}