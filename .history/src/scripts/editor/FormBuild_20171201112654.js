/**
 * Form Builder V1.0
 * Designed and developed by Blake Connally under Sequoyah Technologies
 * This form builder was created to easily intertwine form creation with
 * AlpacaJS, Bootstrap and jQuery. Initially designed to solve the "no-framework"
 * event handling with forms. 
 * 
 * This frameworks primary functions include form building and data binding. 
 */
class FormBuild {
    apiService = new APIService();

    /**
     * General configuration implementation
     * @param {*} config 
     */
    constructor(config) {}

    /**
     * Initial form setup
     * @param {AlpacaJS Object} config
     * @param {string} componentType
     * schema: http://www.alpacajs.org
     */
    setup(config, componentType) {
        this.apiService.get();
    }

    /**
     * Clean the entire editing form
     */
    completeClean() {

    }

    /**
     * 
     * @param {string} componentType 
     * @param {function} callback 
     */
    fetch(componentType, callback = function () {}) {

    }

    /**
     * 
     * @param {form} form submit the entire form to save it's parameters 
     */
    submit(form) {

    }

}