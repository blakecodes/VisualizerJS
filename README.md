# Visualizer.js


Template builder and editor that helps users quickly design and develop Bootstrap based themes. The template is sectioned out into different editors.

Each editor has a configuration file attached to it that allows for quick and easy customization. In addition to specific config files, the editors are all considered components that allow for individual scripts, styles, etc. 

The goal with the dynamic layout for this program is to keep page load speeds high and script overflow low.



# Change List

_November 6th 2017_

  - Navigation editor
  - Meta tag editor
  - Multi-level navigation model storage
  - Information model syncing
  - Added security and meta tag editor

_October 20th 2017_

  - Attribute editor addition (Edit meta data and navigations)
  - Drag and drop components into the template builder

### Feature List

  - Add navigation
  - Add/edit content
  - Change HTML
  - TinyMCE integrated editor
  - Bootstrap column resizing
  - JWPlayer video integration
  - Draggable component structure
  - Dynamic script/style loading
  - Dynamic editor loading
  - + More


### Technologies Used

Visualizer uses a number of open source projects to work properly:

* Animate.CSS - Used for beautiful and seemless transitions between editors
* Dragula - Used to drag and drop components within the editor
* SCSS - Quick and efficient styling platform
* Gulp - Scss compiler

### Installation

ReflectJS can be run on any type of server. It uses basis HTML and JS.

Install the dependencies and devDependencies and start your server. Visualizer package does not come with a built in server.

```sh
$ npm install 
```

To make sure your new scss changes apply run gulp to use the scss auto compiler.

```sh
$ gulp
```
