# Quiz app example

### Use Bootstrap for styling the application.

See: [Bootstrap 4](http://v4-alpha.getbootstrap.com/getting-started/download/)

* Because we are not using NPM, just download and copy what is on the `dist` directory.
* Download [Tether](http://tether.io/) which Bootstrap requires. Copy what is on `dist` directory.

### HTML5 Boilerplate

* This project is a barebones HTML5 project with all dependencies needed for cross-browser compatibility. Simply download and copy all contents of unzipped file to the folder of your project. Choose `merge` and not `replace`.
* Remove `google analytics code` on `index.html`
* Do not delete the comments on the `index.html` file because IE will display that. Read about **conditional statements** [here](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx). You're practically saying you do not support their browser.

### Use jQuery

* The HTML5 boilerplate has a `vendor` directory. To be consistent, let's move all the dependencies like bootstrap on that directory.

### Load order is important

* Make sure you load `normalize` before your css files, and `jquery` before all JS dependencies.
* We primarily need `normalize` for cross-browser compatibility. Read through the CSS file if you have time.

### Objects and Functions

* You create a `quiz` object that contains most of the functions you need for the app. Read [You don't know JS objects](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch3.md).

### The Ternary Operator

* Instead of a verbose conditional statement, the ternary operator is great:

   ```javascript
      condition ? 'correct' : 'wrong'
   ```

### Incrementing a number

* Here's something you should try on your browser console:

  ```javascript
   var score = 0;
   score ++ // returns 0
   score ++ // returns 1
  ```

### DOM Manipulation

* Never rely too much on the structure. You should always use manipulate elements with a class like `article.quiz-details` instead of just `article`.

### Room for improvements

* Some questions and answers have code. You can probably improve the code to display them properly.
* Improve the design using Bootstrap.
* Improve the templates.
* Update JavaScript if you change references on your HTML.
