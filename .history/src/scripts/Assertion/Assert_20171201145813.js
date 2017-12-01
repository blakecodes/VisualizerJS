/**
 * @name Assertion V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This class is developed to provide Unit Testing on a basic level
 * with Javascript
 * 
 * This frameworks primary functions include form building and data binding. 
 */
class Assert {
    /**
     * Check if the value is a string
     * @param {string} arg 
     */
    isString(arg) {
        return typeof arg === 'string' ? true : false;
    }

    /**
     * Check if the value is a number
     * @param {number} arg 
     */
    isNumber(arg) {
        return typeof arg === 'number' ? true : false;
    }

    /**
     * Check if the value is a boolean
     * @param {boolean} arg 
     */
    isBoolean(arg) {
        return typeof arg === 'boolean' ? true : false;
    }

    /**
     * Check if the value is true
     * @param {boolean} arg 
     */
    isTrue(arg) {
        return arg === true ? true : false;
    }

    /**
     * Check if the value is false
     * @param {boolean} arg 
     */
    isFalse(arg) {
        return arg === false ? true : false;
    }
}

export default Assertion;