import APIService from '../ApiService/ApiService';
import Assert from '../Assertion/Assert';
import Configuration from '../Configuration/Configuration';

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
 * 
 * TODO Items:
 * - Add video load definitons
 * - Verify video save definitions
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
        this.config = new Configuration();

        this.currentVideo = {};
    }

    /**
     * Initial form setup
     * @param {string} componentType
     * schema: http://www.alpacajs.org
     */
    setup(componentType) {
        let options = this.fetch(componentType);
    }

    /**
     * Load the alpaca form with the component structure
     * @param {json} res response from the component fetch
     */
    load(res) {
        let args = res.alpacaArgs;
        this.clean(this.config.alpacaEditor);
        $(this.config.alpacaEditor).alpaca(args);

        this.import();
    }

    /**
     * Destroys the alpaca form to ready for a new install
     * @param {string} form form identifier
     */
    clean(form) {
        $(form).alpaca('destroy');
    }

    /**
     * 
     * @param {string} componentType 
     * @param {function} callback 
     * @returns {JSON} response for the components alpaca schematic
     */
    fetch(componentType, callback = function () {}) {
        let self = this;
        this.apiService.get('/src/app/components/singles/' + componentType + '/component.json', function (res) {
            self.load(res);
            self.currentVideo = res;
        });
    }

    /**
     * Takes the selected identifier and saves the form content
     * @param {string} identifier submit the entire form to save it's parameters 
     */
    save() {
        let self = this;

        $(this.config.alpacaEditor + ' input').each(function () {
            let name = $(this).attr('name');
            let val = $(this).val();

            let target = $('.selected-content [data-fill="' + name + '"]');

            self.saveDefinition(name, target, val);
        });
    }

    /**
     * Import the current values for a component
     * Currently sets the values by DOM identifiers, this should be changed
     * to update via AlpacaJS API in the future
     * @param {DOM Element} element container for the elemnts values
     */
    import () {
        let self = this;

        $('.selected-content [data-fill]').each(function () {
            let name = $(this).data('fill');
            let value = $(this).html();

            let element = $(this);

            /**
             * Fill the value in Alpaca
             * Addiitonal timeout is added to account for initial load 
             * of the form
             */
            setTimeout(function () {
                let target = $(self.config.alpacaEditor + ' [name="' + name + '"]');
                // target.val(value);

                self.loadDefinition(name, element, target);
            }, 200);
        });
    }

    /**
     * Definitions for loading components into the editor
     * @param {string} name name of the elemnt
     * @param {DOM Element} element target element used to determine value placement
     * @param {DOM Element} target element that is targeted inside the form
     * Text: Target inner html
     * Image: Target src attribute
     * Video: Target JWPlayer attribute
     */
    loadDefinition(name, element, target) {
        let type = this.currentVideo.alpacaArgs.schema.properties[name].componentType;
        let val = '';

        switch (type) {
            case 'text':
                val = element.html();
                break;
            case 'video': // Need to add this
                break;
            case 'image':
                val = element.attr('src');
                break;
            default:
                break;
        }

        // Assign final value
        target.val(val);
    }

    /**
     * Definitions for saving components
     * @param {string} name the value of the field name
     * @param {DOM Element} target determine what type of component
     * @param {string} value value to replace in the component
     * Text: No modification
     * Image: IMG src modified
     * Video: JWPlayer source is modified
     */
    saveDefinition(name, target, value) {
        let type = this.currentVideo.alpacaArgs.schema.properties[name].componentType;

        switch (type) {
            case 'text':
                target.html(value);
                break;
            case 'video':
                this.videoHandler(value);
                break;
            case 'image':
                this.imageHandler(target, value);
                break;
            default:
                break;
        }
    }

    /**
     * Handler for parsing the JWPlayer out of the
     * currently selected component
     * @param {string} value new video URL to update the player with
     */
    videoHandler(value) {
        let currentVideo = $('.selected-content .jwplayer').attr('id');

        jwplayer(currentVideo).load([{
            file: value
        }]);
    }

    /**
     * Handler for setting the value of an image element
     * @param {DOM Element} target  element to target
     * @param {string} value image to repl`ace the source with
     */
    imageHandler(target, value) {
        target.attr('src', value);
    }
}

export default FormBuilder;