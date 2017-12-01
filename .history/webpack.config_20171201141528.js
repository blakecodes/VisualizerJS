var path = require('path');

module.exports = {
    entry: {
        index: path.join(__dirname, 'src', 'scripts', 'index.js'),
        visualizer: path.join(__dirname, 'src', 'scripts', 'editor', 'visualizer.js')
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]bundle.js'
    }
}