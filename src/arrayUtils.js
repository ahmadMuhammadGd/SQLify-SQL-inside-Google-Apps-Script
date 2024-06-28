import InputValidator from "./InputValidator.js";

// this class hasn't been integrated yet 
export default class ArrayUtils{
    constructor()
    {
        this.validator = new InputValidator();
    }

    removeEmptyArrays(array2D) {
        if (this.validator.is2DArray(array2D)) {
      
          return array2D.filter(row => !row.every(cell => 
          ((cell === "" )|| (cell == true )|| (cell == false))
          ));
      
        }
        else {
          throw new Error(`Input is not a valid 2D array\nInput Array:${array2D}`);
        }
      }
}
