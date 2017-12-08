/**
 * @name SlickBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This is an integration layer for the Slick Scroll library.
 */

import slick from 'slick-carousel';

class SlickBuilder {
    constructor(element) {
        this.count = 0;
        this.assignIdentifiers();
    }

    /**
     * Get the amount of current slick components
     */
    getCount() {
        return $('[ref-component="testimonials"]').length;
    }

    /**
     * Assign unique identifiers to each element and attach a slick instance to them
     */
    assignIdentifiers() {
        self = this;

        $('[ref-component="testimonials"]').each(function () {
            $(this).attr('id', self.genId());
        });
    }

    genId() {
        this.count++;

        console.log('Added new identifier to Slick Element. Position: ' + this.count);
        return 'slick-' + (this.count + 1);
    }

    onDrop() {

    }
}

export default SlickBuilder;