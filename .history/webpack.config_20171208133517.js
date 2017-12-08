var path = require('path');

module.exports = {
    context: path.join(__dirname, 'src', 'scripts'),
    entry: {
        visualizer: './editor/visualizer.js',
        editor: './editor/content-editor.js',
        formBuilder: './FormBuilder/FormBuild.js',
        testimonials: '../app/components/singles/testimonials/component.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    resolve: {
        alias: {
            handlebars: 'handlebars/dist/handlebars.min.js'
        }
    }
}