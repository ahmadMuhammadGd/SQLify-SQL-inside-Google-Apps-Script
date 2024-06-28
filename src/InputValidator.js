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

  isValidTable(dict) {
    return  typeof dict === 'object' && 
            dict !== null && 
            Object.keys(dict).length > 0;
  }
}


