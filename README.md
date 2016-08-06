# Quiz app example

### Use Bootstrap for styling the application.

See: [Bootstrap 4](http://v4-alpha.getbootstrap.com/getting-started/download/)

* Because we are not using NPM, just download and copy what is on the `dist` directory.

### HTML5 Boilerplate

* This project is a barebones HTML5 project with all dependencies needed for cross-browser compatibility. Simply download and copy all contents of unzipped file to the folder of your project. Choose `merge` and not `replace`.
* Remove `google analytics code` on `index.html`

### Use jQuery

* The HTML5 boilerplate has a `vendor` directory. To be consistent, let's move all the dependencies like bootstrap on that directory.

### Load order is important

* Make sure you load `normalize` before your css files, and `jquery` before all JS dependencies.
