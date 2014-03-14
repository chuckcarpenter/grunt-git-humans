# grunt-git-humans

> A plugin to get Git contributors and create a humans text file. More information about this file and how to create one for knowing whom has contributed to a site, can be found at [humanstxt.org](http://humanstxt.org/).

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-git-humans --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-git-humans');
```

## The "git_humans" task

### Overview
In your project's Gruntfile, add a section named `git_humans` to the data object passed into `grunt.initConfig()`. The task will respect the git mailmap file in your root, if you decide to use one.

```js
grunt.initConfig({
  git_humans: {
    options: {
      // Task-specific options go here.
    },
  },
})
```

### Options

#### options.path
Type: `String`
Default value: `'./humans.txt'`

The default path and filename for the file. 

#### options.branch
Type: `String`
Default value: `'master'`

A string value that is used to determine what branch the list will be used for the query.

#### options.byCommits
Type: `Boolean`
Default value: `false`

A boolean value that allows you to return the list ordered by number of commits.

#### options.chronologically
Type: `Boolean`
Default value: `false`

A boolean value that allows you to return the list ordered by latest commits.

#### options.banner
Type: `String`
Default value: `Empty String`

This string will be prepended to the output. Template strings (e.g. <%= config.value %> can be used and are encouraged. If left empty, will add last updated dated.

### Usage Examples

#### Default Options
In this example, the default options are used. No reason to pass anything to create the file at root from the master branch.

```js
grunt.initConfig({
  git_humans: {
    options: {},
  },
})
```

#### Custom Options
If you'd like to create the file as a different name for other purposes, or with alternate ordering options then you can do add those easily.

```js
grunt.initConfig({
  git_humans: {
    options: {
      path: 'contributors/custom.txt',
      branch: 'master',
      byCommits: true
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 2014-03-14   v0.1.0  First release to start initial use on projects

## Todo
* Add more detailed tests (e.g., testing for git and log results)
