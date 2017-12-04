import APIService from '../ApiService/ApiService';
import Assert from '../Assertion/Assert';

import alpaca from '../../libraries/alpaca/alpaca';


/**
 * @name FormBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This form builder was created to easily intertwine form creation with
 * AlpacaJS, Bootstrap and jQuery. Initially designed to solve the "no-framework"
 * event handling with forms. 
 * 
 * This frameworks primary functions include form building and data binding. 
 */
class FormBuilder {

    /**
     * General configuration implementation
     * @param {object} config
     * @interface
     *  ComponentDirectory: String, //Manages the directory of components for quick selection
     *  EditorSelect: DOM Element, //Selects the editor holder for form implementation
     *      
     */
    constructor(config) {
        // Service management
        this.apiService = new APIService();
        this.Assert = new Assert();
        this.config = config;

        this.setup();
    }

    /**
     * Initial form setup
     * @param {AlpacaJS Object} config
     * @param {string} componentType
     * schema: http://www.alpacajs.org
     */
    setup(config, componentType) {
        let options = this.fetch('hours');
    }

    load(res) {
        let args = res.alpacaArgs;
        $("#form1").alpaca(args);
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
        let $this = this;
        this.apiService.get('/src/app/components/singles/' + componentType + '/component.json', function (res) {
            $this.load(res);
        });
    }

    /**
     * 
     * @param {form} form submit the entire form to save it's parameters 
     */
    submit(form) {

    }
}

export default FormBuilder;