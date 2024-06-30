export default class InputValidator {
  is2DArray(arr) {
    const itsAnArray = Array.isArray(arr);
    const itsA2DArray = Array.isArray(arr[0]);
    return itsAnArray && itsA2DArray;
  }

  isValidArray(arr) {
    if (this.is2DArray(arr)) {
      const odds = arr.filter(element => element.length !== arr[0].length);
      return odds.length === 0;
    }
    return false;
  }

  isValidTable(table) {
    const isDict = (dict) => {
      return typeof dict === 'object' &&  // Ensure object type
        !Array.isArray(dict) &&     // Ensure not an array
        dict !== null &&            // Ensure not null
        Object.keys(dict).length > 0; // Ensure has keys
    };

    if (Array.isArray(table) && table.length > 0) {
      let res = true;
      table.forEach(dict => {
        res = res && isDict(dict);
      });
      return res;
    }
    return false;
  }
}