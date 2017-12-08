/**
 * @name SlickBuilder V1.0
 * @author Blake Connally with Sequoyah Technologies
 * @version 1.0.0
 * @summary This is an integration layer for the Slick Scroll library.
 */

import slick from 'slick-carousel';

class SlickBuilder {
    constructor(element) {

    }

    doBasic() {
        let options = {

        }
    }

    build(element, options) {
        $(element).slick(options);
    }
}