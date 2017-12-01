const path = require('path');

module.exports = {

    // Define entry point
    entry: './src/scripts/editor/visualizer.js',

    // Define output
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}