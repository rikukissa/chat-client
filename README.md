# Webpack template with [React](https://facebook.github.io/react/) and [React Hot Loader](http://gaearon.github.io/react-hot-loader/)

<img width="350px" align="right" src="https://camo.githubusercontent.com/66747a6e05a799aec9c6e04a3e721ca567748e8b/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f313336353838312f313931383337332f32653035373166612d376462632d313165332d383436352d3839356632393164343366652e706e67"/>

[ ![Codeship Status for leonidas/gulp-project-template](https://codeship.com/projects/07620890-e45d-0132-b176-5e88bc3b0df8/status?branch=master)](https://codeship.com/projects/81833)

### What it does
* [Stylus](http://learnboost.github.io/stylus) files to CSS
* [ES6+ JavaScript](https://babeljs.io) files to ES5 Javascript
* Hot swaps your React components

## Getting things up and running
- Install [Node.js](http://nodejs.org)

```
 git clone git@github.com:rikukissa/webpack-template.git <your project name>
 cd <your project name>
 npm install
 npm start
 open http://localhost:9001 in your browser
```

## CLI Commands
* npm install
    * Installs server-side dependencies from npm
* npm start
    * Compiles your files, starts watching files for changes, serves static files to port 9001
* npm run build
    * Builds everything

# Production build
Minification, uglification and other tasks you're expected to run before deploying your product can be made by running the build command with env variable NODE_ENV set to "production"

    NODE_ENV=production npm run build

## Development guidelines
#### Directory structure
```
src/
  index.js  -- Main entrypoint
  components/  --  All components
    button/
      index.js  --  Component definition (and styles)
      index.styl  --  Styles if you wish to keep them in a separate file
      __tests__/  --  All tests suites for this component
        index.js
  utils/
    some-util.js
test/  --  Test helpers

```
#### Dependencies
All dependencies are meant to be installed with **npm**.
* JavaScript-files from **node_modules** can be *importer* in client-side modules.
* CSS files can be [imported](https://learnboost.github.io/stylus/docs/import.html) from **node_modules** using relative path from the stylus file to the css file e.g `@import '~/bootstrap/dist/css/bootstrap.css'`


## Suggested development tools

* [eslint](http://eslint.org/)
    * When used as an editor plugin (for example. [SublimeLinter](http://sublimelinter.readthedocs.org/en/latest/) + [SublimeLinter-eslint](https://github.com/roadhump/SublimeLinter-eslint)), gives you immediate feedback about your code and  can find bugs, potential problem areas, poor coding styles and stylistic issues.

---

## FAQ

## Useful resources
* [MindBEMding – getting your head ’round BEM syntax](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/)
