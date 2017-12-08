/**
 * @name SlickBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This is an integration layer for the Slick Scroll library.
 */

import slick from 'slick-carousel';

class SlickBuilder {
    constructor(element) {
        this.assignIdentifiers();
        this.count = 0;
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
            console.log(self.genId());
        });
    }

    genId() {
        return 'slick-' + this.count++;
    }

    onDrop() {

    }
}

export default SlickBuilder;