var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src', 'scripts'),
    entry: {
        visualizer: './editor/visualizer.js',
        editor: './editor/content-editor.js',
        formBuilder: './FormBuilder/FormBuild.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    }
}