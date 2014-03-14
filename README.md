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
In your project's Gruntfile, add a section named `git_humans` to the data object passed into `grunt.initConfig()`.

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
Type: `String`
Default value: `false`

A boolean value that allows you to return the list ordered by number of commits.

#### options.chronologically
Type: `String`
Default value: `false`

A boolean value that allows you to return the list ordered by latest commits.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  git_humans: {
    options: {},
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  git_humans: {
    options: {
      path: 'tmp/custom.txt',
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
