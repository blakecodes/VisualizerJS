var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src', 'scripts'),
    entry: {
        visualizer: './editor/visualizer.js',
        webpackTest: './webpack-test/app.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}