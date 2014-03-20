/*
 * grunt-git-humans
 * https://github.com/chuckcarpenter/grunt-git-humans
 *
 * Copyright (c) 2013 Chuck Carpenter
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Libs
  var _ = require('lodash'),
      path = require('path');

  grunt.registerMultiTask('git_humans', 'Get your project contributors and make a humans text file.', function() {
    // Merge task-specific options with these defaults.
    var options = this.options({
        path: './humans.txt',
        branch: 'master',
        byCommits: false,
        chronologically: false,
        mailmap: false,
        banner: ''
    }),
        cwd = process.cwd(),
        done = this.async(),

    banner = grunt.template.process(options.banner),

    createList = function (stdout, chronologically) {
      var log = stdout.split('\n'),
          authors = [];
      for ( var i=0; i<log.length; i++ ) {
        if ( log[i].match(/Author:/) ) {
          var name = log[i].split(/Author:\s/)[1];
          authors.push(name);
        }
      }
      if ( chronologically ) {
        return _.unique(authors.reverse()).join('\n');
      } else {
        return _.unique(authors.sort()).join('\n');
      }
    },

    outputList = function() {
      var args = ( !!options.byCommits ) ? ['shortlog', '-nse', 'HEAD'] : ['--git-dir', path.join(cwd, '.git'), '--no-pager', 'log'];
      // adding mailmap if true, needs git 1.8 min
      if (options.mailmap) { args.push('--use-mailmap'); }

      grunt.util.spawn({
        cmd: 'git',
        args: args
      }, writeFile);
    },

    writeFile = function(error, result, code) {
      var authors, content = '';
      if (error) {
        grunt.log.error(error);
      } else {
        grunt.log.write('Writing to ' + options.path + ' ... ');
        if ( !!options.byCommits ) {
            authors = result.stdout;
            content += writeBanner() + '\n\n';
            content += '/* TEAM */ (ordered by commits)\n\n';
            content += authors;
            grunt.file.write(path.join(cwd, options.path), content);
        } else {
            authors = createList(result.stdout, options.chronologically);
            content += writeBanner() + '\n\n';
            content += '/* TEAM */\n\n';
            content += authors;
            grunt.file.write(path.join(cwd, options.path), content);
        }
        grunt.log.ok();
      }
      done(code === 0);
    },

    writeBanner = function () {
        if ( options.banner !== '' ) {
            return banner;
        }

        var date = new Date( ),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        return "Last update: " + year + "/" + month + "/" + day;
    };

    if (!!options.branch)
    {
      outputList();
    } else {
      grunt.util.spawn({
        cmd: 'git',
        args: ['--git-dir', path.join(cwd, '.git'), 'branch']},
        function (error, result) {
          if (error) {
            grunt.log.error('Couldn\'t read current branch.');
          } else {
            var branches = result.stdout.split('\n');
            for (var i=0; i<branches.length; i++) {
              var branch = branches[i].match(/^\*\s.+/);
              if (branch) {
                var currentBranch = branch[0].split(/\*\s/)[1];
                if (!branch || options.branch === currentBranch) {
                  outputList();
                } else {
                  grunt.log.ok('Nothing to do.');
                  done();
                }
              }
            }
          }
        }
      );
    }
  });

};
