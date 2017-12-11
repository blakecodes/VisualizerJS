/**
 * @name SlickBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This is an integration layer for the Slick Scroll library.
 */

import slick from 'slick-carousel';
import Configuration from '../../Configuration/Configuration';

class SlickBuilder {
    constructor(element) {
        this.count = 0;
        this.assignIdentifiers();
        this.config = new Configuration();
    }

    /**
     * Get the amount of current slick components
     */
    getCount() {
        return $('[ref-component="testimonials"]').length;
    }

    /**
     * Assign unique identifiers to each element and attach a slick instance to them
     * This is only used on the initial load. 
     * After, the onDrop function is triggered for new additons
     */
    assignIdentifiers() {
        self = this;

        $('[ref-component="testimonials"]').each(function () {
            $(this).attr('id', self.genId());
        });
    }

    /**
     * Generates a new idea for the element
     */
    genId() {
        this.count++;
        console.log('Added new identifier to Slick Element. Position: ' + this.count);
        return 'slick-' + this.count;
    }

    /**
     * This function checks to make sure all slick sliders have ids
     * If they do not, it creates a new one and opens a new slick instance for it
     */
    check() {
        $('[ref-component="testimonials"]').each(function () {
            console.log($(this).attr('id'));
        });
    }

    run(element) {
        $(element).slick();
    }

    /**
     * Create the slick element and attatch an instance to it
     */
    create(type) {
        let data = this.config.getComponentConfig(type);
        console.log(data);

        // tabs.map(tab => {
        //     console.log(tab);
        // });
    }

    onDrop() {
        let id = this.genId();

    }
}

export default SlickBuilder;